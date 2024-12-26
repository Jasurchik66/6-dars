import { Group } from '../models/Group.js';
import { Student } from '../models/Student.js';

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('students');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('students');
    if (!group) {
      return res.status(404).json({ message: "Guruh topilmadi" });
    }
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createGroup = async (req, res) => {
  const group = new Group(req.body);
  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!group) {
      return res.status(404).json({ message: "Guruh topilmadi" });
    }
    res.json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Guruh topilmadi" });
    }
    res.json({ message: "Guruh o'chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addStudentToGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Guruh topilmadi" });
    }

    if (group.students.length >= 15) {
      return res.status(400).json({ message: "Guruh to'lgan (maksimal 15 ta o'quvchi)" });
    }

    const student = await Student.findById(req.body.studentId);
    if (!student) {
      return res.status(404).json({ message: "O'quvchi topilmadi" });
    }

    group.students.push(student._id);
    student.group = group._id;

    await Promise.all([group.save(), student.save()]);
    res.json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
