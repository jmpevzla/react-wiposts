const jwt = require('jsonwebtoken')
const Axios = require('axios').default

const { createUrlUsers } = require('../utils')

const axios = Axios.create({
  headers: {
    'no-auth': 1
  }
})

let urlUsers = ''

async function getUser(email) {
  const resp = await axios.get(urlUsers , {
    params: {
      email: email || ''
    }
  })

  return resp.data.length === 0 ? null: resp.data[0]
}

module.exports = async (req, res) => {
  urlUsers = createUrlUsers(req)

  try {
    const { email } = req.query
    const user = await getUser(email)
    
    if (user || !email) {
      return res.json({ ok: false })
    }

    return res.json({ ok: true })
      
  } catch(err) {
    
    return res.status(500).json({error: err.message })
  }
}