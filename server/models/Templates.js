const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['DUE_SOON', 'PAST_DUE', 'FINAL_NOTICE','REMINDER','GENERIC_REMINDER'],
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);