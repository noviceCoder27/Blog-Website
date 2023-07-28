const express = require('express');
const {showAllBlogs,showUserBlogs,createBlog,deleteBlog,updateBlog,showBlog} = require('../controllers/blogsController');
const authenticateJWT = require('../middleware/requireAuth');

const router = express.Router();


router.get('/',showAllBlogs);
router.get('/:id',showBlog);
router.use(authenticateJWT);
router.get('/getBlogs/me',showUserBlogs);
router.post('/',createBlog);
router.delete('/:id',deleteBlog);
router.put('/:id',updateBlog);


module.exports = router;