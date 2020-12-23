import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/GeneralStyle'

class IbwScreen extends Component {
  constructor (props) {
    super(props)
    this.state = props.navigation.state.params.getIbwState()
  }

  notifySummaryPage (selectedAmpIndex, plegiaVal) {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.selectedAmpIndex = selectedAmpIndex
    this.state.plegiaVal = plegiaVal
    this.props.navigation.state.params.updateIbwState(this.state)
    // then, pull the calc results back here to update this page with the most current results
    let tmp = this.props.navigation.state.params.getIbwState()
    this.setState({selectedAmpIndex: selectedAmpIndex, plegiaVal: plegiaVal, ibw_min: tmp.ibw_min, ibw_max: tmp.ibw_max})
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
                  this.notifySummaryPage(itemValue, this.state.plegiaVal)
                }}
              >
                {this.state.ampData.map((member, i) => [
                  <Picker.Item label={member.label} value={member.index} key={i} />
                ])}
              </Picker>
            </View>
            <View style={{borderWidth: 0, borderColor: 'blue', flex: 1, flexDirection: 'column', justifyContent: 'center', width: '50%', marginTop: '5%'}}>
              {this.state.plegiaData.map((member, i) => [
                <CheckBox
                  title={member.label}
                  checked={this.state.plegiaVal === member.value}
                  key={i}
                  containerStyle={{backgroundColor: 'white', borderColor: '#86cacb', borderRadius: 10}}
                  textStyle={{fontSize: 16, fontWeight: 'normal', color: 'black'}}
                  checkedColor='#86cacb'
                  uncheckedColor='#86cacb'
                  onPress={() => {
                    if (this.state.plegiaVal === member.value) {
                      this.notifySummaryPage(this.state.selectedAmpIndex, 0)
                    } else {
                      this.notifySummaryPage(this.state.selectedAmpIndex, member.value)
                    }
                  }}
                />
              ])}
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: 30, width: '80%', marginTop: '10%'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>IBW: {this.state.ibw_min === this.state.ibw_max ? this.state.ibw_min.toFixed(1) : this.state.ibw_min.toFixed(1) + ' - ' + this.state.ibw_max.toFixed(1)}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(IbwScreen)
