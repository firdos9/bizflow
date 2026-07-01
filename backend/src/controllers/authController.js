const authService = require("../services/authService");
const jwt = require("jsonwebtoken"); // 1. Import the library

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.registerUser(email, password);
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Registration failed", details: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call the service to verify the user
    const user = await authService.loginUser(email, password);

    // 2. Generate the token (the ID badge)
    const token = jwt.sign(
      { userId: user.id }, // The data we are locking inside the token
      process.env.JWT_SECRET, // The secret key to seal the token
      { expiresIn: "1h" }, // The token expires in 1 hour
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ error: "Login failed", details: error.message });
  }
};

module.exports = { register, login };
