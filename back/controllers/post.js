const jwt = require ('jsonwebtoken');
const fs = require('fs');
const user = require('../models/user');
const post = require('../models/post');


exports.createPost=(req, res, next) =>{
    const postObject = JSON.parse(req.body.post);
        
const post= new Post({
    ...postObject,
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    
  });

  post.save()
  .then(() => res.status(201).json({ message: 'Post créé !'})) 
  .catch(error =>{ console.log(error); res.status(400).json({ error});})        
};

exports.modifyPost=(req, res, next)=>{
    // verifier si l'utilisateur qui fait l'operation est l'utilisateur qui a crée le post
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET);
    // utilisateur du token 
    const userId = decodedToken.userId;
 
  post.findOne({ _id:req.params.id})
    .then(post =>{
      if(post.userId == userId){
          // proceder à la modification
          const postObject = req.file ?
         { ...JSON.parse(req.body.post),
           imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
         } : {...req.body};
        post.updateOne({ _id: req.params.id}, {...postObject, _id: req.params.id})
          .then(() => res.status(200).json({ message:'post modifié!'}))
          .catch( error => res.status(400).json({ error }));
     
      }
      else {
        // ne pas supprimer et retourner un status non autorisé 
        res.status(401).json({ message: 'Utilisateur non autorisé pour faire la modification !'});
      }
                  
  })
  .catch(error =>{ console .log(error); res.status(500).json({ error}); });
 };
 
 exports.deletePost=( req,res, next) => {
    // verifier si l'utilisateur qui fait l'opération est l'utilisateur qui a créé le post
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET);
      // utilisateur du token 
      const userId = decodedToken.userId;
  
   post.findOne({ _id:req.params.id})
      .then(post =>{
        if(post.userId == userId){
            // procéder à la suppression
            const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`,() =>{
         post.deleteOne({ _id: req.params.id})
           .then(() => res.status(200).json({ message: 'Post supprimé !'}))
           .catch(error => res.status(400).json({ error }));
      });  
        }
        else {
          // ne pas supprimer et retourner un status non autorisé
          res.status(401).json({ message: 'Utilisateur non autorisé pour faire la suppression !'});
        }
                    
    })
    .catch(error =>{ console .log(error); res.status(500).json({ error}); });
  }; 

  exports.getAllPosts=(req, res, next) => {
    post.find()
    .then(posts=> res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
  };

  exports.userPosts = (req, res, next) =>{
      user.findOne({ _id:req.params.id})
      .then(user=> res.status(200).json(user))
      .catch(error => res.status(400).json({error}));
  };