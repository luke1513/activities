import axios from 'axios'

const getTrips = async () => {
  const result = await axios.get('https://ltw-cms-stg.herokuapp.com/frontend/trips', {
    headers: {
      'Authorization': 'Bearer ' + window.localStorage.getItem('jwt')
    }
  }).then(res => res.data)

  return result
}

export default getTrips