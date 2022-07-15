const fs = require('fs')
const multer  = require('multer')

function multerfn(path) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/uploads/${path}`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      let ext = ''
      switch(file.mimetype) {
        case 'image/jpeg':
          ext = '.jpg'
          break
        case 'image/png':
          ext = '.png'
          break
        case 'image/gif':
          ext = '.gif'
          break
        case 'image/svg+xml':
          ext = '.svg'
          break
      }
      cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
  })

  const upload = multer({ storage })

  return upload
}

module.exports = multerfn