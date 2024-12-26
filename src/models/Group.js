import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Guruh nomi kiritilishi shart']
  },
  teacherName: {
    type: String,
    required: [true, "O'qituvchi ismi kiritilishi shart"]
  },
  classTime: {
    type: String,
    required: [true, 'Dars vaqti kiritilishi shart']
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active'
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

groupSchema.pre('save', async function(next) {
  if (this.students.length > 15) {
    throw new Error("Guruhda maksimal 15 ta o'quvchi bo'lishi mumkin");
  }
  next();
});

export const Group = mongoose.model('Group', groupSchema);
