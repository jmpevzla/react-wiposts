const jwt = require('jsonwebtoken')
const Axios = require('axios').default
const express = require('express')

require('dotenv').config()
const JWTSECRET = process.env.JWTSECRET

const { createUrlUsers } = require('../utils')

const axios = Axios.create({
    headers: {
        'no-auth': 1
    }
})

let urlUsers = ''

async function getUser(email, password) {
  const resp = await axios.get(urlUsers, {
    params: {
        email: email || '',
        password: password || ''
    }
  })

  return resp.data.length === 0 ? null: resp.data[0]
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @returns 
 */
module.exports = async (req, res) => {
  urlUsers = createUrlUsers(req)
  
  try {
    const { email, password } = req.body
    const user = await getUser(email, password)
    
    if (!user) {
        throw new Error(JSON.stringify({ status: 401, message: 'Unauthorizated' }))
    }

    // return jwt
    const token = jwt.sign({ id: user.id }, JWTSECRET, { expiresIn: '7d' })

    return res.json({
        token,
        user
    })

  } catch(err) {
    try {
        const json = JSON.parse(err.message)
        return res.status(json.status).json({ error: json.message })

    } catch (ex) {
        return res.status(500).json({error: err.message })
    }
  }
}