const save = async (model) => {
  try {
    const { _id } = await model.save();
    return { success: true, data: { _id } };
  } catch (error) {
    return { success: false, data: { error } };
  }
};

const find = async (model, query, projection = {}) => {
  try {
    const aResult = await model.find(query, projection);
    return { success: true, data: { aResult } };
  } catch (error) {
    return { success: false, data: { error } };
  }
};

const findById = async (model, id, projection = {}) => {
  try {
    const result = await model.findById(id, projection);
    return { success: true, data: { result } };
  } catch (error) {
    return { success: false, data: { error } };
  }
};

const findByIdAndUpdate = async (model, id, update, option = {}) => {
  try {
    const result = await model.findByIdAndUpdate(id, update, option);
    return { success: true, data: { result } };
  } catch (error) {
    return { success: false, data: { error } };
  } 
};

module.exports = {
  save,
  find,
  findById,
  findByIdAndUpdate
};
