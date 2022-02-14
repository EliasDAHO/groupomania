const express = require ('express');
const router = express.Router();

const postCtrl= require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/create', auth, multer, postCtrl.createPost);
router.put('/modify',auth, multer, postCtrl.modifyPost);
router.delete('/delete',auth, multer, postCtrl.deletePost);
router.get('/allposts',auth, postCtrl.getAllPosts);
router.get('/userposts',auth, postCtrl.userPosts);


module.exports = router