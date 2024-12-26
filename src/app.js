import express from 'express';
import { connectDB } from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import groupRoutes from './routes/groupRoutes.js';

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/students', studentRoutes);
app.use('/api/groups', groupRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ 
    message: "Serverda xatolik yuz berdi",
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "So'ralgan sahifa topilmadi" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishga tushdi`);
});

export default app;
