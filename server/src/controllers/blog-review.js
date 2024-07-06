import Blog from '../model/blog.js';

export const reviewBlog = async (req, res) => {
  const { blogId } = req.params;
  const { reviewStatus, reviewMessage } = req.body;


  try {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  const user = req.user; 
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.role != 'admin') {
    return res.status(403).json({ message: 'Only admins can review blogs' });
  }

  switch (reviewStatus) {
    case 'pending':
      blog.review = 'pending';
      break;
    case 'approved':
      blog.review = 'approved';
      blog.isPublished = true;
      res.json({ message: 'Blog approved!' });
      break;
    case 'update':
      blog.review = 'update';
      blog.reviewMessage = reviewMessage;
      res.json({ message: `Blog requires updates. Please review the comments: ${reviewMessage}` });
      break;
    default:
      return res.status(400).json({ message: 'Invalid review status' });
  }

  await blog.save();

  res.json({ message: 'Blog review updated successfully' });
} catch (error) { 
  res.status(500).json({ message: 'Internal server error', error });
}
}