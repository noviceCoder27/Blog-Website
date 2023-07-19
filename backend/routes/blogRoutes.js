const express = require('express');
const {showAllBlogs,showUserBlogs,createBlog,deleteBlog,updateBlog,authenticateJWT} = require('../controllers/blogsController');

const router = express.Router();


router.get('/',showAllBlogs);
router.get('/blog/me',authenticateJWT,showUserBlogs);
router.post('/blog/:id',authenticateJWT,createBlog);
router.delete('/blog/:id',authenticateJWT,deleteBlog);
router.put('/blog/:id',authenticateJWT,updateBlog);