import axios from 'axios'

const getActivity = async (id) => {
  const result = await axios.get(`https://ltw-cms-stg.herokuapp.com/frontend/activities/slug/${id}`)
  .then(res => res.data)

  return result
}

export default getActivity