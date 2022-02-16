const express = require('express');
const fs = require('fs');
const autName = require('./autenticacao/name');
const autAge = require('./autenticacao/age');
const autTalk = require('./autenticacao/talk');
const autwatchedAt = require('./autenticacao/watchedAt');
const autRate = require('./autenticacao/rate');
const autorizar = require('./autenticacao/authorization');

const router = express.Router();

router.get('/', (req, resp) => {
  const palestrantes = fs.readFileSync('talker.json', 'utf-8');
  if (!palestrantes) return resp.status(200).json([], 'utf-8');
  
  return resp.status(200).send(JSON.parse(palestrantes));
});

router.get('/:id', (req, resp) => {
  const palestrantes = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const { id } = req.params;

  const findPalestrantes = palestrantes.find((p) => p.id === Number(id));

  if (!findPalestrantes) {
    return resp.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return resp.status(200).json(findPalestrantes);
});

router.post('/', autorizar, autName, autAge, autTalk, autwatchedAt, autRate, (req, resp) => {
  const palestrantes = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const { name, age, talk } = req.body;

  fs.writeFileSync('talker.json',
    JSON.stringify([...palestrantes,
      { id: palestrantes[palestrantes.length - 1].id + 1, name, age, talk }]));

  return resp.status(201).json({
    id: palestrantes[palestrantes.length - 1].id + 1, name, age, talk, 
  });
});
module.exports = router;