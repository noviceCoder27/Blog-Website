const express = require('express');
const {showAllBlogs,showUserBlogs,createBlog,deleteBlog,updateBlog} = require('../controllers/blogsController');

const router = express.Router();


router.get('/',showAllBlogs);
router.get('/blog/me',showUserBlogs);
router.post('/blog/:id',createBlog);
router.delete('/blog/:id',deleteBlog);
router.put('/blog/:id',updateBlog);