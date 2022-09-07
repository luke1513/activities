import axios from 'axios'

const removeActivity = async (id) => {
  const result = await axios.put('https://ltw-cms-stg.herokuapp.com/frontend/trips/remove_activity', {
    activityId: id,
    tripType: 'favorite'
  },{
    headers: {
      'Authorization': 'Bearer ' + window.localStorage.getItem('jwt')
    }
  }).then(res => res.data)

  return result
}

export default removeActivity