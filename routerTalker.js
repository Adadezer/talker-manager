const express = require('express');
const fs = require('fs');
const autName = require('./autenticacao/name');
const autAge = require('./autenticacao/age');
const autTalk = require('./autenticacao/talk');
const autwatchedAt = require('./autenticacao/watchedAt');
const autRate = require('./autenticacao/rate');
const autorizar = require('./autenticacao/authorization');
const getArquivoTalker = require('./getArquivoTalker');

const router = express.Router();

router.get('/', (req, resp) => {
  const palestrantes = getArquivoTalker();
  if (!palestrantes) return resp.status(200).json([], 'utf-8');
  
  return resp.status(200).send(palestrantes);
});

router.get('/search/', autorizar, (req, resp) => {
  const palestrantes = getArquivoTalker();
  const { name } = req.query;
  
  const searchPalestrante = palestrantes.filter((p) => p.name.includes(name));

  if (!name) return resp.status(200).json(palestrantes);
  
  return resp.status(200).json(searchPalestrante);
});

router.get('/:id', (req, resp) => {
  const palestrantes = getArquivoTalker();
  const { id } = req.params;

  const findPalestrantes = palestrantes.find((p) => p.id === Number(id));

  if (!findPalestrantes) {
    return resp.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return resp.status(200).json(findPalestrantes);
});

router.post('/', autorizar, autName, autAge, autTalk, autwatchedAt, autRate, (req, resp) => {
  const palestrantes = getArquivoTalker();
  const { name, age, talk } = req.body;

  fs.writeFileSync('talker.json',
    JSON.stringify([...palestrantes,
      { id: palestrantes[palestrantes.length - 1].id + 1, name, age, talk }]));

  return resp.status(201).json({
    id: palestrantes[palestrantes.length - 1].id + 1, name, age, talk, 
  });
});

router.put('/:id', autorizar, autName, autAge, autTalk, autwatchedAt, autRate, (req, resp) => {
  const palestrantes = getArquivoTalker();
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const findPalestrantes = palestrantes.find((p) => p.id === Number(id));
  
  fs.writeFileSync('talker.json', JSON.stringify(
    [...palestrantes, palestrantes[id] = { ...findPalestrantes, name, age, talk }],
  ));

  return resp.status(200).json({ id: Number(id), name, age, talk });
});

router.delete('/:id', autorizar, (req, resp) => {
  const palestrantes = getArquivoTalker();
  const { id } = req.params;
  const findPalestrantes = palestrantes.find((p) => p.id === Number(id));

  fs.writeFileSync('talker.json', JSON.stringify(
    palestrantes.splice(findPalestrantes, 1),
  ));
  
  resp.status(204).end();
});

module.exports = router;