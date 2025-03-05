const User = require("../model/UserModel"); // Make sure this path is correct
const { createSecretToken } = require("../util/SecretToken"); // Ensure this is the correct path
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const user = await User.create({
      email,
      password: hashedPassword, // Store hashed password
      username,
      createdAt,
    });

    // Generate a token for the user
    const token = createSecretToken(user._id);

    // Set the token in the cookie
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false, // Set to true in production for security
    });

    // Send success response
    res.status(201).json({ message: "User signed up successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // Compare the provided password with the stored hashed password
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // Generate a token for the user
    const token = createSecretToken(user._id);

    // Set the token in the cookie
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false, // Set to true in production for security
    });

    // ✅ Return success and redirect URL
    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      username: user.username,
      redirectUrl: "https://zerodha-clonee-dashboard.netlify.app", // Ensure this is correct
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};



