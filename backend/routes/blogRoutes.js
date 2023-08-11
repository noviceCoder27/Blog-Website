const express = require('express');
const {showAllBlogs,showUserBlogs,createBlog,deleteBlog,updateBlog,showBlog,showBlogsByCategory} = require('../controllers/blogsController');
const authenticateJWT = require('../middleware/requireAuth');
const upload = require('../middleware/uploadPicture');

const router = express.Router();


router.get('/',showAllBlogs);
router.get('/:id',showBlog);
router.get('/showAll/:category',showBlogsByCategory);
router.use(authenticateJWT);
router.get('/getBlogs/me',showUserBlogs);
router.post('/',upload.single("blogImage"),createBlog);
router.delete('/:id',deleteBlog);
router.put('/:id',updateBlog);

module.exports = router;