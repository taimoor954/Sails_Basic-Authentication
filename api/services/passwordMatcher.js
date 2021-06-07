exports.matchPassword = (password, confirmPassword) => {
  if (password === confirmPassword) return true;
  return false;
};
