// import authRoutes from "./router/auth.js";
import { adminMiddleware } from "./middleware/admin.middleware";
import postAdmin from "./router/post-admin";

function routes(app) {
    app.get("/", (req, res) => {
        res.send("Hello from server");
    });

    // app.use('/auth', authRoutes);
    app.post('/admin', adminMiddleware, postAdmin)

}

export default routes;