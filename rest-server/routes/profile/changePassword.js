const Axios = require("axios").default;
const express = require('express')

const { createUrlUsers } = require("../../utils");

const axios = Axios.create({
  headers: {
    "no-auth": 1,
  },
});

let urlUsers = "";

async function getUser(id) {
  const resp = await axios.get(urlUsers, {
    params: {
      id,
    },
  });

  return resp.data.length === 0 ? null : resp.data[0];
}

async function changePassword(id, values) {
  const user = await getUser(id)
  if (user) {
    if (user.password !== values.oldPassword) {
      throw new Error(
        JSON.stringify({
          status: 400,
          message: 'Old Password is not match',
        })
      )
    }

    const data = {
      ...user,
      password: values.newPassword
    }

    const resp = await axios.put(`${urlUsers}/${id}`, data);
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
    const id = 1; // change auth user!!
    const values = req.body;
    const user = await changePassword(id, values);
   
    if (!user) {
      throw new Error(
        JSON.stringify({
          status: 400,
          message: "This User doesn't exist",
        })
      );
    }

    return res.json({
      user: user,
      message: "Change Password was successful!",
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
