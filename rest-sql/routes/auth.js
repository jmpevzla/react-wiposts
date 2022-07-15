const express = require('express');
const { getDb } = require('../db')
const { folderUsers, getPhoto } = require('../utils')

const router = express.Router();

router.post('/login', function(req, res){
  const db = getDb()
  
  const $email = req.body.email
  const $password = req.body.password

  db.serialize(() => {
    
    const keys = [
      'id', 'name', 'username'
      , 'email', 'photo'
    ]
    
    const $keys = keys.join(', ')
    const params = { $email, $password }

    const st = db.prepare(
      `SELECT ${$keys} 
      FROM users 
      WHERE email = $email and password = $password`);
    
    st.get(params, function (err, row) {
      if (err) {
        console.error(err)
      }

      if(!row) {
        return res.status(401).end()
      }

      const rw = { ...row, photo: getPhoto(folderUsers, row.photo) }
      return res.json(rw)
    })
    st.finalize();

  });

  db.close()
});

router.post('/register', function(req, res){
  const db = getDb()

  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const body = {
    ...req.body,
    name: req.body.username,
    createdAt,
    updatedAt
  }
  
  const keys = ['name', 'username', 'email', 'password', 'createdAt', 'updatedAt']
  const $keys = keys.join(', ')
  const pvalues = keys.map((value) => {
    return '$' + value
  })
  const $pvalues = pvalues.join(', ')

  let values = { }
  for(let key of keys) {
    values['$' + key] = body[key]
  }

  // console.log($keys)
  // console.log($pvalues)
  // console.log(values)

  db.serialize(() => {
    const stmt = db.prepare(`INSERT INTO users (${$keys}) VALUES (${$pvalues})`);
    stmt.run(values, function (err) {
      if (err) {
        console.error(err)
        return res.status(500).end()
      }

      const keys = [
        'id', 'name', 'username'
        , 'email', 'photo'
      ]
      
      const $keys = keys.join(', ')
      const params = { $id: this.lastID }
  
      const st = db.prepare(
        `SELECT ${$keys} 
        FROM users 
        WHERE id = $id`);
      
      st.get(params, function (err, row) {
        if (err) {
          console.error(err)
        }
  
        const rw = { ...row, photo: getPhoto(folderUsers, row.photo) }
        return res.status(201).json(rw)
      })
      st.finalize();
      db.close()

    })

    stmt.finalize();
  });

});

//export this router to use in our index.js
module.exports = router;