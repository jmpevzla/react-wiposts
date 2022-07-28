const crypto = require('crypto')

const uploads = 'public/uploads'
const folderUsers = `${uploads}/users/`
const folderPosts = `${uploads}/posts/`

function getPhoto(folder, photo) {
  let pic = photo ? folder + photo : null 
  return pic
}

function makeCode(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
  }
  return result;
}

function makeTokenId() {
  return crypto.randomUUID()
}

function isIsoDate(str) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  var d = new Date(str); 
  return d.toISOString()===str;
}

module.exports = {
  folderUsers,
  folderPosts,
  getPhoto,
  makeCode,
  makeTokenId,
  isIsoDate
}