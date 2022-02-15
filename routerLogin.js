const express = require('express');
const crypto = require('crypto');
const autenticacao = require('./autenticacao');

const router = express.Router();
// const app = express();

// app.use(autenticacao);

const { autenticacaoEmail, autenticacaoPassword } = autenticacao;

router.post('/', autenticacaoEmail, autenticacaoPassword, (req, resp) => {
  const tokenRandon = crypto.randomBytes(8).toString('hex');

  resp.status(200).json({ token: tokenRandon });
});

module.exports = router;