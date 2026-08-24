import User from "../models/user.model.js";
import { BaseRepository } from "./BaseRepository.js";

export class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}
