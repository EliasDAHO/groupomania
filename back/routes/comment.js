const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/create', auth,  commentCtrl.createComment);
router.put('/modify',auth,  commentCtrl.modifyComment);
router.delete('/delete',auth, commentCtrl.deleteComment);
router.get('/allcomments',auth, commentCtrl.allComments);

module.exports = router;
