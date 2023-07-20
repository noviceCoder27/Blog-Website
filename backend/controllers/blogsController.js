const blogsModel = require('../models/blogsModel'); 


async function showAllBlogs(req,res) {
    try {
        const blogs = await blogsModel.find({});
        res.status(200).send(blogs);
    } catch(err) {
        console.log(err);
        res.status(400).send("Error finding blogs");
    }   
    
}

async function showUserBlogs(req,res) {
    const user_id = req.user._id;
    try {
        const blogs = await blogsModel.find({user_id});
        res.status(200).send(blogs);
    } catch(err) {
        console.log(err);
        res.status(400).send("Error finding blogs");
    }
}

async function showBlog(req,res) {
    const {id: _id} = req.params;
    try {
        const blog = await blogsModel.findOne({_id});
        if(!blog) {
            return res.status(404).send("Blog not found");
        }
        res.status(200).send(blog);
    } catch(err) {
        console.log(err);
        res.status(400).send("Error finding blog");
    }   
}

async function createBlog(req,res) {
    const user_id = req.user._id;
    const {title,content} = req.body;
    try {
        const blog = await blogsModel.create({title,content,user_id});
        res.status(200).send(blog);
    } catch(err) {
        console.log(err);
        res.status(400).send("Error adding blog");
    }
     
}

async function deleteBlog(req,res) {
    const {id:_id} = req.params;
    try {
        const blog = await blogsModel.findByIdAndDelete(_id);
        if(!blog) {
            return res.status(404).send("Blog not found");
        }
        res.status(200).send(blog);
    } catch(err) {
        console.log(err);
        res.status(400).send("Error deleting blog");
    }   
}

async function updateBlog(req,res) {
    const {id: _id} = req.params;
    const {title,content} = req.body;
    const updatedBlog = {title,content};
    try {
        const blog = await blogsModel.findByIdAndUpdate(_id,updatedBlog,{new: true}); 
        //If you don’t include the {new: true} option in the findByIdAndUpdate function, Mongoose will return the original document before the update was applied, instead of the updated document. This is the default behavior of both Mongoose and MongoDB.
        if(!blog) {
            return res.status(404).send("Blog not found");
        }
        res.status(200).send(blog);
    } catch(err) {
        console.log(err);
        res.status(400).send("Error updating blog");
    }   
}

module.exports =  {showAllBlogs,showUserBlogs,createBlog,deleteBlog,updateBlog,showBlog}