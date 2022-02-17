const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const models = require('../models');
const User = models.User;
require('dotenv').config();


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
       
        User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            role: req.body.role
        })
         .then(() =>res.status(201).json({ message:'Utilisateur créé !'}))
         .catch(error => { console.log(error); res.status(400).json({message : error.message});});
      })
    .catch(error => { console.log(error); res.status(500).json({message : error.message}); });
    };
    
            

exports.login = (req, res, next) => {
    User.findOne({ where: { username: req.body.username } })
        .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: user._id,
          isAdmin: user.admin,
          token:jwt.sign(
            { userId: user._id, isAdmin: user.admin},
            process.env.TOKEN_SECRET,
            { expiresIn:'24h'} 
          )
        });
      })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
    User.findOne({ where: {userId:req.body.userId }})
        .then((user) => {
            if(req.body.password) {
                bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
                        user.username = req.body.username
                        user.email = req.body.email
                        user.password = hash
                        
                        user.save()
                            .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                            .catch(error => res.status(400).json({ error }));
                    })
            } else {
                return res.status(400).json({ error })
            }
        })
        .catch(error => res.status(400).json({ error }))
}

exports.delete = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET);
    let userId = decodedToken.userId;
   

    if (userId != null) {
        
        models.User.findOne({
            where: { id: userId }
        })
            .then(user => {
                if (user != null) {        
        
        models.User
            .destroy({ where: { id: user.id }})
            .then(() => res.end())
            .catch(err => console.log('error' ,err))
                      
            }
                else {
                    res.status(401).json({ error: 'Cet utilisateur n\'existe pas' })
                }
            })
    } else {
        res.status(500).json({ error: 'Impossible de supprimer ce compte, contacter un administrateur' })
    }
}

exports.userAccount = (req , res , next) => {
    User.findOne({ where: { _id:req.body.userId}})
    .then((user)=> res.json(user))
    .catch(error =>res.status(400).json({ error}))

}