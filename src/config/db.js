import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/education-db');
    console.log('MongoDB ulanish muvaffaqiyatli');
  } catch (err) {
    console.error('MongoDB ulanish xatosi:', err);
    process.exit(1);
  }
};