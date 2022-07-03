const Axios = require("axios").default;
const express = require('express')
const crypto = require('crypto');

const { createUrlUsers, makeCode } = require("../../utils");

const axios = Axios.create({
  headers: {
    "no-auth": 1,
  },
});

let urlUsers = "";

async function getUser(email) {
  const resp = await axios.get(urlUsers, {
    params: {
      email
    },
  });

  return resp.data.length === 0 ? null : resp.data[0];
}

async function recoverPassword(email) {
  const user = await getUser(email)
  if (user) {
    const code = makeCode(6)

    const data = {
      ...user,
      code,
      tokenId: crypto.randomUUID(),
      codeDateTime: new Date().toISOString()
    }

    console.log('User Code is: ' + code)

    const resp = await axios.put(`${urlUsers}/${user.id}`, data);
    return resp.data;
  }
  return null
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
    const { email } = req.body;
    const user = await recoverPassword(email);

    if (!user) {
      throw new Error(
        JSON.stringify({
          status: 400,
          message: "This User doesn't exist",
        })
      );
    }

    return res.json({
      tokenId: user.tokenId,
      message: "Recover Password was successful!",
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
