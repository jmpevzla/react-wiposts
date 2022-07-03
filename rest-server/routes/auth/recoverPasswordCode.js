const Axios = require("axios").default;
const express = require('express')

const { createUrlUsers } = require("../../utils");

const axios = Axios.create({
  headers: {
    "no-auth": 1,
  },
});

let urlUsers = "";

async function getUser(tokenId) {
  const resp = await axios.get(urlUsers, {
    params: {
      tokenId
    },
  });

  return resp.data.length === 0 ? null : resp.data[0];
}

async function checkCode(tokenId, code) {
  const user = await getUser(tokenId)
  if (user) { 
    if (user.code.toUpperCase() !== code.toUpperCase()) {
      throw new Error(
        JSON.stringify({
          status: 400,
          message: 'Code is invalid!',
        })
      )
    } 

    return true
    
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
    const { tokenId, code } = req.params;
    const resp = await checkCode(tokenId, code);

    if (resp === null) {
      throw new Error(
        JSON.stringify({
          status: 400,
          message: "This User doesn't exist",
        })
      );
    }

    return res.json({
      message: "Recover Password code was successful!",
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
