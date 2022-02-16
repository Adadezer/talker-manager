const autenticacaoWatchedAt = (req, resp, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt) {
    return resp.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  /* código regex encontrado no StackOverflow: 
  https://stackoverflow.com/questions/10194464/javascript-dd-mm-yyyy-date-check */

  const reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;

  if (!watchedAt.match(reg)) {
    return resp.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = autenticacaoWatchedAt;