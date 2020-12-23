import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/GeneralStyle'

class FluidFactors extends React.Component {
  render () {
    const {FluidState, notifySummaryPageMlkgIndex} = this.props
    var factors = null

    if (FluidState.formulaData[FluidState.selectedFormulaIndex].label === 'ml/kg') {
      factors =
        <View paddingLeft='5%' paddingRight='5%' paddingTop='5%'>
          <View style={{borderWidth: 1, borderColor: '#86cacb', borderRadius: 10}}>
            <Picker
              selectedValue={FluidState.selectedMlkgIndex}
              onValueChange={(itemValue, itemIndex) => {
                notifySummaryPageMlkgIndex(itemIndex)
              }}
            >
              {FluidState.mlkgData.map((member, i) => [
                <Picker.Item label={member.LL.toFixed(0) + ' - ' + member.UL.toFixed(0) + ' ' + member.label} value={i} key={i} />
              ])}
            </Picker>
          </View>
        </View>
    }

    return (<View>{factors}</View>)
  }
}

class FluidScreen extends Component {
  constructor (props) {
    super(props)
    this.state = props.navigation.state.params.getFluidState()
  }

  notifySummaryPageMlkgIndex = (selectedMlkgIndex) => {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.selectedMlkgIndex = selectedMlkgIndex
    this.props.navigation.state.params.updateFluidState(this.state)
    // then, pull the calc results back here to update this page with the most current results
    this.setState(this.props.navigation.state.params.getFluidState())
  }

  notifySummaryPageFormulaIndex = (selectedFormulaIndex) => {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.selectedFormulaIndex = selectedFormulaIndex
    this.props.navigation.state.params.updateFluidState(this.state)
    // then, pull the calc results back here to update this page with the most current results
    this.setState(this.props.navigation.state.params.getFluidState())
  }

  render () {
    return (
      <ScrollView style={styles.ChildScrollView} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <View padding='5%'>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>Formula</Text>
            <View style={{borderWidth: 1, borderColor: '#86cacb', borderRadius: 10}}>
              <Picker
                selectedValue={this.state.selectedFormulaIndex}
                onValueChange={(itemValue, itemIndex) => {
                  this.notifySummaryPageFormulaIndex(itemIndex)
                }}
              >
                {this.state.formulaData.map((member, i) => [
                  <Picker.Item label={member.label} value={i} key={i} />
                ])}
              </Picker>
            </View>
            <FluidFactors
              FluidState={this.state}
              notifySummaryPageMlkgIndex={this.notifySummaryPageMlkgIndex}
            />
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: 30, width: '80%', marginTop: '10%'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>Fluid: {this.state.fluid_min === this.state.fluid_max ? this.state.fluid_min.toFixed(1) : this.state.fluid_min.toFixed(1) + ' - ' + this.state.fluid_max.toFixed(1)}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(FluidScreen)
