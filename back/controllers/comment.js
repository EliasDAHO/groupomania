const jwt = require('jsonwebtoken');
const fs = require('fs');
const user = require('../models/user');
const post = require('../models/post');
const comment = require('../models/comment');


exports.createComment = (req, res, next) => {
    user.findOne({ where: { userId: req.body.userId }})
        .then((user) => {
            post.findOne({ where: { userId: req.params.postuserId }})
                .then((post) => {
                    const newComment = { content: req.body.content, userId: user.id, postId: post.id };
                    comment.create(newComment)
                        .then((newComment) => res.json(newComment))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(400).json({ error }));
            })
        .catch(error => res.status(400).json({ error }));
}

exports.modifyComment = (req, res, next) => {
    comment.findOne({ where: { userId: req.params.commentUserid }, include: user})
        .then((comment) => {
            if(req.body.userId == comment.user.userId || req.body.isAdmin == "admin"){
                comment.content = req.body.content
                comment.save()
                    .then(() => res.status(200).json({ message: 'Message modifié !'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(403).json({ message: 'Unauthorized request !' })
            }
        })
        .catch(error => res.status(400).json({ error }));

}

exports.deleteComment = (req, res, next) => {
    comment.findOne({ where: { userId: req.params.commentUserId }, include: user})
        .then((comment) => {
            if(req.body.userId == comment.user.userId || req.body.isAdmin == 'admin'){
                comment.destroy()
                    .then(() => res.status(200).json({ message: 'Message supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(403).json({ message: 'Unauthorized request !' })
            }
        })
        .catch(error => res.status(400).json({ error }));
}
 
exports.allComments = (req, res, next) => {
    post.findOne({ where: {userId: req.params.postuserId }, include: [{ all: true, nested: true}] })
        .then((post) => res.json(post))
        .catch(error => res.status(400).json({ error }));
}