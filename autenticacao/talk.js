const autenticacaoTalk = (req, resp, next) => {
  const { talk } = req.body;

  if (!talk) {
    return resp.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
  }

  next();
};

module.exports = autenticacaoTalk;