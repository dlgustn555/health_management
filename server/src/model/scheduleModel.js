const mongoose = require('mongoose');

/*
program: [
  {
      name: '벤치프레스',
      course: [
        { set: 1, value: 10, unit: 'kg', repeat: 10},
        { set: 2, value: 10, unit: 'kg', repeat: 10},
        { set: 3, value: 10, unit: 'kg', repeat: 10}
      ]
  },
  {
      name: '벤치프레스',
      course: [
        { set: 1, value: 10, unit: 'kg', repeat: 10},
        { set: 2, value: 10, unit: 'kg', repeat: 10},
        { set: 3, value: 10, unit: 'kg', repeat: 10}
      ]
    }
]
*/
const ScheduleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  templateId: { type: String, required: true },
  order: { type: Number, required: true },
  part: { type: String, required: true },
  program: { type: Array, required: true },
  modDate: { type: Date, required: true }
})

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
