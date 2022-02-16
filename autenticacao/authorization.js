const autorizacao = (req, resp, next) => {
  const { authorization } = req.headers; // chave authorization pega o token criado no login
  
  if (!authorization) return resp.status(401).json({ message: 'Token não encontrado' });

  if (authorization.length !== 16) {
    return resp.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = autorizacao;
