import authService from "../services/authService.js";

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(401).json({ error: "Username is required" });
    }
    if (!password) {
      return res.status(401).json({ error: "Password is required" });
    }

    const result = await authService.login(username, password);
    const token = result.token;

    res.header("Authorization", `Bearer ${token}`);

    return res.status(200).json({
      message: "Login Successful",
      username,
      token, 
    });
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({ message: err.message });
    } else if (err.message === "Invalid password") {
      return res.status(401).json({ message: err.message });
    }
    console.log("Error : ", err.message);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}

export default { login };
