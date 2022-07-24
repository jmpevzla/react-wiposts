const express = require('express');
const { getDb, getDbTrans } = require('../db')
const { folderUsers, getPhoto
, makeCode, makeTokenId } = require('../utils')

const router = express.Router();

router.post('/login', function(req, res){
  const db = getDb()
  
  const $email = req.body.email
  const $password = req.body.password

  db.serialize(() => {
    
    const keys = [
      'users.id', 'name', 'username'
      , 'email', 'photo', 'statusEmail',
      'users_config.theme as config_theme'
    ]
    
    const $keys = keys.join(', ')
    const params = { $email, $password }

    const st = db.prepare(
      `SELECT ${$keys} 
      FROM users
      INNER JOIN users_config on (userId = users.id) 
      WHERE email = $email and password = $password`);
    
    st.get(params, function (err, row) {
      if (err) {
        console.error(err)
      }

      if(!row) {
        return res.status(401).end()
      }

      const ksrow = Object.keys(row)
      const rel = {}
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

      const rw = { ...rel, photo: getPhoto(folderUsers, row.photo) }
      return res.json(rw)
    })
    st.finalize();

  });

  db.close()
});

router.post('/register', function(req, res){
  const db = getDbTrans()
 
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const body = {
    ...req.body,
    name: req.body.username,
    temporalEmail: req.body.email,
    createdAt,
    updatedAt
  }

  const _db = db.db

  db.beginTransaction(async function(err, trans) {
    
    const createUser = () => new Promise((res, rej) => {
      const keys = ['name', 'username', 'email', 
        'password', 'temporalEmail', 'createdAt', 'updatedAt']
      const $keys = keys.join(', ')
      const pvalues = keys.map((value) => {
        return '$' + value
      })
      const $pvalues = pvalues.join(', ')

      let values = { }
      for(let key of keys) {
        values['$' + key] = body[key]
      }

      const stmt = trans.prepare(`INSERT INTO users (${$keys}) VALUES (${$pvalues})`);
      stmt.run(values, function (err) {
        if (err) {
          return rej(err)
        }

        return res(this.lastID)
      });
      stmt.finalize();
    })

    const createUserConfig = (userId) => new Promise((res, rej) => {
      const keys = ['userId', 'theme', 'createdAt', 'updatedAt']
      const $keys = keys.join(', ')
      const pvalues = keys.map((value) => {
        return '$' + value
      })
      const $pvalues = pvalues.join(', ')

      const data = { userId, theme: '', createdAt, updatedAt }
      let values = { }
      for(let key of keys) {
        values['$' + key] = data[key]
      }

      const stmt = trans.prepare(`INSERT INTO users_config (${$keys}) VALUES (${$pvalues})`);
      stmt.run(values, function (err) {
        if (err) {
          return rej(err)
        }

        return res()
      });
      stmt.finalize();
    })

    const getUser = ($id) => new Promise((res, rej) => {
      const keys = [
        'id', 'name', 'username'
        , 'email', 'photo', 'statusEmail',
        '"" as uc_theme'
      ]
              
      const $keys = keys.join(', ')
      const params = { $id }

      const st = trans.prepare(
        `SELECT ${$keys} 
        FROM users 
        WHERE id = $id`);
      
      st.get(params, function (err, row) {
        if (err) {
          return rej(err)
        }
  
        const ksrow = Object.keys(row)
        const rel = {}
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

        const rw = { ...rel, photo: getPhoto(folderUsers, row.photo) }

        return res(rw)
      })
      st.finalize();
    }) 

    try {
      const userId = await createUser()
      await createUserConfig(userId)
      const user = await getUser(userId)
      
      trans.commit(function (err) {
        if (err) {
          return console.error(err)
        }
        _db.close();
        return res.status(200).json(user)
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

router.post('/recover/send-code', function(req, res) {
  const db = getDbTrans()

  const $updatedAt = new Date().toISOString()

  const _db = db.db

  db.beginTransaction(async function(err, trans) {
    
    const userQuery = () => new Promise((res, rej) => {
      const st = trans.prepare(
        `SELECT id
        FROM users
        WHERE email = $email`
      );

      const values = {
        $email: req.body.email
      }
      
      st.get(values, function (err, row) {
        if (err) {
          return rej(err)
        }

        if (!row) {
          return rej({ status: 'NOTFOUND' })
        }

        res(row.id)
      })
      st.finalize();
    });
    
    const userUpdate = ($id) => new Promise((res, rej) => {
      const keys = ['code', 'tokenId', 'codeDateTime', 'updatedAt']
      const pkeys = keys.map((value) => {
        return `${value} = $${value}`
      })
      const $pkeys = pkeys.join(', ')
      
      const stmt = trans.prepare(
        `UPDATE users 
        SET ${$pkeys}
        WHERE id = $id`);

      const $code = makeCode(6)
      const $tokenId = makeTokenId()

      const values = {
        $id,
        $code,
        $tokenId,
        $codeDateTime: $updatedAt,
        $updatedAt
      }

      stmt.run(values, function (err) {
        if (err) {
          return rej(err)
        }
        res($tokenId)
      })
      stmt.finalize();
    })

    try {
      const id = await userQuery()
      const tokenId = await userUpdate(id)

      trans.commit(function (err) {
        if (err) {
          return console.error(err)
        }
        _db.close();
        return res.status(200).json({ tokenId })
      });

    } catch(err) {
      console.error(err)
      trans.rollback(function (errTrans) {
        if (errTrans) console.error(errTrans)

        _db.close();

        if (err && err.status == 'NOTFOUND') {
          return res.status(400).json({ error: 'user not found'})
        }

        return res.status(500).end()
      });
    }
  })
});

router.get('/recover/check-token/:token', function(req, res) {
  const db = getDb()

  const $tokenId = req.params.token

  db.serialize(async function(err) {
    
    const userQuery = () => new Promise((res, rej) => {
      const st = db.prepare(
        `SELECT id
        FROM users
        WHERE tokenId = $tokenId`
      );

      const values = {
        $tokenId
      }
      
      st.get(values, function (err, row) {
        if (err) {
          return rej(err)
        }

        if (!row) {
          return rej({ status: 'NOTFOUND' })
        }

        res()
      })
      st.finalize();
    });

    try {
      await userQuery()

      db.close();
      return res.status(200).end()

    } catch(err) {
      console.error(err)
      
      db.close();

      if (err && err.status == 'NOTFOUND') {
        return res.status(400).json({ error: 'user not found'})
      }

      return res.status(500).end()
    }
  })
});

router.post('/recover/resend-code/:token', function(req, res) {
  const db = getDbTrans()

  const $tokenId = req.params.token
  const $updatedAt = new Date().toISOString()

  const _db = db.db

  db.beginTransaction(async function(err, trans) {
    
    const userQuery = () => new Promise((res, rej) => {
      const st = trans.prepare(
        `SELECT id
        FROM users
        WHERE tokenId = $tokenId`
      );

      const values = {
        $tokenId
      }
      
      st.get(values, function (err, row) {
        if (err) {
          return rej(err)
        }

        if (!row) {
          return rej({ status: 'NOTFOUND' })
        }

        res(row.id)
      })
      st.finalize();
    });
    
    const userUpdate = ($id) => new Promise((res, rej) => {
      const keys = ['code', 'codeDateTime', 'updatedAt']
      const pkeys = keys.map((value) => {
        return `${value} = $${value}`
      })
      const $pkeys = pkeys.join(', ')
      
      const stmt = trans.prepare(
        `UPDATE users 
        SET ${$pkeys}
        WHERE id = $id`);

      const $code = makeCode(6)

      const values = {
        $id,
        $code,
        $codeDateTime: $updatedAt,
        $updatedAt
      }

      stmt.run(values, function (err) {
        if (err) {
          return rej(err)
        }
        res()
      })
      stmt.finalize();
    })

    try {
      const id = await userQuery()
      await userUpdate(id)

      trans.commit(function (err) {
        if (err) {
          return console.error(err)
        }
        _db.close();
        return res.status(200).end()
      });

    } catch(err) {
      console.error(err)
      trans.rollback(function (errTrans) {
        if (errTrans) console.error(errTrans)

        _db.close();

        if (err && err.status == 'NOTFOUND') {
          return res.status(400).json({ error: 'user not found'})
        }

        return res.status(500).end()
      });
    }
  })
});

router.get('/recover/check-code/token/:token/code/:code', function(req, res) {
  const db = getDb()

  const $tokenId = req.params.token
  const $code = req.params.code

  db.serialize(async function(err) {
    
    const userQuery = () => new Promise((res, rej) => {
      const st = db.prepare(
        `SELECT id
        FROM users
        WHERE tokenId = $tokenId and code = $code`
      );

      const values = {
        $tokenId,
        $code
      }
      
      st.get(values, function (err, row) {
        if (err) {
          return rej(err)
        }

        if (!row) {
          return rej({ status: 'NOTFOUND' })
        }

        res()
      })
      st.finalize();
    });

    try {
      await userQuery()

      db.close();
      return res.status(200).end()

    } catch(err) {
      console.error(err)
      
      db.close();

      if (err && err.status == 'NOTFOUND') {
        return res.status(400).json({ error: 'user not found'})
      }

      return res.status(500).end()
    }
  })
});

router.post('/recover/change/token/:token/code/:code', function(req, res) {
  const db = getDbTrans()

  const $tokenId = req.params.token
  const $code = req.params.code
  const $updatedAt = new Date().toISOString()

  const _db = db.db

  db.beginTransaction(async function(err, trans) {
    
    const userQuery = () => new Promise((res, rej) => {
      const st = trans.prepare(
        `SELECT id
        FROM users
        WHERE tokenId = $tokenId and code = $code`
      );

      const values = {
        $tokenId,
        $code
      }
      
      st.get(values, function (err, row) {
        if (err) {
          return rej(err)
        }

        if (!row) {
          return rej({ status: 'NOTFOUND' })
        }

        res(row.id)
      })
      st.finalize();
    });
    
    const userUpdate = ($id) => new Promise((res, rej) => {
      const keys = ['password', 'tokenId', 'code', 'codeDateTime', 'updatedAt']
      const pkeys = keys.map((value) => {
        return `${value} = $${value}`
      })
      const $pkeys = pkeys.join(', ')
      
      const stmt = trans.prepare(
        `UPDATE users 
        SET ${$pkeys}
        WHERE id = $id`);

      const values = {
        $id,
        $password: req.body.newPassword,
        $tokenId: null,
        $code: null,
        $codeDateTime: null,
        $updatedAt
      }

      stmt.run(values, function (err) {
        if (err) {
          return rej(err)
        }
        res()
      })
      stmt.finalize();
    })

    try {
      const id = await userQuery()
      await userUpdate(id)

      trans.commit(function (err) {
        if (err) {
          return console.error(err)
        }
        _db.close();
        return res.status(200).end()
      });

    } catch(err) {
      console.error(err)
      trans.rollback(function (errTrans) {
        if (errTrans) console.error(errTrans)

        _db.close();

        if (err && err.status == 'NOTFOUND') {
          return res.status(400).json({ error: 'user not found'})
        }

        return res.status(500).end()
      });
    }
  })
});

router.post('/verify-email/:token', function(req, res) {
  const db = getDb()
  const $updatedAt = new Date().toISOString()
  const $tokenEmailId = req.params.token
  
  db.serialize(async function(err) {
    
    const getUser = () => new Promise((res, rej) => {
      const st = db.prepare(
        `SELECT id
        FROM users
        WHERE tokenEmailId = $tokenEmailId`
      );
      const values = {
        $tokenEmailId
      }

      st.get(values, function(err, row) {
        if (err) {
          return rej(err)
        }

        if (!row) {
          return rej({ status: 'NOTFOUND' })
        }

        return res(row.id)
      })
      st.finalize();
    });

    const updateUser = ($id) => new Promise((res, rej) => {
      const st = db.prepare(
        `UPDATE users 
        SET email = temporalEmail, 
        tokenEmailId = $tokenEmailId, 
        temporalEmail = $temporalEmail,
        statusEmail = $statusEmail,
        updatedAt = $updatedAt 
        WHERE id = $id`
      );

      const values = {
        $tokenEmailId: null,
        $temporalEmail: null,
        $statusEmail: 'VERIFIED',
        $updatedAt,
        $id
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
      const id = await getUser()
      await updateUser(id)

      db.close();
      return res.status(200).end()

    } catch(err) {
      console.error(err)
      
      db.close();

      if (err && err.status == 'NOTFOUND') {
        return res.status(400).json({ error: 'user not found'})
      }

      return res.status(500).end()
    }
  })
})

//export this router to use in our index.js
module.exports = router;