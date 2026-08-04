export class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  //filter operation
  filter() {
    const filter = {};
    if (this.queryString.genre) {
      filter.genre = this.queryString.genre;
    }
    this.query = this.query.find(filter);
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
  serach() {
    if (this.queryString.search) {
      this.query = this.query.find({
        title: {
          $regex: this.queryString.search,
          $options: "i", //i means case-insensitive
        },
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
