const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    amount: Number,
    dueDate: Date,
    recipientEmail: String,
    status: {
        type: String,
        enum: ['pending', 'paid', 'overdue'],
        default: 'pending'
    },
    remindersSent: [
        {
          date: Date,
          status: {
            type: String,
            enum: ['sent', 'failed'],
            default: 'sent',
          },
          followUp: {
            date: Date, 
            recipientResponse: {
              type: String,
              enum: ['none', 'acknowledged', 'paid', 'declined'],
              default: 'none',
            },
            actionTaken: String, 
          },
        },
      ],
}, {
    timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);