const express = require('express');
const router = express.Router();
const EmailTemplate = require('../models/Templates');

router.get('/', async (req, res) => {
  try {
    const templates = await EmailTemplate.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching templates', error });
  }
});


router.get('/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const template = await EmailTemplate.findOne({ type });
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching template', error });
  }
});


router.put('/:type', async (req, res) => {
  const { type } = req.params;
  console.log(type)
  const { subject, body } = req.body;
  try {
    const updatedTemplate = await EmailTemplate.findOneAndUpdate(
      { type },
      { subject, body },
      { new: true }  
    );
    console.log(updatedTemplate)
    if (!updatedTemplate) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json(updatedTemplate);
  } catch (error) {
    res.status(500).json({ message: 'Error updating template', error });
  }
});

module.exports = router;
