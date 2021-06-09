exports.getOneFactoryById = async (Model, id) => {
    let query = Model.findOne({id:id});

  const doc = await query;

  if (!doc) {
    return doc;
  }
  return doc;
};
