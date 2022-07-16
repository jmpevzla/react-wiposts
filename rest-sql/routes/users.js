const express = require('express');
const fs = require('fs')
const { getDb } = require('../db')
const multer = require('../multer')
const { folderUsers, getPhoto } = require('../utils')
const { getMe, updatePhoto, updateInfo, checkWithPassword, updatePassword, getByUsername } = require('../models/users')

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

router.get('/me', function(req, res){
  const db = getDb()
  const $id = 1

  db.serialize(async () => {
    try {
      const result = await getMe({ $id }, db)
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

router.put('/me/photo', upload.single('photo'), function(req, res) {
  const db = getDb()
  const $id = 1
  
  const file = req.file
  if (file) {
    //console.log(file.filename)
    const $photo = file.filename

    db.serialize(async () => {
      try {
        const result = await updatePhoto({ $id, $photo }, db)
        return res.json(result)
      } catch(err) {
        console.error(err)
        fs.unlinkSync(req.file.path)

        if (err.st && err.msg) {
          return res.status(err.st).json({ error: err.msg })
        }
  
        return res.status(500).end()
      } finally {
        db.close()
      }

    })
  } else {
    return res
      .status(400)
      .json({ error: 'The file can not be processed, please verify the file and try again.' })
  }
})

router.put('/me/info', function(req, res){
  const db = getDb()

  const $id = 1

  db.serialize(async () => {
   
    try {
      await updateInfo({ $id, data: req.body }, db)
      return res.end()
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

router.put('/me/change-password', function(req, res){
  const db = getDb()

  const $id = 1

  db.serialize(async () => {

    try {
      await checkWithPassword({ $id, $password: req.body.oldPassword }, db)
      await updatePassword({ $id, $password: req.body.newPassword }, db)

      return res.end()
    } catch(err) {
      console.error(err)
        
      if (err.st && err.msg) {
        return res.status(err.st).json({ error: err.msg })
      }

      return res.status(500).end()
    } finally {
      db.close()
    }

  })
  
});

router.get('/user/:username', function(req, res){
  const db = getDb()
  const $username = req.params.username

  db.serialize(async () => {
    try {
      const result = await getByUsername({ $username }, db)
     
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

//export this router to use in our index.js
module.exports = router;