
module.exports = async function (id, response) {
    console.log(id);
    const user = await User.findOne({_id : id});
  console.log(user);

  if (user.status != "Active") {
    return response.status(400).json({
      status: false,
      message: "Failed",
      data: "Youre not a verified User. Please check your mail to verify yourself",
    });
  }
  return;
};
