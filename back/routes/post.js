const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Comment, User, Image, Hashtag } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

try{
  fs.accessSync('uploads');
}catch(error){
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done){
      done(null, 'uploads');
    },
    filename(req, file, done){
      const ext = path.extname(file.originalname); //확장자 추출(.png)
      const basename = path.basename(file.originalname, ext);   //아이디
      done(null, basename + '_' + new Date().getTime() + ext); //아이디123456789.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },   //20MB 용량 제한
});
router.post('/', isLoggedIn, upload.none() ,async(req, res, next) =>{
    try{
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            addressDetail: req.body.addressDetail,
            UserId: req.user.id,
        });
        if (hashtags) {
          const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          }))); // [[노드, true], [리액트, true]]
          await post.addHashtags(result.map((v) => v[0]));
        }
        if (req.body.image) {
          if (Array.isArray(req.body.image)) { // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
            const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
            await post.addImages(images);
          } else { // 이미지를 하나만 올리면 image: 제로초.png
            const image = await Image.create({ src: req.body.image });
            await post.addImages(image);
          }
        }
        const fullPost = await Post.findOne({
            where: {id: post.id},
            include: [{
                model: Image,
            },{
                model: Comment, 
                include: [{
                    model: User, //댓글 작성자
                    attributes: ['id', 'nickname'],
                }],
            },{
                model: User, // 게시글 작성자
                attributes: ['id', 'nickname'],
              }, {
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
              }],
        });
        res.status(201).json(fullPost);
    }catch(error){
        console.error(error);
        next(error);
    }
});

//storage부분은 지금은 하드디스크에 넣어두지만 
//배포를 하면 aws에 넣을 예정이다.
//이미지의 경우 서버를 거치면 돈이 들어가는 경우가 발생하므로 
//프론트쪽에서 바로 s3같은 곳에 올라가게 만드는 것이 좋다. 
// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done){
//       done(null, 'uploads');
//     },
//     filename(req, file, done){
//       //기존의 같은 파일이 들어오면 덮어쒸우는 경우를 방지
//       const ext = path.extname(file.originalname); //확장자 축출
//       const basename = path.basename(file.originalname, ext);
//       done(null, basename + '_' + new Date().getTime() + ext);
//     },
//   }),
//   limits: {fileSize: 20 * 1024 * 1024},
// });

router.post('/images', isLoggedIn, upload.array('image') ,async(req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.filename))
});

router.post('/:postId/comment', isLoggedIn, async(req, res, next) =>{
    try{
        const post = await Post.findOne({
            where: { id: req.params.postId}
          });
          if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
          }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
              model: User,
              attributes: ['id', 'nickname'],
            }],
          })
          res.status(201).json(fullComment);
    }catch(error){
        console.error(error);
        next(error);
    }
});
router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
          order: [['createdAt', 'DESC']],
        }],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }],
    });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
    try {
      const post = await Post.findOne({ where: { id: req.params.postId }});
      if (!post) {
        return res.status(403).send('게시글이 존재하지 않습니다.');
      }
      await post.addLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

//수정하기
router.patch('/:postId', isLoggedIn,async(req, res, next) => {
  const hashtags = req.body.content.match(/#[^\s#]+/g);
  try{
    await Post.update({
      title: req.body.title,
      content: req.body.content,
      addressDetail: req.body.addressDetail,
    },{ 
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    const post = await Post.findOne({where: {id: req.params.postId}})
    if(hashtags){
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase()}
      }))); //[[sini, true], [blue], true]
      await post.setHashtags(result.map((v) => v[0]));
    }
    //수정한것을 json으로 보내주고 
    res.status(200).json({PostId: parseInt(req.params.postId, 10), title: req.body.title, content: req.body.content, addressDetail: req.body.addressDetail,});
  }catch(error){
    console.log(error);
    next(error);
  }
})
  
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
    return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
} catch (error) {
    console.error(error);
    next(error);
}
});

router.delete('/:postId', isLoggedIn, async(req, res, next) => {
  try {
    await Post.destroy({
      where: { 
        id: req.params.postId,
        UserId: req.user.id, 
      },
    });
    res.status(200).json({PostId: parseInt(req.params.postId, 10)});
} catch (error) {
    console.error(error);
    next(error);
}
})
module.exports = router;