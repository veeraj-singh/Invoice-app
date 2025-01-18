// const mongoose = require('mongoose')
// const EmailTemplate = require('./models/Templates');
// const dotenv = require('dotenv')
// dotenv.config()

// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err))

// const defaultTemplates = [
//   {
//     type: 'REMINDER',
//     subject: 'Friendly Reminder: Invoice #{invoiceId} Due Soon',
//     body: `Dear {customerName},

//   This is a gentle reminder that invoice #{invoiceId} for ₹{amount} is due on {dueDate}.

//   Please take a moment to review and process your payment at your earliest convenience.

//   You can process your payment through our secure payment portal: [Payment Link]

//   If you have any questions or need assistance, feel free to reach out.

//   Best regards,  
//   [Your Company Name]`
//   }
//   ,
//     {
//         type: 'DUE_SOON' ,
//         subject: 'Friendly Reminder: Invoice #{invoiceId} is Due Soon',
//         body: `Dear {customerName},
      
//       This is a friendly reminder that invoice #{invoiceId} for ₹{amount} is due on {dueDate}. 
      
//       To avoid any late fees, please make your payment by {dueDate} through our secure payment portal: [Payment Link]
      
//       We appreciate your prompt attention to this matter.
      
//       Sincerely,
//       [Your Company Name]`
//       },
//       {
//         type: 'PAST_DUE',
//         subject: 'Invoice #{invoiceId} is Past Due',
//         body: `Dear {customerName},
    
//     We noticed that invoice #{invoiceId} for ₹{amount} was due on {dueDate} and remains unpaid.
    
//     To avoid further action, we kindly request that you make payment as soon as possible.
    
//     You can process your payment through our secure payment portal: [Payment Link]
    
//     If you have already made the payment, please disregard this message or contact us with the payment details.
    
//     Best regards,  
//     [Your Company Name]`
//     }
//     ,
//       {
//         type: 'FINAL_NOTICE',
//         subject: 'Final Notice: Invoice #{invoiceId} Payment Required',
//         body: `Dear {customerName},
    
//     This is a final notice regarding invoice #{invoiceId} for ₹{amount}, which was due on {dueDate}.
    
//     Immediate payment is required to avoid further escalation. Please make the payment promptly to resolve this matter.
    
//     You can process your payment through our secure payment portal: [Payment Link]
    
//     If you have already paid, we apologize for any inconvenience and request that you contact us to confirm.
    
//     Best regards,  
//     [Your Company Name]`
//     },
//     {
//       type: 'GENERIC_REMINDER',
//       subject: 'Payment Reminder',
//       body: `Dear Customer,
  
//   We would like to remind you about an outstanding payment. Please review your account and make the necessary payment at your earliest convenience.
  
//   You can process your payment through our secure payment portal: [Payment Link]
  
//   If you have any questions or need assistance, feel free to reach out to us.
  
//   Thank you for your attention to this matter.
  
//   Best regards,  
//   [Your Company Name]`
//   }
  
// ];

// async function initTemplates() {
//   try {
//     for (const template of defaultTemplates) {
//       await EmailTemplate.findOneAndUpdate(
//         { type: template.type },
//         template,
//         { upsert: true }
//       );
//     }
//     console.log('Templates initialized successfully');
//   } catch (error) {
//     console.error('Error initializing templates:', error);
//   }
// }

// initTemplates();
