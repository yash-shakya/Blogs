// import authRoutes from "./router/auth.js";

import { adminMiddleware } from "../middleware/admin.middleware.js";
import postAdmin from "./post-admin.js";
import { reviewBlog } from "../controllers/blog-review.js";
import newsRoutes from "./newsletter.js";

function routes(app) {
    app.get("/", (req, res) => {
        res.send("Hello from server");
    });

    // app.use('/auth', authRoutes);
    app.use("/newsletter", newsRoutes);
    app.post("/admin", adminMiddleware, postAdmin);
    app.use("/admin/blog/review/:id", reviewBlog);
}

export default routes;