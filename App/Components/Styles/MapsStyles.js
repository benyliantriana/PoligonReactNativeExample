import { StyleSheet } from 'react-native'

// Enable this if you have app-wide application styles
// import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  // Merge in the screen styles from application styles
  // ...ApplicationStyles.screen,
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    // For Android :/
    flex: 1
  }
})
