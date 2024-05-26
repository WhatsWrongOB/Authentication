import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectDatabase from './config/database.js'
import contactRouter from "./routes/contactRoute.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";


const app = express();

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:5173",
        ];
        const isAllowed = allowedOrigins.includes(origin);
        callback(null, isAllowed ? origin : false);
    },
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

dotenv.config()
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(cors(corsOptions));

const PORT = process.env.PORT;

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
})

app.use('/auth', authRouter)
app.use('/contact', contactRouter)
app.use('/profile', userRouter)
app.use('/post', postRouter)



// Error middleware

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 400
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        message
    })
})


