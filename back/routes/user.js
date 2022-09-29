const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User, Hashtag, Image, Post, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

//새로고침 할때 마다 요청을 보내는 부분
router.get('/', async (req, res, next) => { // GET /user
    try {
      if (req.user) {
        const fullUserWithoutPassword = await User.findOne({
          where: { id: req.user.id },
          attributes: {
            exclude: ['password']
          },
          include: [{
            model: Post,
            attributes: ['id'],
          }]
        })
        res.status(200).json(fullUserWithoutPassword);
      } else {
        res.status(200).json(null);
      }
    } catch (error) {
      console.error(error);
     next(error);
    }
  });
  
//passport를 사용하면 res, req, next를 사용하기 어려움 그래서 
//미들웨어를 확장해서 사용을 해준다. 
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.log(err)
            next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr)
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id},
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

router.post('/', isNotLoggedIn, async(req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
    });
        //res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send('ok');
    }catch(error){
        console.error(error);
        next(error); //status(500)
    }
});
router.get('/:userId', async(req, res, next) => {  // GET /user
  try{
          const fullUserWithoutPassword = await User.findOne({
              where: { id: req.params.userId},
              attributes: {
                  exclude: ['password']
              },
              include: [{
                  model: Post,
                  attributes: ['id'],
              }]
          })
          if(fullUserWithoutPassword){
              const data = fullUserWithoutPassword.toJSON();
              data.Posts = data.Posts.length; //개인 정보 침해 예방
              res.status(200).json(fullUserWithoutPassword);
          }else{
              res.status(404).json('존재하지 않는 사용자입니다.');
          }
  }catch(error){
      console.error(error);
      next(error);
  }
})
router.get('/:userId/posts', async(req, res, next) => {
    try{
        const where= { UserId: req.params.userId };
        if(parseInt(req.query.lastId, 10)){   //초기로딩이 아닐때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
        } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            },{
                model: Image,
            },{
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User, // 좋아요 누른 사람
                through: 'Like',
                as: 'Likers',
                attributes: ['id'],
              }],
        });
        res.status(200).json(posts);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});
  

router.patch('/nickname', isLoggedIn, async(req, res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname,
        },{
            where: {id: req.user.id},
        });
        res.status(200).json({nickname: req.body.nickname})
    }catch(error){
        console.error(error);
        next(error); //status(500)
    }
});


module.exports = router;