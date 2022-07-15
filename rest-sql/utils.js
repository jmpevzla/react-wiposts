const uploads = 'public/uploads'
const folderUsers = `${uploads}/users/`
const folderPosts = `${uploads}/posts/`

function getPhoto(folder, photo) {
  let pic = photo ? folder + photo : null 
  return pic
}

module.exports = {
  folderUsers,
  folderPosts,
  getPhoto
}