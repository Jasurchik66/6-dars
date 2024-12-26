import express from 'express';
import { connectDB } from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import groupRoutes from './routes/groupRoutes.js';

const app = express();

// MongoDB ulanish
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/groups', groupRoutes);

// Xatoliklarni qayta ishlash
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Serverda xatolik yuz berdi",
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 xatolik
app.use((req, res) => {
  res.status(404).json({ message: "So'ralgan sahifa topilmadi" });
});

// Portni o'rnatish
const PORT = process.env.PORT || 3000;

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishga tushdi`);
});

export default app;