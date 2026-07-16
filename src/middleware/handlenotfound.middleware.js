export const handleNotFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "404: Page not Found",
  });
};
