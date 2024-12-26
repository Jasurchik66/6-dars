import express from 'express';
import { 
  getAllStudents, 
  getStudent, 
  createStudent, 
  updateStudent, 
  deleteStudent 
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
