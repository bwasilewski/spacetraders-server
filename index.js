import fetch from 'node-fetch'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

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

app.get('/api/system/:symbol', async (req, res) => {
  const { symbol } = req.params
  const response = await fetch(`https://api.spacetraders.io/v2/systems/${symbol}`, {
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  return res.json(data)
})

app.get('/api/system/:symbol/waypoints', async (req, res) => {
  const { symbol } = req.params
  const { limit = 10, page = 1 } = req.query
  const response = await fetch(`https://api.spacetraders.io/v2/systems/${symbol}/waypoints?limit=${limit}&page=${page}`, {
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  return res.json(data)
})

app.get('/api/system/:system/waypoint/:waypoint', async (req, res) => {
  console.log('Fetching location....')
  console.log(req.params)
  const { system, waypoint } = req.params
  const response = await fetch(
    `https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypoint}`, {
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  return res.json(data)
})


app.get('/api/system/:system/waypoint/:waypoint/market', async (req, res) => {
  const { system, waypoint } = req.params

  const response = await fetch(`https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypoint}/market`, {
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  return res.json(data)
})

app.get('/api/systems', async (req, res) => {
  const { limit = 10, page = 1 } = req.query
  const response = await fetch(`https://api.spacetraders.io/v2/systems?page=${page}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  return res.json(data)
})

app.get('/api/fleet', async (req, res) => {
  const response = await fetch(`https://api.spacetraders.io/v2/my/ships`, {
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  return res.json(data)
})

app.get('/api/fleet/:symbol', async (req, res) => {
  const { symbol } = req.params
  const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${symbol}`, {
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  return res.json(data)
})

app.get('/api/contracts/list', async (req, res) => {
  const response = await fetch(`https://api.spacetraders.io/v2/my/contracts`, {
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  return res.json(data)
})

app.get('/api/contract/:id', async (req, res) => {
  const { id } = req.params
  const response = await fetch(`https://api.spacetraders.io/v2/my/contracts/${id}`, {
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  return res.json(data)
})


// app.get('/api/contracts/negotiate', async (req, res) => {
//   const { shipSymbol } = req.query
//   const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/negotiate/contract`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${process.env.TOKEN}`
//     },
//   })
//   const data = await response.json()
//   return res.json(data)
// })

app.get('/api/factions', async (req, res) => {
  const { page } = req.query
  console.log('Requested Page: ', page)
  const response = await fetch(`https://api.spacetraders.io/v2/factions?page=${page}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const data = await response.json()
  return res.json(data)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))