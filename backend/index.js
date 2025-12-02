const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

const JWT_SECRET = "sdfjnsibdsivdnvidnvdbuvidfnkvfdnv";

app.use(cors());
app.use(express.json());

mongoose
    .connect(
        "mongodb://almaz:passwd@127.0.0.1:27017/auth-db?authSource=auth-db"
    )
    .then(() => console.log("MongoDB подключена успешно!"))
    .catch((err) => console.error("Ошибка MongoDB:", err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => res.send("API Working"));

app.post("/api/login", async (req, res) => {
    try {
        console.log("Запрос на логин:", req.body);
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Укажите username и password" });
        }

        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res
                .status(401)
                .json({ message: "Неверный логин или пароль" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            message: "Вход выполнен",
            token,
        });
    } catch (err) {
        console.error("ОШИБКА В /api/login:", err);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
});

app.post("/api/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Укажите username и password" });
        }

        const exists = await User.findOne({ username });
        if (exists) {
            return res
                .status(409)
                .json({ message: "Пользователь уже существует" });
        }

        const newUser = await User.create({ username, password });

        return res.status(201).json({
            message: "Регистрация успешна",
            user: { id: newUser._id, username: newUser.username },
        });
    } catch (err) {
        console.error("ОШИБКА В /api/signup:", err);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
});

app.post("/api/logout", (req, res) => {
    res.json({ message: "Logout successful" });
});

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Токен не предоставлен" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Недействительный токен" });
    }
};

app.get("/api/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user)
            return res.status(404).json({ message: "Пользователь не найден" });

        return res.json({
            id: user._id,
            username: user.username,
        });
    } catch (err) {
        console.error("Ошибка в /api/profile:", err);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
