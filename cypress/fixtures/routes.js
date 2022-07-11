const profile = '/profile'
const recover = '/recover-password'

export default {
  home: "/",
  login: "/login",
  register: "/register",
  recover: {
    init: `${recover}`,
    code: (tokenId = '0cad791a-a89d-4d4e-a209-ab420ba54e86') => 
      `${recover}/${tokenId}/code`,
    change: (tokenId = '0cad791a-a89d-4d4e-a209-ab420ba54e86', code = 'PDJ6QV') => 
      `${recover}/${tokenId}/code/${code}/change`
  },
  profile: {    
    changePassword: `${profile}/change-password`,
    show: `${profile}`,
    photo: `${profile}/photo`,
    edit: `${profile}/edit`,
    changeEmail: `${profile}/change-email`
  }
}
