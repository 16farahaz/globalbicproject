const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUser } = require("../utils/db"); // Import the getUser function
const { createJWT } = require("../utils/index");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const User = getUser(); // Get the User model
    if (!User) {
      return res
        .status(500)
        .json({ status: false, message: "Database not initialized" });
    }

    const {
      name,
      title,
      matricule,
      email,
      motdepasse,
      isAdmin,
      phone,
      address,
      isactive,
    } = req.body;

    // Check if user already exists by matricule (unique and personal)
    const userExistByMatricule = await User.findOne({ where: { matricule } });
    if (userExistByMatricule) {
      return res
        .status(400)
        .json({
          status: false,
          message: "User with this matricule already exists",
        });
    }

    // Also check email uniqueness
    const userExistByEmail = await User.findOne({ where: { email } });
    if (userExistByEmail) {
      return res
        .status(400)
        .json({
          status: false,
          message: "User with this email already exists",
        });
    }

    // Create new user - password hashing will be handled by Sequelize hook beforeSave
    const user = await User.create({
      name,
      title,
      matricule,
      email,
      motdepasse, // raw password, will be hashed in model hook
      isAdmin,
      isactive,
      phone,
      address,
    });

    // Generate token if admin (optional)
    if (user && isAdmin) {
      createJWT(res, user.id);
    }

    // Remove password before sending response
    const userResponse = user.toJSON();
    delete userResponse.motdepasse;

    res
      .status(201)
      .json({
        status: true,
        message: "User registered successfully",
        user: userResponse,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const User = getUser(); // Get the User model
    if (!User) {
      return res
        .status(500)
        .json({ status: false, message: "Database not initialized" });
    }

    const { email, password } = req.body;
    console.log("Login attempt with email:", email);

    const userexist = await User.findOne({ where: { email } });
    console.log("User found:", userexist ? userexist.id : "No user found");

    if (!userexist) {
      return res
        .status(400)
        .json({ status: false, message: "User does not exist" });
    }

    if (!userexist.isactive) {
      return res
        .status(400)
        .json({ status: false, message: "Account is not active" });
    }

    // Check if the password is correct
    const isMatch = await userexist.matchPassword(password);

    if (userexist && isMatch) {
      createJWT(res, userexist.id);
      userexist.password = undefined;
      return res.status(200).json(userexist);
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    //lhne far8na l token mta3 l user f cookie w 7atina f valeur mta3ha "" w bnsba llexpiration hia new Date(0) ya3ni token mch mawjoud
    res.cookie("token", "", { httponly: true, expires: new Date(0) });
    res
      .status(200)
      .json({ status: true, message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// Get all users (Admin only)
exports.getTeamList = async (req, res) => {
  try {
    const User = getUser(); // Get the User model
    if (!User) {
      return res
        .status(500)
        .json({ status: false, message: "Database not initialized" });
    }

    const users = await User.findAll({
      attributes: [
        "id",
        "name",
        "title",
        "email",
        "matricule",
        "phone",
        "isAdmin",
        "address",
        "isactive",
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Update user profile (Admin can update any user, others update themselves)
exports.updateUserProfile = async (req, res) => {
  try {
    const User = getUser(); // Get the User model
    if (!User) {
      return res
        .status(500)
        .json({ status: false, message: "Database not initialized" });
    }

    const { userId, isAdmin } = req.user;
    console.log("isAdmin mrequette:", isAdmin);
    const { id, name, matricule, title, phone, address } = req.body;
    console.log("Updating user profile:", {
      userId,
      isAdmin,
      id,
      name,
      matricule,
      title,
      phone,
      address,
    });
    console.log("isAdmin:", isAdmin);

    // Determine which user to update
    const idToUpdate = isAdmin ? id || userId : userId;

    const user = await User.findByPk(idToUpdate);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (matricule && matricule !== user.matricule) {
      // Check if the new matricule already exists for another user
      const existingUser = await User.findOne({ where: { matricule } });
      if (existingUser && existingUser.id !== user.id) {
        return res
          .status(400)
          .json({
            status: false,
            message: "Matricule already exists for another user",
          });
      }
    }

    // Update fields if provided
    user.name = name || user.name;
    user.matricule = matricule || user.matricule;
    user.title = title || user.title;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.isAdmin = req.body.isAdmin;
 // Admin status can only be changed by admin

    await user.save();

    // Remove password before sending response
    const userResponse = user.toJSON();
    delete userResponse.motdepasse;

    res
      .status(200)
      .json({
        status: true,
        message: "Profile updated successfully",
        user: userResponse,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Change user password
exports.changeUserPassword = async (req, res) => {
  try {
    const User = getUser(); // Get the User model
    if (!User) {
      return res
        .status(500)
        .json({ status: false, message: "Database not initialized" });
    }

    const { userId } = req.user;
    const { newPassword } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Update password - this will trigger the beforeSave hook for hashing
    user.motdepasse = newPassword;
    await user.save();

    // Remove password before sending response
    const userResponse = user.toJSON();
    delete userResponse.motdepasse;

    res
      .status(200)
      .json({
        status: true,
        message: "Password updated successfully",
        user: userResponse,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Activate or deactivate user (Admin only)
exports.activateUserProfile = async (req, res) => {
  try {
    const User = getUser(); // Get the User model
    if (!User) {
      return res
        .status(500)
        .json({ status: false, message: "Database not initialized" });
    }

    const { id } = req.params;
    const { isactive } = req.body;
    console.log("Activating user with ID:", id, "Status:", isactive);

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    user.isactive = isactive;
    await user.save();

    res.status(200).json({
      status: true,
      message: `User is successfully ${isactive ? "Activated" : "Disabled"}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Delete user (Admin only)
exports.deleteUserProfile = async (req, res) => {
  try {
    const User = getUser(); // Get the User model
    if (!User) {
      return res
        .status(500)
        .json({ status: false, message: "Database not initialized" });
    }

    const { id } = req.params;
    const deletedCount = await User.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
