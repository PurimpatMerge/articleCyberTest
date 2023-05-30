import express from "express";
import {
  getUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import {
  validationUser,
  validationUpdateUser,
} from "../validation/userValidation.js";

const router = express.Router();

//Users routes
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/register", validationUser, registerUser);
router.put("/update/:id", validationUpdateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;
