const express = require('express');
const fs = require('fs')
const { getDb, getDbTrans } = require('../db')
const multer = require('../multer')
const { folderPosts, getPhoto, folderUsers } = require('../utils')

const router = express.Router();
const upload = multer('posts');

router.get('/:id', function(req, res){
  const db = getDb()
  const $id = req.params.id

  db.serialize(() => {
    
    const keys = [
      'posts.id', 'posts.photo', 'photoDatetime'
      , 'posts.description', 'hashtags', 'status'
      , 'users.name as user_name, users.photo as user_photo'
      , 'users.username as user_username'
    ]
    
    const $keys = keys.join(', ')
    const params = { $id }

    const st = db.prepare(`
      SELECT ${$keys} 
      FROM posts 
      LEFT JOIN users ON (users.id = posts.userId) 
      WHERE posts.id = $id`);
    
    st.get(params, function (err, row) {
      if (err) {
        console.error(err)
      }

      if(!row) {
        return res.status(400).end()
      }

      const ksrow = Object.keys(row)
      let rel = {}
      for(let key of ksrow) {
        if (key.includes('_')) {
          const tp = key.split('_')
          const val = rel[tp[0]] 
          rel[tp[0]] = val ? val : {}
          rel[tp[0]][tp[1]] = row[key]
          continue
        }
        rel[key] = row[key]
      }
      rel.photo = getPhoto(folderPosts, rel.photo)
      rel.user.photo = getPhoto(folderUsers, rel.user.photo)

      return res.json(rel)
    })
    st.finalize();

  });

  db.close();

});

router.post('/', function(req, res){
  const db = getDb()
 
  const $userId = 1
  const $status = 'CREATED'
  const $createdAt = new Date().toISOString()
  const $updatedAt = $createdAt 

  const keys = ['userId', 'status', 'createdAt', 'updatedAt']
  const $keys = keys.join(', ')
  const pvalues = keys.map((value) => {
    return '$' + value
  })
  const $pvalues = pvalues.join(', ')
  const values = { $userId, $status, $createdAt, $updatedAt }

  // console.log($keys)
  // console.log($pvalues)
  // console.log(values)

  db.serialize(() => {
    const stmt = db.prepare(`INSERT INTO posts (${$keys}) VALUES (${$pvalues})`);
    stmt.run(values, function (err) {
      if (err) {
        console.error(err)
        return res.status(500).end()
      }

      return res.status(201).json({
        id: this.lastID
      })
    })

    stmt.finalize();
  });

  db.close()
});

router.put('/:id/photo', upload.single('photo'), function(req, res) {
  const db = getDb()
  const $id = req.params.id
  const $userId = 1
  const $status = 'CREATED'
  const $statusPhoto = 'PHOTO'

  const $updatedAt = new Date().toISOString()
 
  //const photo = (req.file?.path || '').replace('public/', '')
  const file = req.file
  if (file) {

    if (isNaN($id) || $id < 1) {
      fs.unlinkSync(file.path)
      return res.status(400).json({ error: 'id is invalid' })
    }

    //console.log(file.filename)
    const $photo = file.filename

    db.serialize(() => {
      const query = db.prepare(
        `SELECT status
        from posts
        where id = $id and userId = $userId and status = $status`
      )
      const queryParams = {
        $id, $userId, $status
      }
      query.get(queryParams, function(err, row) {
        if (err) {
          console.error(err)
          fs.unlinkSync(req.file.path)
          return res.status(500).end()
        }        

        if (!row) {
          fs.unlinkSync(req.file.path)
          return res.status(400).end()
        }

        const stmt = db.prepare(
          `UPDATE posts 
          SET photo = $photo, status = $statusPhoto, updatedAt = $updatedAt 
          WHERE id = $id`)
        
        const values = {
          $id, $photo, $statusPhoto, $updatedAt
        }

        stmt.run(values, function (err) {
          if (err) {
            console.error(err)
            fs.unlinkSync(req.file.path)
            return res.status(500).end()
          }

          const resp = { id: $id, photo: getPhoto(folderPosts, $photo) }
          return res.json(resp)
        })
        stmt.finalize()
        db.close()

      })
      query.finalize()
    })
    
  } else {
    return res.status(400).json({ error: 'The file can not be processed, please verify the file and try again.' })
  }
})

