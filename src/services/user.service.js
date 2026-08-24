export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(userData) {
    return this.userRepository.create(userData);
  }
}
