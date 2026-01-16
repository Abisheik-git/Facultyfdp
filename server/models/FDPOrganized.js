const mongoose = require('mongoose');

const fdpOrganizedSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  venue: { type: String, required: true },
  type: { type: String, enum: ['conference', 'workshop'], required: true },
  proofDoc: { type: String },
  report: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FDPOrganized', fdpOrganizedSchema);
