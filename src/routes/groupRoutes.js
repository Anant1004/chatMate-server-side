import express from 'express';
import { createGroup, getGroupDetails,addSingleMemberToGroup,removeSingleMemberFromGroup,updateGroup } from '../controllers/groupControllers.js';

const router = express.Router();

router.post('/', createGroup);
router.get('/:groupId', getGroupDetails);
router.put('/addSingleMember', addSingleMemberToGroup);
router.patch('/removeSingleMember', removeSingleMemberFromGroup);
router.patch('/updateGroup', updateGroup);

export default router;
