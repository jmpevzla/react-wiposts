const express = require('express');
const fs = require('fs')
const { getDb } = require('../db')

const router = express.Router();

router.get('/me', function(req, res){
  const db = getDb()
  const $userId = 1

  db.serialize(async () => {
    const getConfig = () => new Promise((res, rej) => {
      const keys = ['theme']
      const $keys = keys.join(', ')
      
      const st = db.prepare(
        `SELECT ${$keys}
        FROM users_config
        WHERE userId = $userId`
      );

      const values = {
        $userId
      }

      st.get(values, function(err, row) {
        if (err) {
          return rej(err)
        }

        if (!row) {
          return rej({ st: 400, msg: 'User not Found' })
        }

        return res(row)
      })
      st.finalize();
    });
    
    try {
      const result = await getConfig()

      return res.json(result)
    } catch(err) {
      console.error(err)

      if (err.st && err.msg) {
        return res.status(err.st).json({ error: err.msg })
      }

      return res.status(500).end()
    } finally {
      db.close()
    }

  });

});

router.post('/me', function(req, res) {
  const db = getDb()
  const userId = 1
  const updatedAt = new Date().toISOString()
  const body = {
    ...req.body,
    updatedAt
  }

  db.serialize(async function(err) {
    
    const updateUser = () => new Promise((res, rej) => {
      const keys = ['theme', 'updatedAt']
      const pkeys = keys.map((value) => {
        return `${value} = $${value}`
      })
      const $pkeys = pkeys.join(', ')

      let values = {  }
      for(let key of keys) {
        values[`$${key}`] = body[key]
      }
      values = { ...values, $userId: userId }

      const st = db.prepare(
        `UPDATE users_config 
        SET ${$pkeys}
        WHERE userId = $userId`
      );
      
      st.run(values, function (err, row) {
        if (err) {
          return rej(err)
        }

        res()
      })
      st.finalize();
    });

    try {
      await updateUser()

      db.close();
      return res.status(200).end()

    } catch(err) {
      console.error(err)
      
      db.close();

      return res.status(500).end()
    }
  })
})

//export this router to use in our index.js
module.exports = router;