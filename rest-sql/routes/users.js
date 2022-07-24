const express = require('express');
const fs = require('fs')
const { getDb } = require('../db')
const multer = require('../multer')
const { getMe, updatePhoto, updateInfo
  , checkWithPassword, updatePassword, getByUsername
  , getAuth } = require('../models/users')
const { makeTokenId } = require('../utils')

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

router.get('/auth', function(req, res){
  const db = getDb()
  const $id = 1

  db.serialize(async () => {
    try {
      const result = await getAuth({ $id }, db)
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

router.post('/me/change-email', function(req, res) {
  const db = getDb()
  const $userId = 1
  const $updatedAt = new Date().toISOString()
  const $temporalEmail = req.body.temporalEmail
  
  if (!$temporalEmail) {
    return res.status(400).end()
  }

  db.serialize(async function(err) {
    
    const updateUser = () => new Promise((res, rej) => {
      const $tokenEmailId = makeTokenId()

      const st = db.prepare(
        `UPDATE users 
        SET tokenEmailId = $tokenEmailId, 
        temporalEmail = $temporalEmail,
        statusEmail = $statusEmail,
        updatedAt = $updatedAt 
        WHERE id = $userId`
      );

      const values = {
        $tokenEmailId,
        $temporalEmail,
        $statusEmail: 'UNVERIFIED',
        $updatedAt,
        $userId
      }
      
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