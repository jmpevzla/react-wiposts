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

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @returns 
 */
module.exports = async (req, res) => {
  try {
    urlUsers = createUrlUsers(req);
    const { tokenId } = req.params;
    const user = await getUser(tokenId);

    if (!user) {
      throw new Error(
        JSON.stringify({
          status: 400,
          message: "This User doesn't exist",
        })
      );
    }

    return res.json({
      message: "Check Token was successful!",
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
