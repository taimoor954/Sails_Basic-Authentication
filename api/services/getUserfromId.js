exports.getUserFromId = async function (id) {
  const user = await User.findOne({ id: id });

  if (!user) {
    return "No user found with this id";
  }
  delete user.password;
  return user;
};
