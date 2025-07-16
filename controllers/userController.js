import Joi from "joi";
import * as userService from "../services/userService.js";

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export async function getAllUsers(req, res, next) {
  try {
    const search = req.query.search || "";
    const users = await userService.fetchAllUsers(search);
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newUser = await userService.insertUser(value);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}
