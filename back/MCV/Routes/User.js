import express from "express";
const router = express.Router()

import { asyncHandler } from "../../Config/middleware.js";
import { 
    loginUser,
    signupUser,
    logOutUser,
    getAllUsers,
    getUserProfile,
    getUserProfileById,
    UpdateUserProfileById,
    deleteUser,
    UpdateUserProfile,
} from "../Controller/User.js";

router.post('/login', asyncHandler(loginUser))
router.post('/signup', asyncHandler(signupUser))
router.post('/logout', asyncHandler(logOutUser))

router.get('/', asyncHandler(getAllUsers))

router.get('/profile/:id', asyncHandler(getUserProfile))
router.put('/profile/:id', asyncHandler(UpdateUserProfile))

router.get('/:id', asyncHandler(getUserProfileById))
router.put('/:id', asyncHandler(UpdateUserProfileById))

router.delete('/:id', asyncHandler(deleteUser))

export default router