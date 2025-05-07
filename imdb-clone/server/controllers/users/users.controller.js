import { generateJWT } from "../../config/jwt.js";
import userModel from "../../models/users.model.js";
import bcrypt, { compare } from "bcrypt";

export const userController = {
  createUser: async (req, res) => {
    const { body } = req;
    try {
      let user = await userModel.findOne({
        email: body.email,
        deletedAt: null,
      });
      if (user) return res.status(400).json({ msg: "User already registered" });
      const hashedPassword = await bcrypt.hash(body.password, 10);
      user = await userModel.create({
        email: body.email,
        password: hashedPassword,
      });
      res.status(201).json({ msg: "User registered successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  validateUser: async (req, res) => {
    const { body } = req;
    try {
      const testUser = await userModel.findOne(
        {
          email: body.email,
          deletedAt: null,
        }
      );
      if (!testUser) return res.status(404).json({ msg: "User not found" });
      const user = await userModel.findOne(
        {
          email: body.email,
          deletedAt: null,
        },{password : 0,__v : 0}
      );
      const isValidPassword = await bcrypt.compare(
        body.password,
        testUser.password
      );
      const token = generateJWT({user});
      return isValidPassword
        ? res.json({token,user})
        : res.status(401).json({ msg: "Unauthorized" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      let user = await userModel.findOne({ _id: id });
      if (!user) return res.status(400).json({ msg: "User not found" });
      user = await userModel.updateOne(
        { _id: id },
        {
          $set: {
            deletedAt: new Date().toISOString(),
            email: `${Date.now()}-${user.email}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await userModel.find({ deletedAt: null });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  getUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.findOne({ _id: id, deletedAt: null });
      if (!user) return res.status(400).json({ msg: "User not found" });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};
