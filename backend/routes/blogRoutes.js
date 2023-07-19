const express = require('express');
const {showAllBlogs,showUserBlogs,createBlog,deleteBlog,updateBlog,showBlog,authenticateJWT} = require('../controllers/blogsController');

const router = express.Router();


router.get('/',showAllBlogs);
router.get('/blog/:id',showBlog);
router.get('/blog/me',showUserBlogs);
router.post('/blog',createBlog);
router.delete('/blog/:id',deleteBlog);
router.put('/blog/:id',updateBlog);


module.exports = router;