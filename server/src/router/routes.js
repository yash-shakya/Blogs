// import authRoutes from "./router/auth.js";
import newsRoutes from "./newsletter.js";
import commentroute from "./comment.js"
function routes(app) {
    app.get("/", (req, res) => {
        res.send("Hello from server");
    });

    // app.use('/auth', authRoutes);
    app.use("/newsletter", newsRoutes);
    app.use("blogs/comment",commentroute);
}

export default routes;