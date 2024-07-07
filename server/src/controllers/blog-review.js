import Blog from '../model/blog.js';

// For testing
export const createBlog = async (req, res) => {
    try {
        const blog = new Blog({
            title: 'My New Blog',
            content: 'This is my new blog content',
            image: 'https://example.com/image.jpg',
            review: 'pending',
            reviewMessage: '',
            tags: [],
            comments: []
        });
        await blog.save();

        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

export const reviewBlog = async (req, res) => {
    const blogId = req.params.id;
    const { reviewStatus, reviewMessage } = req.body;
    
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        //   const user = req.user; 
        //   if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        //   }

        //   if (user.role != 'admin') {
        //     return res.status(403).json({ message: 'Only admins can review blogs' });
        //   }

        let message = '';

        switch (reviewStatus) {
            case 'pending':
                blog.review = 'pending';
                message = 'Blog review pending.';
                break;
            case 'approved':
                blog.review = 'approved';
                //function call for publishing the blog
                message = 'Blog approved and published for everyone.';
                break;
            case 'update':
                blog.review = 'update';
                blog.reviewMessage = reviewMessage;
                message = `Blog requires updates. Please review the comments: ${blog.reviewMessage}`;
                break;
            default:
                return res.status(400).json({ message: 'Invalid review status' });
        }

        await blog.save();

        // For testing
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            review: blog.review,
            isPublished: blog.isPublished,
            reviewMessage: blog.reviewMessage
        }, { new: true });

        res.json({ message, updatedBlog });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}