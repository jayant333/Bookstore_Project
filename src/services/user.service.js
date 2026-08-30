import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(userData) {
    return this.userRepository.create(userData);
  }

  async findUser(email) {
    return this.userRepository.findByEmailWithPassword(email);
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    return { user, token };
  }
}
