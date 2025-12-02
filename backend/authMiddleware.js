function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
        return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = JWT.verify(token, JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

app.get("/api/profile", authMiddleware, (req, res) => {
    res.json({ id: req.user.id, username: req.user.username });
});
