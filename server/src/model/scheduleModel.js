const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  templateId: { type: String, required: true },
  order: { type: Number, required: true },
  part: { type: String, required: false },
  year: { type: Number, require: true },
  month: { type: Number, require: true },
  date: { type: Number, require: true },
  day: { type: Number, require: true },
  cellIndex: { type: Number, require: true },
  aCourse: { type: Array, required: true },
  modDate: { type: Date, required: false }
})

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
