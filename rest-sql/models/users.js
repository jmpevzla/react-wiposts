const { getPhoto, folderUsers } = require('../utils')

function getMe({ $id }, db) {
  const keys = [
    'name', 'phone', 'birthday', 'gender'
    , 'description', 'website', 'username'
    , 'email', 'photo', 'numPosts'
  ]
  
  const $keys = keys.join(', ')
  const params = { $id }

  return new Promise((res, rej) => {
    const st = db.prepare(`SELECT ${$keys} FROM users WHERE id = $id`);
    st.get(params, function (err, row) {
      if (err) {
        return rej()
      }

      if(!row) {
        return rej({ st:400, msg: 'user not found' })
      }

      const rw = { ...row, photo: getPhoto(folderUsers, row.photo) }
      return res(rw)
    })
    st.finalize();
  })
}

function updatePhoto({ $id, $photo }, db) {
  const $updatedAt = new Date().toISOString()

  return new Promise((res, rej) => {
    const stmt = db.prepare(
      `UPDATE users 
      SET photo = $photo, updatedAt = $updatedAt 
      WHERE id = $id`)
    
    const values = {
      $id, $photo, $updatedAt
    }
    stmt.run(values, function (err) {
      if (err) {
        return rej()
      }
      
      const resp = { id: $id, photo: getPhoto(folderUsers, $photo) }
      return res(resp)
    })
    stmt.finalize()
  })
}

function updateInfo({ $id, data }, db) {
  const $updatedAt = new Date().toISOString()

  const keys = [
    'name', 'phone', 'birthday'
    , 'gender', 'description', 'website'
    , 'updatedAt'
  ]

  const pkeys = keys.map((value) => {
    return `${value} = $${value}`
  })
  const $pkeys = pkeys.join(', ')
  
  let values = { }
  for(let key of keys) {
    values['$' + key] = data[key]
  }
  values = { ...values, $id, $updatedAt }

  return new Promise((res, rej) => {

    const stmt = db.prepare(`UPDATE users SET ${$pkeys} WHERE id = $id`);
    stmt.run(values, function (err) {
      if (err) {
        return rej()
      }

      return res()
    })

    stmt.finalize();

  })
}

function checkWithPassword({ $id, $password }, db) {
  const keys = [
    'id'
  ]
  
  const $keys = keys.join(', ')
  const params = { $id, $password }

  return new Promise((res, rej) => {
    const st = db.prepare(
      `SELECT ${$keys} 
      FROM users 
      WHERE id = $id and password = $password`
    );

    st.get(params, function (err, row) {
      if (err) {
        return rej()
      }

      if(!row) {
        return rej({ st: 400, msg: 'user not found' })
      }

      return res()
    })
    st.finalize();
  })
}

function updatePassword({ $id, $password }, db) {
  const $updatedAt = new Date().toISOString()
  
  const keys = [
    'password', 'updatedAt'
  ]
  const data = { password: $password }

  const pkeys = keys.map((value) => {
    return `${value} = $${value}`
  })
  const $pkeys = pkeys.join(', ')
  
  let values = { }
  for(let key of keys) {
    values['$' + key] = data[key]
  }
  values = { ...values, $id, $updatedAt }

  return new Promise((res, rej) => {

    const stmt = db.prepare(
      `UPDATE users 
      SET ${$pkeys} 
      WHERE id = $id`
    );

    stmt.run(values, function (err) {
      if (err) {
        return rej()
      }

      return res()
    })

    stmt.finalize();

  })
}

function getByUsername({ $username }, db) {
  const keys = [
    'name', 'description', 'website'
    , 'username', 'photo', 'numPosts'
  ]
  
  const $keys = keys.join(', ')
  const params = { $username }

  return new Promise((res, rej) => {
    const st = db.prepare(
      `SELECT ${$keys} 
      FROM users 
      WHERE username = $username`
    );

    st.get(params, function (err, row) {
      if (err) {
        return rej()
      }

      if(!row) {
        return rej({ st:400, msg: 'user not found' })
      }

      const rw = { ...row, photo: getPhoto(folderUsers, row.photo) }
      return res(rw)
    })
    st.finalize();
  });
}

module.exports = {
  getMe,
  updatePhoto,
  updateInfo,
  checkWithPassword,
  updatePassword,
  getByUsername,
}