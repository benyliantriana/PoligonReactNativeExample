import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Maps from '../Components/Maps'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles

class MapScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      distance: '-',
      time: '-'
    }
  }

  setTime (time, distance) {
    this.setState({
      distance: distance,
      time: time
    })
  }

  render () {
    const { distance, time } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', padding: 5 }}>
          <Text style={{ marginRight: 20 }}>Distance : {distance}</Text>
          <Text>Time : {time}</Text>
        </View>
        <Maps
          setTime={(time, distance) => this.setTime(time, distance)}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
