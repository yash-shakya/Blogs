import express from 'express';
import { reviewBlog, createBlog } from '../controllers/blog-review.js';

const router = express.Router();

router.post('/admin/blog/review/:id', reviewBlog);

//for testing
router.post('/admin/blog', createBlog)
  
export default router;