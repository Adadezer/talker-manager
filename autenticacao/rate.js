const autenticacaoRate = (req, resp, next) => {
  const { talk: { rate } } = req.body;

  if (!rate) {
    return resp.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (rate < 1 || rate > 5) {
    return resp.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = autenticacaoRate;