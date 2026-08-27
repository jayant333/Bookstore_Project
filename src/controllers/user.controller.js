import { UserRepository } from "../repository/user.repository.js";
import { UserService } from "../services/user.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const userService = new UserService(new UserRepository());

export const registerUser = asyncHandler(async (req, res) => {
  const user = await userService.register(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

export const findUser = asyncHandler(async (req, res) => {
  const userData = await userService.findUser(req.query.email);

  res.status(200).json({
    success: true,
    data: userData,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.login(email, password);

  res.status(200).json({
    success: true,
    data: user,
  });
});
