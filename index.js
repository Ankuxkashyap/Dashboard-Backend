import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/User.route.js';
import postRouter from './routes/Post.route.js';
import cors from 'cors';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors(
    {
        origin: "https://dashboard-frontend-iota-ten.vercel.app/",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
))
app.use(cookieParser());
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/users', userRouter);
app.use('/api/post', postRouter); // Assuming postRouter is similar to userRouter

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || PORT}`);
});
