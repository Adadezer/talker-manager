const express = require('express');
const crypto = require('crypto');
const autEmail = require('./autenticacao/email');
const autPassword = require('./autenticacao/password');

const router = express.Router();

router.post('/', autEmail, autPassword, (req, resp) => {
  const tokenRandon = crypto.randomBytes(8).toString('hex');

  resp.status(200).json({ token: tokenRandon });
});

module.exports = router;