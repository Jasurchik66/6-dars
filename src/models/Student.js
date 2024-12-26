import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Ism kiritilishi shart']
  },
  lastName: {
    type: String, 
    required: [true, 'Familiya kiritilishi shart']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Telefon raqam kiritilishi shart']
  },
  image: {
    type: String
  },
  address: {
    type: String
  },
  birthDate: {
    type: Date
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  paymentStatus: {
    type: Boolean,
    default: false
  }
});

export const Student = mongoose.model('Student', studentSchema);
