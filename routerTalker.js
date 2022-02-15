const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, resp) => {
  const palestrantes = fs.readFileSync('talker.json', 'utf-8');
  if (!palestrantes) return resp.status(200).json([], 'utf-8');
  
  return resp.status(200).send(JSON.parse(palestrantes));
});

module.exports = router;