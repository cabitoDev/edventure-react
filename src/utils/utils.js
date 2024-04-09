export const getLoginRequest = userData => {
  return {
    id: parseInt(userData.sub.slice(-5)),
    nickname: userData.nickname,
    name: userData.given_name,
    email: userData.email,
    loggedDate: userData.updated_at,
    avatar: userData.picture
  }
}
