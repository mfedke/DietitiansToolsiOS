import React, { Component } from 'react'
import { View, ScrollView, Image, Animated } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/SplashScreenStyle'

class SplashScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      timer: null,
      dismissSplash: false
    };

    this.duration = 3000
  }

  componentDidMount () {
    // this provides a nice fade-in animation for the splash screen image, but it's not easy or performant to query when this is done
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: this.duration / 2,
        useNativeDriver: true
      }
    ).start()

    // this provides a timeout that will trigger after duration expires
    let timer = setInterval(this.tick, this.duration)
    this.setState({timer})
  }

  tick = () => {
    this.setState({
      dismissSplash: true
    })
  }

  componentDidUpdate () {
    console.log('SplashScreen componentDidUpdate, fadeAnim: ' + this.state.fadeAnim.__value)
    if (this.state.dismissSplash) {
      console.log('SplashScreen calling _navigateTo SummaryScreen')
      this._navigateTo('SummaryScreen')
    }
  }

  _navigateTo = (routeName: string) => {
    const actionToDispatch = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }

  render () {
    console.log('SplashScreen rendering')
    return (
      <Animated.View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', opacity: this.state.fadeAnim, backgroundColor: '#86cac9'}} >
        <Image source={require('../../App/Images/DietitiansToolsSplashScreen.png')} style={{width: '90%', height: '90%'}} />
      </Animated.View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