router.put('/:id/info', function(req, res){
  const db = getDbTrans()

  const $id = req.params.id
  
  const status = 'COMPLETED' 
  const updatedAt = new Date().toISOString()
  const body = {
    ...req.body,
    status,
    updatedAt,
  }

  const $userId = 1
  const $statusPhoto = 'PHOTO'

  const keys = [
    'photoDatetime', 'description', 'hashtags'
    , 'status', 'updatedAt'
  ]

  const pkeys = keys.map((value) => {
    return `${value} = $${value}`
  })
  const $pkeys = pkeys.join(', ')
  
  const values = { $id, $userId, $statusPhoto }
  for(let key of keys) {
    values['$' + key] = body[key]
  }

  // console.log($keys)
  // console.log($pvalues)
  // console.log(values)
  const _db = db.db

  db.beginTransaction(async function(err, trans) {
    
    const stmt = trans.prepare(
      `UPDATE posts SET ${$pkeys} 
      WHERE id = $id and userId = $userId 
      and status = $statusPhoto`);
    
    const stmtProm = () => new Promise((res, rej) => {
      stmt.run(values, function (err) {
        if (err) {
          return rej(err)
        }
        res()
      })
      stmt.finalize();
    })

    const query = trans.prepare( 
      `SELECT count(id) as numPosts
      FROM posts
      WHERE userId = $userId and status = $status`
    )
   
    const queryParams = {
      $userId,
      $status: 'COMPLETED'
    }

    const queryProm = () => new Promise((res, rej) => {
      query.get(queryParams, function(err, row) {
        if (err) {
          return rej(err)
        }
        res(row)
      })
      query.finalize()
    })

    const stmt2 = trans.prepare(
      `UPDATE users SET numPosts = $numPosts, updatedAt = $updatedAt 
      WHERE id = $userId`
    );
    
    const stmt2Prom = ($numPosts) => new Promise((res, rej) => {
      const stmt2Params = {
        $numPosts,
        $updatedAt: updatedAt,
        $userId
      }

      stmt2.run(stmt2Params, function (err) {
        if (err) {
          return rej(err)
        }
        res()
      })
      stmt2.finalize()
    })
    
    try {
      await stmtProm()
      const data = await queryProm()
      await stmt2Prom(data.numPosts) 

      trans.commit(function (err) {
        if (err) {
          return console.error(err)
        }
        _db.close();
        return res.status(200).end()
      });

    } catch(err) {
      console.error(err)
      trans.rollback(function (err) {
        if (err) console.error(err)
      });
      _db.close();
      return res.status(500).end()
    }
  })
});

router.put('/:id/edit', function(req, res){
  const db = getDbTrans()

  const $id = req.params.id
   
  const updatedAt = new Date().toISOString()
  const body = {
    ...req.body,
    updatedAt,
  }

  const $userId = 1
  const $status = 'COMPLETED'

  const keys = [
    'photoDatetime', 'description', 'hashtags'
    , 'updatedAt'
  ]

  const pkeys = keys.map((value) => {
    return `${value} = $${value}`
  })
  const $pkeys = pkeys.join(', ')
  
  const values = { $id, $userId, $status }
  for(let key of keys) {
    values['$' + key] = body[key]
  }

  // console.log($keys)
  // console.log($pvalues)
  // console.log(values)
  const _db = db.db

  db.beginTransaction(async function(err, trans) {
    
    const stmt = trans.prepare(
      `UPDATE posts SET ${$pkeys} 
      WHERE id = $id and userId = $userId and status = $status`);
    
    const stmtProm = () => new Promise((res, rej) => {
      stmt.run(values, function (err) {
        if (err) {
          return rej(err)
        }
        res()
      })
      stmt.finalize();
    })

    try {
      await stmtProm()

      trans.commit(function (err) {
        if (err) {
          return console.error(err)
        }
        _db.close();
        return res.status(200).end()
      });

    } catch(err) {
      console.error(err)
      trans.rollback(function (err) {
        if (err) console.error(err)
      });
      _db.close();
      return res.status(500).end()
    }
  })
});

router.delete('/:id', function(req, res){
  const db = getDbTrans()

  const $id = req.params.id
  
  const $userId = 1
  const $updatedAt = new Date().toISOString()
  const _db = db.db

  db.beginTransaction(async function(err, trans) {
    
    const stmt = trans.prepare(
      `DELETE FROM posts 
      WHERE id = $id and userId = $userId`);
    
    const values = {
      $id,
      $userId
    }

    const stmtProm = () => new Promise((res, rej) => {
      stmt.run(values, function (err) {
        if (err) {
          return rej(err)
        }
        res()
      })
      stmt.finalize();
    })

    const query = trans.prepare( 
      `SELECT count(id) as numPosts
      FROM posts
      WHERE userId = $userId and status = $status`
    )
   
    const queryParams = {
      $userId,
      $status: 'COMPLETED'
    }

    const queryProm = () => new Promise((res, rej) => {
      query.get(queryParams, function(err, row) {
        if (err) {
          return rej(err)
        }
        res(row)
      })
      query.finalize()
    })

    const stmt2 = trans.prepare(
      `UPDATE users SET numPosts = $numPosts, updatedAt = $updatedAt 
      WHERE id = $userId`
    );
    
    const stmt2Prom = ($numPosts) => new Promise((res, rej) => {
      const stmt2Params = {
        $numPosts,
        $updatedAt,
        $userId
      }

      stmt2.run(stmt2Params, function (err) {
        if (err) {
          return rej(err)
        }
        res()
      })
      stmt2.finalize()
    })
    
    try {
      await stmtProm()
      const data = await queryProm()
      await stmt2Prom(data.numPosts) 

      trans.commit(function (err) {
        if (err) {
          return console.error(err)
        }
        _db.close();
        return res.status(200).end()
      });

    } catch(err) {
      console.error(err)
      trans.rollback(function (err) {
        if (err) console.error(err)
      });
      _db.close();
      return res.status(500).end()
    }
  })
});

//export this router to use in our index.js
module.exports = router;