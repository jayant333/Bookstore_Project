import { asyncHandler } from "../utils/asyncHandler";

export const updateReview = asyncHandler(async (req, res) => {
  const review = await this.reviewRepository.findById(reviewId);

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  await this.canModifyResource(review, currentUser);

  return this.reviewRepository.updateById(reviewId, data);
});
