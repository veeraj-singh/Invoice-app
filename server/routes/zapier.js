const express = require('express')
const router = express.Router()
const axios = require('axios')
const cron = require('node-cron');
const zapierAuthMiddleware = require("../middleware/zapierauth");
const authMiddleware = require('../middleware/auth')
const Invoice = require('../models/Invoice')
const EmailTemplate = require('../models/Templates');
const dotenv = require('dotenv')
dotenv.config()

const getReminderType = (dueDate) => {
    const today = new Date();
    const daysUntilDue = Math.ceil((new Date(dueDate) - today) / (1000 * 60 * 60 * 24));

    if (daysUntilDue <= -7) return 'FINAL_NOTICE';
    if (daysUntilDue < 0) return 'PAST_DUE';
    if (daysUntilDue <= 3) return 'DUE_SOON';
    return 'REMINDER';
};

const getScheduledReminders = async () => {
  try {
    const pendingInvoices = await Invoice.find({
        status: 'pending',
        dueDate: { 
            $lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
        }
    }).populate('userId', 'name email');

    if (pendingInvoices.length === 0) {
        console.log('No pending invoices found');
        return;
    }

    const template = await EmailTemplate.findOne({ 
      type:'GENERIC_REMINDER' ,
      isActive: true 
    });

    const zapierPayload = {
      emailContent: template.body,  
      recipientEmails: pendingInvoices.map(invoice => invoice.recipientEmail).join(','),
      subject: 'Invoice Payment Reminder',
    };

    await axios.post(process.env.ZAPIER_WEBHOOK_URL1, zapierPayload);

    for (const invoice of pendingInvoices){
      invoice.remindersSent.push({
        date: new Date(),
        status: 'sent',
        followUp: {
          date: new Date(),
          recipientResponse: 'none',
          actionTaken: 'Scheduled reminder sent'
        }
      });
      await invoice.save();
    }
    
    console.log('Reminder emails triggered successfully');
  } catch (error) {
      console.error('Error in invoice reminder system:', error);
  }
  return ;
}

cron.schedule('0 9 * * *', async () => {
  await getScheduledReminders()
});

router.get('/scheduled-reminder', async (req , res) => {
  await getScheduledReminders()
})

router.post('/manual-reminder', authMiddleware , async (req, res) => {
    try {
      const { invoiceId } = req.body;
      const invoice = await Invoice.findById(invoiceId).populate('userId');
      
      if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
  
    const reminderType = getReminderType(invoice.dueDate);

    const template = await EmailTemplate.findOne({ 
      type: reminderType ,
      isActive: true 
    });
    

    if (!template) {
      return res.status(404).json({ error: 'Email template not found' });
    }

    const subject = template.subject.replace('{invoiceId}', invoice._id).replace('{amount}', invoice.amount);
    const body = template.body.replace('{customerName}', invoice.userId.name)
      .replace('{invoiceId}', invoice._id)
      .replace('{amount}', invoice.amount)
      .replace('{dueDate}', invoice.dueDate.toLocaleDateString());

    const emailData = {
      recipientEmail: invoice.recipientEmail,
      subject,
      body,
      invoiceId: invoice._id
    };

      await axios.post(process.env.ZAPIER_WEBHOOK_URL2, emailData);
      invoice.remindersSent.push({
        date: new Date(),
        status: 'sent',
        followUp: {
          date: new Date(),
          recipientResponse: 'none',
          actionTaken: 'Manual reminder sent'
        }
      });
      await invoice.save();
  
      res.json(emailData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


router.post('/invoice-responses', zapierAuthMiddleware , async (req, res) => {
  try {
    const { Body, Date, Subject } = req.body;
    if (!Body || !Date || !Subject) {
        return res.status(400).json({ error: "Missing required fields in the payload" });
    }
    
    const invoiceId = Subject.split('#')[1]?.split(' ')[0];
    const firstLine = Body.split("\n")[0]
    
    if (invoiceId) {
      const invoice = await Invoice.findById(invoiceId);
      if (invoice && invoice.remindersSent.length > 0) {
          const lastIndex = invoice.remindersSent.length - 1;
          // invoice.remindersSent[lastIndex].followUp.date =  new Date().toISOString()
          invoice.remindersSent[lastIndex].followUp.recipientResponse = 'acknowledged';
          invoice.remindersSent[lastIndex].followUp.actionTaken = firstLine.substring(0, 50);
          console.log(invoice.remindersSent[lastIndex].followUp)
          await invoice.save();
      }
  }  

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process response' });
  }
});

module.exports = router;
  