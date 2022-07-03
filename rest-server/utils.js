function getRoot(req) {
  return `http://${req.connection.localAddress}:${req.connection.localPort}`
}

function createUrlUsers(req) {
    return `${getRoot(req)}/users`
}

function createUrlPosts(req) {
  return `${getRoot(req)}/posts`
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

module.exports = {
  getRoot,
  createUrlUsers,
  createUrlPosts,
  makeCode
}