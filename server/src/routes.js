// import authRoutes from "./router/auth.js";
import newsRoutes from "./router/newsletter.js";
function routes(app) {
    app.get("/", (req, res) => {
        res.send("Hello from server");
    });

    // app.use('/auth', authRoutes);
    app.use("/newsletter", newsRoutes);
}

export default routes;