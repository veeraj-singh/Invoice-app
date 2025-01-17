const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Invoice = require('../models/Invoice')

router.post('/', auth, async (req, res) => {
    try {
        const { amount, dueDate, recipientEmail } = req.body;
        const invoice = await Invoice.create({
            userId: req.user.id,
            amount,
            dueDate,
            recipientEmail,
            status: 'pending'
        });
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/', auth, async (req, res) => {
    try {
        const invoices = await Invoice.find({ userId: req.user.id })
            .sort({ createdAt: -1 });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats', auth , async (req, res) => {
    try {
      const userId = req.user.id 
      const invoices = await Invoice.find({ userId });
  
      const totalOutstanding = invoices
        .filter(invoice => invoice.status !== 'paid')
        .reduce((sum, invoice) => sum + invoice.amount, 0);
  
      const pendingCount = invoices.filter(invoice => invoice.status === 'pending').length;
  
      const overdueCount = invoices.filter(invoice => invoice.status === 'overdue').length;
  
      const paidThisMonth = invoices.reduce((total, invoice) => {
        if (invoice.status === 'paid') {
          const now = new Date();
          const paidDate = new Date(invoice.updatedAt);
          if(
            paidDate.getFullYear() === now.getFullYear() &&
            paidDate.getMonth() === now.getMonth()
          ) {
            return total + invoice.amount
          }}
        return total;
      }, 0)
  
      res.status(200).json({
        totalOutstanding,
        pendingCount,
        overdueCount,
        paidThisMonth,
      });
    } catch (error) {
      console.error('Error fetching invoice stats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.get('/:id', auth, async (req, res) => {
    try {
        const invoice = await Invoice.findOne({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['amount', 'dueDate', 'recipientEmail', 'status'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates' });
    }
    try {
        const invoice = await Invoice.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        updates.forEach(update => invoice[update] = req.body[update]);
        await invoice.save();
        
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const invoice = await Invoice.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router