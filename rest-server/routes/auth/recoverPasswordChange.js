const Axios = require("axios").default;
const express = require('express')

const { createUrlUsers } = require("../../utils");

const axios = Axios.create({
  headers: {
    "no-auth": 1,
  },
});

let urlUsers = "";

async function getUser(tokenId, code) {
  const resp = await axios.get(urlUsers, {
    params: {
      tokenId,
      code
    },
  });

  return resp.data.length === 0 ? null : resp.data[0];
}

async function recoverChange(params, values) {
  const { tokenId, code } = params
  const user = await getUser(tokenId, code)
  if (user) {
    
    const data = {
      ...user,
      password: values.newPassword,
      code: null,
      tokenId: null,
      codeDateTime: null
    }

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
    const params = req.params
    const body = req.body;
    const user = await recoverChange(params, body);

    if (!user) {
      throw new Error(
        JSON.stringify({
          status: 400,
          message: "This User doesn't exist",
        })
      );
    }

    return res.json({
      message: "Recovery Change Password was successful!",
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
