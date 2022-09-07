import axios from 'axios'

const postLogin = async (email, pass) => {
  const result = await axios.post('https://ltw-cms-stg.herokuapp.com/auth/local', {
      identifier: email,
      password: pass
  })
  .then(res => res.data)

  return result
}

export default postLogin