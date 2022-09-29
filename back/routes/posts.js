//리미트 , offset를 사용해서 데이터를 보낼때 보내는 양을 조절하는 하나의 방식
//위의 방법을 사용하면 중간에 사용자가 데이터를 지우면 문제가 발생하면서 문제가 생김


const express = require('express');
const { Op } = require('sequelize');
const { Post, User , Image, Comment} = require('../models');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try{
        const where= {};
        if(parseInt(req.query.lastId, 10)){   //초기로딩이 아닐때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
        } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
              ],
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

module.exports = router;