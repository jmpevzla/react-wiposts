const Axios = require('axios').default
const fs = require('fs')
const multer  = require('multer')
const express = require('express')
const { createUrlPosts } = require('../utils')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
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

const axios = Axios.create({
  headers: {
      'no-auth': 1
  }
})

module.exports = [upload.single('photo'),
  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @returns 
   */
  async (req, res) => {
    const id = Number(req.params.id)
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({ error: 'id is invalid' })
    }
    const photo = (req.file?.path || '').replace('public/', '')
    
    if (photo) {
      try {
        const url = createUrlPosts(req)
        const axres = await axios.get(`${url}/${id}`)
        const post = axres.data 
        await axios.patch(`${url}/${id}`, {
          ...post,
          photo
        })
        
        return res.json({ id, photo })
      } catch(err) {
        console.error(err)
        fs.unlinkSync(req.file.path)
        return res.status(500).json({ error: err.message })
      }
    } 

    return res.status(400).json({ error: 'The file can not be processed, please verify the file and try again.' })
  
}]