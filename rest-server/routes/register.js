const jwt = require("jsonwebtoken");
const Axios = require("axios").default;
const express = require('express')

require("dotenv").config();
const JWTSECRET = process.env.JWTSECRET;

const { createUrlUsers } = require("../utils");

const axios = Axios.create({
  headers: {
    "no-auth": 1,
  },
});

let urlUsers = "";

async function getUser(email) {
  const resp = await axios.get(urlUsers, {
    params: {
      email: email || "",
    },
  });

  return resp.data.length === 0 ? null : resp.data[0];
}

async function createUser({ name, email, password }) {
  const resp = await axios.post(urlUsers, {
    name,
    email,
    password,
  });

  return resp.data;
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @returns 
 */
module.exports = async (req, res) => {
  try {
    urlUsers = createUrlUsers(req);
    const { name, email, password } = req.body;
    const user = await getUser(email);

    if (user) {
      throw new Error(
        JSON.stringify({
          status: 400,
          message: "email or user already exists",
        })
      );
    }

    // create user
    const newUser = await createUser({ name, email, password });

    // return jwt
    const token = jwt.sign({ id: newUser.id }, JWTSECRET, {
      expiresIn: "7d",
    });

    return res.json({
      token,
      user: newUser,
      message: "Registration successful!",
    });
  } catch (err) {
    try {
      const json = JSON.parse(err.message);
      return res.status(json.status).json({ error: json.message });
    } catch (ex) {
      return res.status(500).json({ error: err.message });
    }
  }
};
