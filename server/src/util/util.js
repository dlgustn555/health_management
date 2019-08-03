
const save = async (model) => {
  try {
    const { _id } = await model.save();
    return { success: true, data: { _id } };
  } catch (e) {
    return { success: false, data: { e } };
  }
};

const find = async (model, query, projection = {}) => {
  try {
    const aResult = await model.find(query, projection);
    return { success: true, data: { aResult } };
  } catch (e) {
    return { success: false, data: { e } };
  }
};

const findById = async (model, id, projection = {}) => {
  try {
    console.log(id);
    const result = await model.findById(id, projection);
    return { success: true, data: { result } };
  } catch (e) {
    return { success: false, data: { e } };
  }
};

module.exports = {
  save,
  find,
  findById
};
