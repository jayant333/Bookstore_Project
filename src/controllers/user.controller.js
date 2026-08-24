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
