import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connection } from "../index.mjs";

export const login = (req, res, next) => {

  const { uemail, password } = req.body;

  try {
    // Check if the user exists
    const getUserQuery = `
      SELECT * FROM users WHERE uemail = ?
    `;
    connection.query(getUserQuery, [uemail], async (error, results) => {
      if (error) {
        throw error;
      }

      if (!results || results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Verify the password
      const storedPassword = results[0].upassword;
      const passwordMatch = await bcrypt.compare(password, storedPassword);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: results[0].userid,uemail: results[0].uemail }, process.env.JWT, { expiresIn: "7d" });

      // Save the access token in a cookie
      res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "None" });


      res.status(200).json({ message: "Login successful" ,accessToken:token, userid:results[0].userid});
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
