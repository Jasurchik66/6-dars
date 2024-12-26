import express from 'express';
import {
  getAllGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  addStudentToGroup
} from '../controllers/groupController.js';

const router = express.Router();

router.get('/', getAllGroups);
router.get('/:id', getGroup);
router.post('/', createGroup);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);
router.post('/:id/students', addStudentToGroup);

export default router;