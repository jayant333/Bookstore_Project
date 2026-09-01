import { AppError } from "../utils/AppError.js";

export class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async canModifyResources(resource, currentUser) {
    const isAdmin = currentUser.role === "Admin";

    const isOwner = resource.user.toString() === currentUser._id.toString();

    if (!isOwner && !isAdmin) {
      throw new AppError("Access Denied", 403);
    }

    return true;
  }
}
