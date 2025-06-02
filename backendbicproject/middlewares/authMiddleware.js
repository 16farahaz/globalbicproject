const jwt = require('jsonwebtoken');
const { getUser } = require('../utils/db'); // Import the getUser function

// Middleware to protect routes by verifying JWT
const protectRoute = async (req, res, next) => {
  const User = getUser(); // Get the User model
  try {
    let token = req.cookies?.token;
    console.log("Token from cookies:", token);

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ status: false, message: "Not authorized. Try login again." });
    }

    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by primary key (id)
    const user = await User.findByPk(decodedToken.userId, {
      attributes: ['isAdmin', 'email']  // select only these fields
    });
    console.log("Decoded token:", decodedToken);
    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({ status: false, message: "User not found. Try login again." });
    }

    // Attach user info to request object
    req.user = {
      email: user.email,
      isAdmin: user.isAdmin,
      userId: decodedToken.userId,
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ status: false, message: "Not authorized. Try login again." });
  }
};

// Middleware to check if user is admin
const isAdminRoute = (req, res, next) => {
  console.log("our request", req.user, "isAdmin:", req.user?.isAdmin);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};

module.exports = { protectRoute, isAdminRoute };
