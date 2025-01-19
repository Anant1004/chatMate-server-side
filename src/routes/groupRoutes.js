import express from 'express';
import { createGroup,
  getGroupDetails,
  addSingleMemberToGroup,
  removeSingleMemberFromGroup,
  updateGroup,deleteGroup,
  getAllGroups,
  getUserGroups,
  getGroupCreatedByUser
 } from '../controllers/groupControllers.js';

const router = express.Router();

router.post('/', createGroup);
router.get('/details/:groupId', getGroupDetails);
router.put('/addSingleMember', addSingleMemberToGroup);
router.patch('/removeSingleMember', removeSingleMemberFromGroup);
router.patch('/updateGroup', updateGroup);
router.delete('/delteGroup', deleteGroup);
router.get('/getAllGroups', getAllGroups);
router.get('/getUserGroups', getUserGroups);
router.get('/getGroupCreatedByUser', getGroupCreatedByUser); 

export default router;
