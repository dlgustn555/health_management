const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  days: { type: Array, require: true },
  programs: { type: Array, require: false },
  modDate: { type: Date, required: true }
});

const Template = mongoose.model('Template', TemplateSchema);

module.exports = Template;
