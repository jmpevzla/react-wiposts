function getRoot(req) {
  return `http://${req.connection.localAddress}:${req.connection.localPort}`
}

function createUrlUsers(req) {
    return `${getRoot(req)}/users`
}

function createUrlPosts(req) {
  return `${getRoot(req)}/posts`
}

module.exports = {
  getRoot,
  createUrlUsers,
  createUrlPosts
}