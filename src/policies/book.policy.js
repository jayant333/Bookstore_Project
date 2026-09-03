export const canCreateBook = (user) => {
  return user.role === "admin";
};

export const canUpdateBook = (user, book) => {
  return user.role === "admin";
};

export const canDeleteBook = (user, book) => {
  return user.role === "admin";
};

export const canReadBook = (user, book) => {
  return user.role === "user" || user.role === "admin";
};


