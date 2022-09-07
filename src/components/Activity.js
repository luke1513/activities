import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import Flickity from 'react-flickity-component';
import { Layer, Feature, Marker } from 'react-mapbox-gl';

import getActivity from '../api/getActivity';
import getNearbyActivities from '../api/getNearbyActivities';
import Map from './Map';
import getTrips from '../api/getTrips';
import addActivity from '../api/addActivity';
import removeActivity from '../api/removeActivity';

const sliderOptions = {
  freeScroll: true,
  wrapAround: true,
  contain: true,
  prevNextButtons: false,
  pageDots: false,
  initialIndex: 2,
  cellAlign: 'left',
}

const Activity = () => {
  const [activity, setActivity] = useState(undefined)
  const [favorites, setFavorites] = useState(undefined)
  const [nearbyActivities, setNearbyActivities] = useState(undefined)

  let { id } = useParams();

  useEffect(async () => {
    if (id) {
      await handleGetTrips()
      await handleInitializeTrip(id)
    }
  }, [id])

  useEffect(() => {
    window.addEventListener('storage', () => {handleGetTrips()})
    return () => window.removeEventListener('storage', () => {handleGetTrips()})
  }, [])

  const handleGetTrips = async () => {
    getTrips().then(res => {
      setFavorites(res[0].activities)
    })
  }

  const handleInitializeTrip = async () => {
    getActivity(id)
    .then(res => {
      setActivity(res)
      handleNearbyActivities(res.id)
    })
  }

  const handleNearbyActivities = async (id) => {
    getNearbyActivities(id)
    .then(res => {
      setNearbyActivities(res)
    })
  }

  const handleAddActivity = async (id) => {
    addActivity(id).then(() => {
      window.dispatchEvent(new Event("storage"));
    })
  }

  const handleRemoveActivity = async (id) => {
    removeActivity(id).then(() => {
      window.dispatchEvent(new Event("storage"));
    })
  }

  const isSaved = (id) => {
    let saved = false

    favorites && favorites.forEach(el => {
      if (el.id === id)
        saved = true
    })

    return saved
  }

  return ( activity ? 
    <div className='activity'>
      <div className='images'>
        {isSaved(activity.id)
          ? <div className='save' onClick={() => handleRemoveActivity(activity.id)}>SAVED</div>
          : <div className='save' onClick={() => handleAddActivity(activity.id)}>SAVE</div>
        }
        <Flickity options={sliderOptions}>
          {activity.images.map(el => 
            <div key={el.id}>
              <img src={el.url} />
              <p className='source'>{el.sourceText}</p>
            </div>
          )}
        </Flickity>
      </div>
      <div className='wrapper'>
        <h1>{activity.name.toUpperCase()}</h1>
        <div className='labels'>
          {activity.labels.map(el =>
            <div className='label-name' key={el.id}>{el.name}</div>
          )}
        </div>
        <p className='description-short'>{activity.description_short}</p>
        <p className='description-long'>{activity.description_long}</p>
        <Map
          style='mapbox://styles/mapbox/streets-v8'
          zoom={[12]}
          center={[activity.longitude, activity.latitude]}
          containerStyle={{
            height: '500px',
            width: '100%'
          }}
        >
          <Layer type='symbol' id='marker' layout={{ 'icon-image': 'marker' }}>
            <Marker coordinates={[activity.longitude, activity.latitude]} />
          </Layer>
        </Map>
        <p className='recommended'>Recommended Activities Nearby</p>
        <div className='nearby'> {nearbyActivities &&
          <Flickity options={sliderOptions}>
            {nearbyActivities.map(el => 
              <div key={el.id}>
                {isSaved(el.id)
                  ? <div className='save' onClick={() => handleRemoveActivity(el.id)}>SAVED</div>
                  : <div className='save' onClick={() => handleAddActivity(el.id)}>SAVE</div>
                }
                <img src={el.images[0].url} />
                <p className='title'>{el.name}</p>
                <p className='description'>{el.description_short} ... <Link to={`/activities/${el.slug}`}>READ MORE</Link></p>
              </div>
            )}
          </Flickity>
        }</div>
      </div>
    </div>
    : <></>
  )
}

export default Activity