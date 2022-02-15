const express = require('express');
const fs = require('fs');

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
module.exports = router;