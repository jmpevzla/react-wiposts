const express = require('express');
const fs = require('fs')
const { getDb, getDbTrans } = require('../db')
const multer = require('../multer')
const { folderPosts, getPhoto
  , folderUsers, isIsoDate } = require('../utils')

const router = express.Router();
const upload = multer('posts');

router.get('/show/:id', function(req, res){
  const db = getDb()
  const $id = req.params.id

  db.serialize(() => {
    
    const keys = [
      'posts.id', 'posts.photo', 'photoDatetime'
      , 'posts.description', 'hashtags', 'status', 'posts.createdAt'
      , 'users.id as user_id'
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


router.get('/photo/:id', function(req, res){
  const db = getDb()
  const $id = req.params.id
  const $status = 'COMPLETED'

  db.serialize(() => {
    
    const keys = [
      'photo', 
    ]
    
    const $keys = keys.join(', ')
    const params = { $id, $status }

    const st = db.prepare(`
      SELECT ${$keys} 
      FROM posts  
      WHERE posts.id = $id and
      status = $status`);
    
    st.get(params, function (err, row) {
      if (err) {
        console.error(err)
      }

      if(!row) {
        return res.status(400).end()
      }

      row.photo = getPhoto(folderPosts, row.photo)

      return res.json(row)
    })
    st.finalize();

  });

  db.close();

});

router.get('/check-draft', function(req, res) {
  const db = getDb()

  const $userId = 1
  const $status = 'COMPLETED'

  db.serialize(() => {
    const keys = [
      'id', 'photo', 'status'
    ]

    const st = db.prepare(`
      SELECT ${keys} 
      FROM posts 
      WHERE userId = $userId and 
      status <> $status`);
    
    const params = { $userId, $status }  
    st.get(params, function (err, row) {
      if (err) {
        console.error(err)
      }

      if (!row) {
        return res.json(null)
      }

      if (row.photo) {
        row.photo = getPhoto(folderPosts, row.photo)
      }

      return res.json(row)
    })
    st.finalize();

  });

  db.close();

})

router.post('/create', function(req, res){
  const db = getDb()
 
  const $userId = 1

  const check = () => new Promise((res, rej) => {
    const $status = 'COMPLETED'
    const limitDrafts = 0
    
    const keys = [
      'count(id) as cnt'
    ]

    const st = db.prepare(`
      SELECT ${keys} 
      FROM posts 
      WHERE userId = $userId and 
      status <> $status`);
    
    const params = { $userId, $status }  
    st.get(params, function (err, row) {
      if (err) {
        console.error(err)
      }

      console.log('count: ', row.cnt)
      if (row.cnt > limitDrafts) {
        return rej({ st: 400 })
      }

      return res()
    })
    st.finalize();
  })

  const insert = () => new Promise((res, rej) => {
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

    const stmt = db.prepare(`INSERT INTO posts (${$keys}) VALUES (${$pvalues})`);
    stmt.run(values, function (err) {
      if (err) {
        console.error(err)
        return rej()
      }

      return res({ id: this.lastID })
    })

    stmt.finalize();
  })

  db.serialize(async () => {
    try {
      await check()
      const result = await insert()

      return res.status(201).json(result)
    } catch(err) {
      console.error(err)
      
      if(err.st) {
        return res.status(err.st).end()
      }
      
      return res.status(500).end()
    } finally {
      db.close()
    }
  });
});

router.put('/create/:id/photo', upload.single('photo'), function(req, res) {
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

router.put('/create/:id/info', function(req, res){
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

router.get('/data/:id', function(req, res){
  const db = getDb()
  const $id = req.params.id
  const $userId = 1
  const $status = 'COMPLETED'

  db.serialize(() => {
    
    const keys = [
      'id', 'photo', 'photoDatetime'
      , 'description', 'hashtags', 'status'
    ]
    
    const $keys = keys.join(', ')
    const params = { $id, $userId, $status }

    const st = db.prepare(`
      SELECT ${$keys} 
      FROM posts 
      WHERE id = $id and 
      userId = $userId and
      status = $status
    `);
    
    st.get(params, function (err, row) {
      if (err) {
        console.error(err)
      }

      if(!row) {
        return res.status(400).end()
      }

      row.photo = getPhoto(folderPosts, row.photo)

      return res.json(row)
    })
    st.finalize();

  });

  db.close();

});

router.put('/edit/:id', function(req, res){
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

router.delete('/remove/:id', function(req, res){
  const db = getDbTrans()

  const $id = req.params.id
  
  const $userId = 1
  const $updatedAt = new Date().toISOString()
  const _db = db.db

  db.beginTransaction(async function(err, trans) {
    
    const queryPhoto = trans.prepare( 
      `SELECT photo
      FROM posts
      WHERE id = $id and userId = $userId`
    )
   
    const queryPhotoParams = {
      $id,
      $userId,
    }

    const queryPhotoProm = () => new Promise((res, rej) => {
      queryPhoto.get(queryPhotoParams, function(err, row) {
        if (err) {
          return rej(err)
        }
        res(row ? row.photo : null)
      })
      queryPhoto.finalize()
    })

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
      const photo = await queryPhotoProm()
      await stmtProm()
      const data = await queryProm()
      await stmt2Prom(data.numPosts) 

      trans.commit(function (err) {
        if (err) {
          return console.error(err)
        }

        if(photo) {
          fs.unlinkSync(process.cwd() + '/' + getPhoto(folderPosts, photo))
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

router.get('/search', function(req, res) {
  const db = getDb()
  const query = req.query

  // query default
  let $q = query.q || ''
  $q = '%' + $q + '%'
  
  // paginate
  const page = query._page || 1
  const $countPag = 1 //20
  const $offset = (page-1) * $countPag

  // sort
  let sort = query._sort || ''
  let order = query._order || ''

  sort = sort.split(',')
  sort = sort.filter((value) => value !== '')
  sort = sort.length > 0 ? sort : ['id']

  order = order.split(',')
  order = order.filter((value) => value !== '')
  order = order.length > 0 ? order : ['desc']  

  const sortKeys = ['id', 'description', 'hashtags',
    'photoDatetime', 'createdAt', 'updatedAt', 
    'user_name', 'user_username']
  const orderKeys = ['asc', 'desc']

  const _sort = []
  const _order = []
  if (sort.length === order.length) {
    sort.forEach((value, index) => {
      const key = sortKeys.find((val) => val === value)
      if (key) {
        return _sort.push(key)
      }
      order.splice(index)
    })

    order.forEach((value) => {
      const key = orderKeys.find((val) => val === value)
      if (key) {
        return _order.push(key)
      }
      _order.push('asc')
    })
  } 
  
  if (_sort.length === 0) {
    _sort.push('id')
    _order.push('desc')
  }

  let $orderBy = _sort.map((value, index) => {
    let val = value.includes('user_') 
      ? 'users.' + value.replace('user_', '') 
      : 'posts.' + value
    
    if (/photoDatetime|createdAt|updatedAt/.test(val)) {
      val = `datetime(${val})`
    }
    return val + ' ' + _order[index]
  }).join(', ')

  // filters
  let ft = parseInt(query._ft || 0)
  ft = isNaN(ft) ? 0 : ft
  const dateMin = String(0)
  const dateMax = String(5000000)
  const $photoDtFrom = isIsoDate(query.photoDtFrom) ? query.photoDtFrom : dateMin
  const $photoDtUntil = isIsoDate(query.photoDtUntil) ? query.photoDtUntil : dateMax
  const $createdAtFrom = isIsoDate(query.createdAtFrom) ? query.createdAtFrom : dateMin
  const $createdAtUntil = isIsoDate(query.createdAtUntil) ? query.createdAtUntil : dateMax
  const $updatedAtFrom = isIsoDate(query.updatedAtFrom) ? query.updatedAtFrom : dateMin
  const $updatedAtUntil = isIsoDate(query.updatedAtUntil) ? query.updatedAtUntil : dateMax
  const $description = '%' + (query.description || '') + '%'
  const $hashtags = '%' + (query.hashtags || '') + '%'
  const $name = '%' + (query.user_name || '') + '%'
  const $username = '%' + (query.user_username || '') + '%'

  db.serialize(async () => {
    const countDefault = () => new Promise((res, rej) => {
      const st = db.prepare(`
        SELECT count(posts.id) as count
        FROM posts
        LEFT JOIN users ON (users.id = posts.userId) 
        WHERE 1 = 1 AND 
        (posts.description LIKE $q OR
        posts.hashtags LIKE $q OR
        users.name LIKE $q OR
        users.username LIKE $q)
      `)

      const params = { $q }
      st.get(params, function(err, row) {
        if (err) {
          rej(err)
        }

        res(row.count)
      })
      st.finalize()
    })

    const keys = [
      'posts.id', 'posts.photo', 'photoDatetime'
      , 'posts.description', 'hashtags', 'status'
      , 'posts.createdAt', 'posts.updatedAt'
      , 'users.id as user_id'
      , 'users.name as user_name, users.photo as user_photo'
      , 'users.username as user_username'
    ]
    const $keys = keys.join(', ')
    
    const queryDefault = () => new Promise((res, rej) => {
      
      const params = { $q, $countPag, $offset }
  
      const st = db.prepare(`
        SELECT ${$keys} 
        FROM posts 
        LEFT JOIN users ON (users.id = posts.userId) 
        WHERE 1 = 1 AND 
        (posts.description LIKE $q OR
        posts.hashtags LIKE $q OR
        users.name LIKE $q OR
        users.username LIKE $q)
        ORDER BY ${$orderBy}
        LIMIT $countPag
        OFFSET $offset`);
      
      st.all(params, function (err, rows) {
        if (err) {
          rej(err)
        }
      
        const result = rows.map(row => {
  
          const ksrow = Object.keys(row)
          const rel = {}
          for(const key of ksrow) {
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
          count = rel.count
          delete rel.count
          return rel
        })
       
        return res(result)
      })
      st.finalize();
    }) 

    const countFilters = () => new Promise((res, rej) => {
      const st = db.prepare(`
        SELECT count(posts.id) as count
        FROM posts
        LEFT JOIN users ON (users.id = posts.userId) 
        WHERE 1 = 1 AND 
        datetime(posts.photoDatetime) >= datetime($photoDtFrom) AND
        datetime(posts.photoDatetime) <= datetime($photoDtUntil) AND
        datetime(posts.createdAt) >= datetime($createdAtFrom) AND
        datetime(posts.createdAt) <= datetime($createdAtUntil) AND
        datetime(posts.updatedAt) >= datetime($updatedAtFrom) AND
        datetime(posts.updatedAt) <= datetime($updatedAtUntil) AND
        posts.description LIKE $description AND
        posts.hashtags LIKE $hashtags AND
        users.name LIKE $name AND
        users.username LIKE $username
      `)

      const params = { 
        $photoDtFrom, 
        $photoDtUntil,
        $createdAtFrom,
        $createdAtUntil,
        $updatedAtFrom,
        $updatedAtUntil,
        $description,
        $hashtags,
        $name,
        $username 
      }
      st.get(params, function(err, row) {
        if (err) {
          rej(err)
        }

        res(row.count)
      })
      st.finalize()
    })

    const queryFilters = () => new Promise((res, rej) => {
      
      const params = { 
        $photoDtFrom, 
        $photoDtUntil,
        $createdAtFrom,
        $createdAtUntil,
        $updatedAtFrom,
        $updatedAtUntil,
        $description,
        $hashtags,
        $name,
        $username,
        $countPag,
        $offset 
      }
  
      const st = db.prepare(`
        SELECT ${$keys} 
        FROM posts 
        LEFT JOIN users ON (users.id = posts.userId) 
        WHERE 1 = 1 AND 
        datetime(posts.photoDatetime) >= datetime($photoDtFrom) AND
        datetime(posts.photoDatetime) <= datetime($photoDtUntil) AND
        datetime(posts.createdAt) >= datetime($createdAtFrom) AND
        datetime(posts.createdAt) <= datetime($createdAtUntil) AND
        datetime(posts.updatedAt) >= datetime($updatedAtFrom) AND
        datetime(posts.updatedAt) <= datetime($updatedAtUntil) AND
        posts.description LIKE $description AND
        posts.hashtags LIKE $hashtags AND
        users.name LIKE $name AND
        users.username LIKE $username
        ORDER BY ${$orderBy}
        LIMIT $countPag
        OFFSET $offset`);
      
      st.all(params, function (err, rows) {
        if (err) {
          rej(err)
        }
      
        const result = rows.map(row => {
  
          const ksrow = Object.keys(row)
          const rel = {}
          for(const key of ksrow) {
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
          count = rel.count
          delete rel.count
          return rel
        })
       
        return res(result)
      })
      st.finalize();
    }) 

    try {
      if (ft) {
        const count = await countFilters()
        const values = await queryFilters()
        return res.set({'X-Total-Count': count}).json(values)
      }
      
      const count = await countDefault()
      const values = await queryDefault()
      return res.set({'X-Total-Count': count}).json(values)

    } catch(err) {
      console.error(err)
      return res.status(500).end()
    } finally {
      db.close()
    }

  });

});

//export this router to use in our index.js
module.exports = router;