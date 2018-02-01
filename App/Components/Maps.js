import React from 'react'
import MapView from 'react-native-maps'
import MapsCallout from './MapsCallout'
import Styles from './Styles/MapsStyles'
import Polyline from '@mapbox/polyline'

class Maps extends React.Component {
  constructor (props) {
    super(props)
    const region = { latitude: -7.7956, longitude: 110.3695, latitudeDelta: 0.02, longitudeDelta: 0.02 }
    this.state = {
      region,
      myLocation: { title: 'My Location', latitude: -7.7956, longitude: 110.3695 },
      destination: { title: 'Destination', latitude: -7.4797, longitude: 110.2177 },
      coords: []
    }
  }

  componentWillMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lastpos = position.coords
        this.setState({
          myLocation: { title: 'My Location', latitude: lastpos.latitude, longitude: lastpos.longitude }
        })
      },
      () => {},
      { enableHighAccuracy: false, timeout: 1000, maximumAge: Number.Infinity }
    )

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastpos = position.coords
      this.setState({
        latitude: lastpos.latitude,
        longitude: lastpos.longitude
      })
    })
  }

  componentDidMount () {
    const { myLocation, destination } = this.state
    setTimeout(() => {
      this.refs.map.fitToElements(true)
      this.getDirections(String(myLocation.latitude + ',' + myLocation.longitude), String(destination.latitude + ',' + destination.longitude))
    }, 1000)
  }

  calloutPress (location) {
    // if location pressed
  }

  async getDirections (startLoc, destinationLoc) {
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
      const respJson = await resp.json()
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      const time = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${ startLoc }&destinations=${ destinationLoc }&key=AIzaSyB2k5OVqK4poNuHmEIpg9aL98nETugWj1A`)
      const timeJson = await time.json()
      const timeLabel = timeJson.rows[0].elements[0].duration.text
      const distance = timeJson.rows[0].elements[0].distance.text
      this.setState({
        coords: coords
      })
      this.props.setTime(timeLabel, distance)
      return coords
    } catch (error) {
      return error
    }
  }

  renderMapMarkers (location) {
    return (
      <MapView.Marker key={location.title} coordinate={{latitude: location.latitude, longitude: location.longitude}}>
        <MapsCallout location={location} onPress={this.calloutPress} />
      </MapView.Marker>
    )
  }

  render () {
    const { myLocation, destination } = this.state
    return (
      <MapView
        ref='map'
        style={Styles.map}
        initialRegion={this.state.region}
        showsUserLocation
      >
        {this.renderMapMarkers(myLocation)}
        {this.renderMapMarkers(destination)}
        <MapView.Polyline
          coordinates={this.state.coords}
          strokeWidth={2}
          strokeColor='red'
        />
      </MapView>
    )
  }
}

export default Maps
