import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/GeneralStyle'

class BmiScreen extends Component {
  constructor (props) {
    super(props)
    // call updateBmiState first to get an updated calculation
    this.props.navigation.state.params.updateBmiState(props.navigation.state.params.getBmiState())
    this.state = props.navigation.state.params.getBmiState()
  }

  notifySummaryPage (selectedAmpIndex) {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.selectedAmpIndex = selectedAmpIndex
    this.props.navigation.state.params.updateBmiState(this.state)
    // then, pull the calc results back here to update this page with the most current result
    let tmp = this.props.navigation.state.params.getBmiState()
    this.setState({selectedAmpIndex: selectedAmpIndex, bmi: tmp.bmi})
  }

  render () {
    return (
      <ScrollView style={styles.ChildScrollView} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <View padding='5%'>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>Amputation</Text>
            <View style={{borderWidth: 1, borderColor: '#86cacb', borderRadius: 10}}>
              <Picker
                selectedValue={this.state.selectedAmpIndex}
                onValueChange={(itemValue, itemIndex) => {
                  this.notifySummaryPage(itemValue)
                }}
              >
                {this.state.ampData.map((member, i) => [
                  <Picker.Item label={member.label} value={member.index} key={i} />
                ])}
              </Picker>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: 30, width: '80%', marginTop: '10%'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>BMI: {this.state.bmi.toFixed(1) + ' - ' + this.state.classification}</Text>
            </View>
          </View>
          <View style={{borderTopWidth: 2, borderColor: '#bfbfbf', flex: 1, justifyContent: 'flex-end', width: '100%', backgroundColor: '#dddddd'}}>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(BmiScreen)
