const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getTeamList,
  updateUserProfile,
  changeUserPassword,
  activateUserProfile,
  deleteUserProfile
} = require('../controllers/userController');

const { protectRoute, isAdminRoute } = require('../middlewares/authMiddleware');

// Register a new user
router.post('/register', protectRoute,isAdminRoute,registerUser);

// Login user
router.post('/login', loginUser);

// Logout user
router.post('/logout', protectRoute, logoutUser);

// Get list of all users (admin only)
router.get('/team', protectRoute, isAdminRoute, getTeamList);

// Update user profile (any logged-in user)
router.put('/profile', protectRoute, updateUserProfile);

// Change password (logged-in user)
router.put('/change-password', protectRoute, changeUserPassword);

// Activate/deactivate user (admin only)
router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUserProfile); 

module.exports = router;
