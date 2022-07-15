const express = require('express');
const fs = require('fs')
const { getDb } = require('../db')
const multer = require('../multer')
const { folderUsers, getPhoto } = require('../utils')

const router = express.Router();
const upload = multer('users')

// function getBindParams({ params = {}, queries = {} }) {
//   const ps = Object.create(null)
//   const list = { ...params, ...queries }
//   for(let key in list) {
//     ps['$' + key] = list[key]
//   }
//   return ps
// }

router.get('/', function(req, res){
  //res.send('a User' + req.params.id);
  //const $username = req.params.username
  const db = getDb()
  const $id = 1

  db.serialize(() => {
    // db.run("CREATE TABLE lorem (info TEXT)");

    // const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    // for (let i = 0; i < 10; i++) {
    //     stmt.run("Ipsum " + i);
    // }
    // stmt.finalize();

    // db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
    //     console.log(row.id + ": " + row.info);
    // });
    //const params = getBindParams({ params: req.params })
    const keys = [
      'name', 'phone', 'birthday', 'gender'
      , 'description', 'website', 'username'
      , 'email', 'photo', 'numPosts'
    ]
    
    const $keys = keys.join(', ')
    const params = { $id }

    const st = db.prepare(`SELECT ${$keys} FROM users WHERE id = $id`);
    st.get(params, function (err, row) {
      if (err) {
        console.error(err)
        return res.status(500).end()
      }

      if(!row) {
        return res.status(400).end()
      }

      const rw = { ...row, photo: getPhoto(folderUsers, row.photo) }
      return res.json(rw)
    })
    st.finalize();

  });

  db.close();

});

router.put('/photo', upload.single('photo'), function(req, res) {
  const db = getDb()
  const $id = 1
  const $updatedAt = new Date().toISOString()
  // if (isNaN(id) || id < 1) {
  //   return res.status(400).json({ error: 'id is invalid' })
  // }

  //const photo = (req.file?.path || '').replace('public/', '')
  const file = req.file
  if (file) {
    //console.log(file.filename)
    const $photo = file.filename

    db.serialize(() => {
      const stmt = db.prepare(
        `UPDATE users 
        SET photo = $photo, updatedAt = $updatedAt 
        WHERE id = $id`)
      
      const values = {
        $id, $photo, $updatedAt
      }
      stmt.run(values, function (err) {
        if (err) {
          console.error(err)
          fs.unlinkSync(req.file.path)
          return res.status(500).end()
        }
        
        const resp = { id: $id, photo: getPhoto(folderUsers, $photo) }
        return res.json(resp)
      })
      stmt.finalize()
    })
    db.close()
  } else {
    return res.status(400).json({ error: 'The file can not be processed, please verify the file and try again.' })
  }
})

router.put('/info', function(req, res){
  const db = getDb()

  const updatedAt = new Date().toISOString()
  const body = {
    ...req.body,
    updatedAt,
  }
  const $id = 3

  const keys = [
    'name', 'phone', 'birthday'
    , 'gender', 'description', 'website'
    , 'updatedAt'
  ]

  const pkeys = keys.map((value) => {
    return `${value} = $${value}`
  })
  const $pkeys = pkeys.join(', ')
  
  const values = { $id }
  for(let key of keys) {
    values['$' + key] = body[key]
  }

  // console.log($keys)
  // console.log($pvalues)
  // console.log(values)

  db.serialize(() => {
    const stmt = db.prepare(`UPDATE users SET ${$pkeys} WHERE id = $id`);
    stmt.run(values, function (err) {
      if (err) {
        console.error(err)
        return res.status(500).end()
      }

      return res.status(200).end()
    })

    stmt.finalize();
  });

  db.close()
});

router.put('/change-password', function(req, res){
  const db = getDb()

  const $id = 1
  const $updatedAt = new Date().toISOString()

  db.serialize(() => {
    const st = db.prepare(
      `SELECT id 
      FROM users 
      WHERE id = $id and password = $password`)
    
    let params = {
      $id,
      $password: req.body.oldPassword
    }

    st.get(params, function(err, row) {
      if (err) {
        console.error(err)
        return res.status(500).end()
      }

      if (!row) {
        return res.status(400).end()
      }

      params = {
        $id,
        $password: req.body.newPassword,
        $updatedAt
      }

      const stmt = db.prepare(
        `UPDATE users 
        SET password = $password, updatedAt = $updatedAt 
        WHERE id = $id`);
      
      stmt.run(params, function (err) {
        if (err) {
          console.error(err)
          return res.status(500).end()
        }

        return res.status(200).end()
      })
      stmt.finalize()
      db.close()
    })
    st.finalize()
  })
});

router.get('/username/:username', function(req, res){
  const db = getDb()
  const $username = req.params.username

  db.serialize(() => {
    const keys = [
      'name', 'description', 'website'
      , 'username', 'photo', 'numPosts'
    ]
    
    const $keys = keys.join(', ')
    const params = { $username }

    const st = db.prepare(
      `SELECT ${$keys} 
      FROM users 
      WHERE username = $username`
    );

    st.get(params, function (err, row) {
      if (err) {
        console.error(err)
        return res.status(500).end()
      }

      if(!row) {
        return res.status(400).end()
      }

      const rw = { ...row, photo: getPhoto(folderUsers, row.photo) }
      return res.json(rw)
    })
    st.finalize();

  });

  db.close();

});

//export this router to use in our index.js
module.exports = router;