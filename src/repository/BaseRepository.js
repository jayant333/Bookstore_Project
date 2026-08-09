import { APIFeatures } from "../features/APIFeatures.js";

export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(queryString = {}, searchableFields = []) {
    const features = new APIFeatures(
      this.model.find(),
      queryString,
      searchableFields,
    )
      .filter()
      .search()
      .sort()
      .limitFields()
      .pagination();

    const filter = features.getFilter();

    const totalDocuments = await this.model.countDocuments(filter);

    const documents = await features.query;

    const page = Number(queryString.page) || 1;

    const limit = Number(queryString.limit) || 10;

    const totalPages = Math.ceil(totalDocuments / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      documents,
      pagination: {
        page,
        limit,
        totalDocuments,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async updateById(id, data) {
    return await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }
}
