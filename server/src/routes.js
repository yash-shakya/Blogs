// import authRoutes from "./router/auth.js";

function routes(app) {
    app.get("/", (req, res) => {
        res.send("Hello from server");
    });

    // app.use('/auth', authRoutes);
}

export default routes;