import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// import RadioGroup from 'react-native-radio-buttons-group'
import RadioGroup from '../Components/RadioButtonsGroup'

// Styles
import styles from './Styles/GeneralStyle'

class ProteinScreen extends Component {
  constructor (props) {
    super(props)
    this.state = props.navigation.state.params.getProteinState()
  }

  notifySummaryPage (selectedVal) {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.selectedVal = selectedVal
    this.props.navigation.state.params.updateProteinState(this.state)
    // then, pull the calc results back here to update this page with the most current results
    let tmp = this.props.navigation.state.params.getProteinState()
    this.setState({selectedVal: selectedVal, protein_min: tmp.protein_min, protein_max: tmp.protein_max})
  }

  render () {
    return (
      <ScrollView style={styles.ChildScrollView} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
            <RadioGroup radioButtons={this.state.data} onPress={(data) => {
              let selectedButton = data.find(e => e.selected === true)
              let newSelectedVal = selectedButton ? selectedButton.value : data[0].value
              this.notifySummaryPage(newSelectedVal)
            }} />
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: 30, width: '80%'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>Protein: {this.state.protein_min === this.state.protein_max ? this.state.protein_min.toFixed(1) : this.state.protein_min.toFixed(1) + ' - ' + this.state.protein_max.toFixed(1)}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProteinScreen)
