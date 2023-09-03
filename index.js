import fetch from 'node-fetch'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/api/player', async ({res}) => {
  const response = await fetch('https://api.spacetraders.io/v2/my/agent', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  return res.json(data)
})

app.get('/api/location', async (req, res) => {
  console.log('Fetching location....')
  const { system, waypoint } = req.query
  const response = await fetch(
    `https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypoint}`, {
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  console.log('Location Data: ', data)
  return res.json(data)
})

app.get('/api/contracts', async (req, res) => {
  console.log('Fetching contracts....')
  const response = await fetch(`https://api.spacetraders.io/v2/my/contracts`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  console.log('Response Data: ', data)
  return res.json(data)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))