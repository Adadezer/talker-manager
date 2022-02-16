const autenticacaoAge = (req, resp, next) => {
  const { age } = req.body;

  if (!age) return resp.status(400).json({ message: 'O campo "age" é obrigatório' });

  if (age < 18) {
    return resp.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = autenticacaoAge;