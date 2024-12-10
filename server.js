import cookieParser from 'cookie-parser';
import express from 'express';
import 'dotenv/config';
import userRouter from './routes/user.route.js';
import { errorHandler } from './lib/middleware.js';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import fileUpload from 'express-fileupload';
import cldRouter from './routes/cloudinary.route.js';
import taskRouter from './routes/task.route.js';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(fileUpload());

// Подключение маршрутов
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/image', cldRouter);
app.use('/api/v1/tasks', taskRouter);

// Маршрут для обработки 404 ошибок
app.use('*', (req, res) => {
    res.status(404).json({ message: 'not found' });
});

// Обработка ошибок
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Taskly API'});
    });
// Запуск сервера после подключения всех middleware и маршрутов
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер слушает на порту ${PORT}`);
    });





