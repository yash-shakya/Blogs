// import authRoutes from "./router/auth.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import postAdmin from "./post-admin.js";


import newsRoutes from "./newsletter.js";


function routes(app) {
    app.get("/", (req, res) => {
        res.send("Hello from server");
    });

    // app.use('/auth', authRoutes);
    app.use("/newsletter", newsRoutes);
    app.post("/admin", adminMiddleware, postAdmin);
}

export default routes;