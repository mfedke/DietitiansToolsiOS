import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DisclaimerScreenStyle'

class DisclaimerScreen extends Component {
//  constructor (props) {
//    super(props)
//  }

  render () {
    return (
      <ScrollView>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'center', alignItems: 'center', paddingTop: '5%', width: '90%'}}>
          <Text>{'Information provided by Dietitian\'s Tool should be evaluated by a licensed medical professional. This information should be utilized with professional judgement. Calculations provided are not medical recommendations. \n\nThe licensee or user understands and agrees that the technology and content of this application are provided for recreational or educational purposes only. All calculations must be checked for accuracy and confirmed before use, clinical or otherwise.  All medical decisions must be based upon the clinical judgement of the licensed physician. Licensee or user assumes the duty to have any and all calculations verified by the licensed physician.  Neither licensor nor the associated authors or other entities warrant the accuracy of any information provided by or resulting from the technology  or the content for clinical management, and licensee or user agree that no such persons or entities shall be liable for any adverse consequences resulting from the use of any of the same.\n\nLicensee or user shall indemnify, defend and hold harmless licensor, its affiliates, and their respective officers, directors, owner, agents, information providers and employees from and against any claims, demands or causes of action whatsoever, including without limitation those arising on account of, or resulting from the exercise or practice of the license granted hereunder by licensee, its sublicensees, if any, its subsidiaries or other officers, employees, agent or representatives.'}</Text>
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(DisclaimerScreen)
