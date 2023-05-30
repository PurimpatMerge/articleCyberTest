import { connection } from "../index.mjs";
import User from "../schemes/usersmodel.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM users", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results);
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    connection.query("SELECT * FROM users WHERE userid = ?", userId, (error, results) => {
      if (error) {
        throw error;
      }

      if (results.length === 0) {
        // User not found
        return res.status(404).json({ error: "User not found." });
      }

      const user = results[0];
      res.status(200).json(user);
    });
  } catch (err) {
    next(err);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.upassword, salt);
    const currentTime = new Date().toISOString();
    const upicture = req.body.upicture || "";

    // Check if email already exists
    connection.query(
      "SELECT * FROM users WHERE uemail = ?",
      req.body.uemail,
      (error, results) => {
        if (error) {
          throw error;
        }

        if (results.length > 0) {
          // Email already exists
          return res
            .status(409)
            .json({ error: "This Email is already exist. " });
        }

        // Email is unique, proceed with registration
        const newUser = new User(
          req.body.fname,
          req.body.lname,
          req.body.username,
          req.body.uemail,
          hash,
          upicture,
          currentTime
        );

        connection.query(
          "INSERT INTO users SET ?",
          newUser,
          (error, results) => {
            if (error) {
              throw error;
            }
            res
              .status(201)
              .json({ message: "Registration successful.", results, newUser });
          }
        );
      }
    );
  } catch (err) {
    next(err);
  }
};


export const updateUser = async (req, res, next) => {
    try {
      const currentTime = new Date().toISOString();
      const userid = req.params.id;
  
      // Check if the user exists
      const dataUser = await new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users WHERE userid = ?", userid, (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        });
      });
  
      if (!dataUser) {
        // User not found
        return res.status(404).json({ error: "User not found." });
      }
  
      const { uemail } = req.body;
  
      if (uemail && uemail !== dataUser.uemail) {
        // Check if the new email address already exists for another user not it own
        const existingUser = await new Promise((resolve, reject) => {
          connection.query(
            "SELECT * FROM users WHERE uemail = ? AND userid <> ?",
            [uemail, userid],
            (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                resolve(results[0]);
              }
            }
          );
        });
  
        if (existingUser) {
          // Email address already exists for another user
          return res.status(409).json({ error: "Email address already exists." });
        }
      }
  
      const userUpdate = {
        fname: req.body?.fname || dataUser.fname,
        lname: req.body?.lname || dataUser.lname,
        username: req.body?.username || dataUser.username,
        uemail: uemail || dataUser.uemail,
        upassword: req.body?.upassword || dataUser.upassword,
        upicture: req.body?.upicture || dataUser.upicture,
        updateAt: currentTime,
      };
  
      let hash;
      if (req.body?.upassword) {
        hash = bcrypt.hashSync(req.body.upassword, bcrypt.genSaltSync(10));
      } else {
        hash = dataUser.upassword;
      }
  
      // Create the updated user object with or else old data
      const updatedUser = {
        ...userUpdate,
        upassword: hash,
      };
  
      // Update the user in the database
      connection.query(
        "UPDATE users SET ? WHERE userid = ?",
        [updatedUser, userid],
        (error, results, fields) => {
          if (error) {
            throw error;
          }
          res.status(201).json({
            message: "User updated successfully.",
            results,
            updatedUser,
          });
        }
      );
    } catch (err) {
      next(err);
    }
  };

  export const deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      connection.query("DELETE FROM users WHERE userid = ?", userId, (error, results) => {
        if (error) {
          throw error;
        }
  
        if (results.affectedRows === 0) {
          // User not found
          return res.status(404).json({ error: "User not found." });
        }
  
        res.status(204).json({ message: "User deleted successfully." });
      });
    } catch (err) {
      next(err);
    }
  };
  
  