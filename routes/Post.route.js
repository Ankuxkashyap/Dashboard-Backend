import express from 'express';
import {CreatePost,GetPosts,GetPostById,UpdatePost,DeletePost,postQuery} from '../controller/Post.controller.js';
import AuthMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/',GetPosts);
router.get('/query',AuthMiddleware, postQuery);
router.get('/getPostById/:id',GetPostById);
router.post('/createPost',AuthMiddleware, CreatePost);
router.put('/updatePost/:id',AuthMiddleware, UpdatePost);
router.delete('/deletePost/:id',AuthMiddleware, DeletePost);

export default router;
