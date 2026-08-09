export class APIFeatures {
  constructor(query, queryString, searchableFields = []) {
    this.query = query;
    this.queryString = queryString;
    this.searchableFields = searchableFields;
    console.log(query, queryString, searchableFields);
  }

  //filter operation
  filter() {
    const queryObj = { ...this.queryString };

    const excludeFields = ["page", "sort", "limit", "fields", "search"];

    excludeFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|in|ne)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  //sorting
  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort);
    }
    return this;
  }

  //field selection
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");

      this.query = this.query.select(fields);
    }
    return this;
  }

  //search
  search() {
    if (this.queryString.search && this.searchableFields.length) {
      const keyword = this.queryString.search;
      this.query = this.query.find({
        $or: this.searchableFields.map((field) => ({
          [field]: {
            $regex: keyword,
            $options: "i",
          },
        })),
      });
    }
    return this;
  }

  //pagination
  pagination() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
