const dotenv = require('dotenv')
dotenv.config()

const zapierAuthMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key']
    if (!apiKey || apiKey !== process.env.ZAPIER_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

module.exports = zapierAuthMiddleware

