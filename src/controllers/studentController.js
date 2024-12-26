import { Student } from '../models/Student.js';

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('group');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('group');
    if (!student) {
      return res.status(404).json({ message: "O'quvchi topilmadi" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createStudent = async (req, res) => {
  const student = new Student(req.body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: "O'quvchi topilmadi" });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "O'quvchi topilmadi" });
    }
    res.json({ message: "O'quvchi o'chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};