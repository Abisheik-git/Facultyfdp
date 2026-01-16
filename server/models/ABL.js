const mongoose = require('mongoose');

const ablSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subjectName: { type: String, required: true },
  courseCode: { type: String, required: true },
  industryConnect: { type: String, required: true },
  proofDoc: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ABL', ablSchema);
