const express = require('express')
let app = express()

app.get('/user', (req, res) => {
  res.json({ name: '雷' })
})

app.listen(4000)
