import { UserRepository } from "../repository/user.repository.js";
import { UserService } from "./user.service.js";

export const userService = new UserService(new UserRepository());
