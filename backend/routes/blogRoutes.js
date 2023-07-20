const express = require('express');
const {showAllBlogs,showUserBlogs,createBlog,deleteBlog,updateBlog,showBlog} = require('../controllers/blogsController');
const authenticateJWT = require('../middleware/requireAuth');

const router = express.Router();


router.get('/',showAllBlogs);
router.get('/blog/:id',showBlog);
router.use(authenticateJWT);
router.get('/me',showUserBlogs);
router.post('/blog',createBlog);
router.delete('/blog/:id',deleteBlog);
router.put('/blog/:id',updateBlog);


module.exports = router;