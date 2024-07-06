import express from 'express';
import { reviewBlog } from '../controllers/blog-review.js';

const router = express.Router();

router.post('admin/blog/review/:id', async (req, res) => {
  await reviewBlog(req, res);
});

export default router;