import axios from 'axios'

const getNearbyActivities = async (id) => {
  const result = await axios.get(`https://ltw-cms-stg.herokuapp.com/frontend/activities/nearby/${id}`)
  .then(res => res.data)

  return result
}

export default getNearbyActivities