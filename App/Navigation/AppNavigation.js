import { StackNavigator } from 'react-navigation'
import MapScreen from '../Containers/MapScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  MapScreen: { screen: MapScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MapScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
