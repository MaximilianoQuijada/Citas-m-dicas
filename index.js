const express = require("express")
const app = express()

app.listen(3000, console.log("Server ON"))

const axios = require('axios')
const chalk = require('chalk')
const { v4: uuidv4 } = require('uuid')
const _ = require('lodash')
const moment = require('moment')


let users = []
app.get("/usuarios", async (req, res) => {
  const { data } = await axios.get('https://randomuser.me/api')
  const { name: { first, last }, gender } = data.results[0]
  const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a')
  const id = uuidv4().slice(30)
  users.push({ id, first, last, gender, timestamp })
  const usuarios = _.partition(users, ({ gender }) => gender == "female")

  let template = `
  <h5> Mujeres: </h5>

    <ol>
      ${usuarios[0].map(u => `<li>Nombre: ${u.first} - Apellido: ${u.last} - ID: ${u.id} - Timestamp: ${u.timestamp} </li>`).join('')}
    </ol>

  <h5> Hombre: </h5>

    <ol>
      ${usuarios[1].map(u => `<li>Nombre: ${u.first} - Apellido: ${u.last} - ID: ${u.id} - Timestamp: ${u.timestamp} </li>`).join()}
    </ol>
  `

  console.log(chalk.blue.bgWhite(template))
  res.send(template)
})


