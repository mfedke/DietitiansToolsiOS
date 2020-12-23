import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/GeneralStyle'

class KcalFactors extends React.Component {
  render () {
    const {KcalState, notifySummaryPageMifflinActivityIndex, notifySummaryPageHBActivityIndex, notifySummaryPageHBStressIndex, notifySummaryPageKcalkgIndex} = this.props
    var factors = null

    if (KcalState.formulaData[KcalState.selectedFormulaIndex].label === 'Mifflin St. Jeor') {
      factors =
        <View paddingLeft='5%' paddingRight='5%' paddingTop='5%'>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>Activity Factor</Text>
          <View style={{borderWidth: 1, borderColor: '#86cacb', borderRadius: 10}}>
            <Picker
              selectedValue={KcalState.selectedMifflinActivityIndex}
              onValueChange={(itemValue, itemIndex) => {
                notifySummaryPageMifflinActivityIndex(itemIndex)
              }}
            >
              {KcalState.mifflinActivityData.map((member, i) => [
                <Picker.Item label={member.value.toFixed(3) + ' - ' + member.label} value={i} key={i} />
              ])}
            </Picker>
          </View>
        </View>
    } else if (KcalState.formulaData[KcalState.selectedFormulaIndex].label === 'Harris-Benedict') {
      factors =
        <View>
          <View paddingLeft='5%' paddingRight='5%' paddingTop='5%' paddingBottom='5%'>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>Activity Factor</Text>
            <View style={{borderWidth: 1, borderColor: '#86cacb', borderRadius: 10}}>
              <Picker
                selectedValue={KcalState.selectedHBActivityIndex}
                onValueChange={(itemValue, itemIndex) => {
                  notifySummaryPageHBActivityIndex(itemIndex)
                }}
              >
                {KcalState.hbActivityData.map((member, i) => [
                  <Picker.Item label={member.value.toFixed(1) + ' - ' + member.label} value={i} key={i} />
                ])}
              </Picker>
            </View>
          </View>
          <View paddingLeft='5%' paddingRight='5%'>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>Stress Factor</Text>
            <View style={{borderWidth: 1, borderColor: '#86cacb', borderRadius: 10}}>
              <Picker
                selectedValue={KcalState.selectedHBStressIndex}
                onValueChange={(itemValue, itemIndex) => {
                  notifySummaryPageHBStressIndex(itemIndex)
                }}
              >
                {KcalState.hbStressData.map((member, i) => [
                  <Picker.Item label={member.LL === member.UL ? member.LL.toFixed(1) + ': ' + member.label : member.LL.toFixed(1) + ' - ' + member.UL.toFixed(1) + ': ' + member.label} value={i} key={i} />
                ])}
              </Picker>
            </View>
          </View>
        </View>
    } else if (KcalState.formulaData[KcalState.selectedFormulaIndex].label === 'Kcal/Kg') {
      factors =
        <View paddingLeft='5%' paddingRight='5%' paddingTop='5%'>
          <View style={{borderWidth: 1, borderColor: '#86cacb', borderRadius: 10}}>
            <Picker
              selectedValue={KcalState.selectedKcalkgIndex}
              onValueChange={(itemValue, itemIndex) => {
                notifySummaryPageKcalkgIndex(itemIndex)
              }}
            >
              {KcalState.kcalkgData.map((member, i) => [
                <Picker.Item label={member.LL.toFixed(0) + ' - ' + member.UL.toFixed(0) + ' ' + member.label} value={i} key={i} />
              ])}
            </Picker>
          </View>
        </View>
    }

    return factors
  }
}

class KcalScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = props.navigation.state.params.getKcalState()
  }

//const KcalScreen = (props) => {
//  const [isHungry, setIsHungry] = useState(true);
//    props.navigation.state.params.getKcalState().forEach(
  

  notifySummaryPageMifflinActivityIndex = (selectedMifflinActivityIndex) => {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.selectedMifflinActivityIndex = selectedMifflinActivityIndex
    this.props.navigation.state.params.updateKcalState(this.state)
    // then, pull the calc results back here to update this page with the most current results
    this.setState(this.props.navigation.state.params.getKcalState())
  }

  notifySummaryPageHBActivityIndex = (selectedHBActivityIndex) => {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.selectedHBActivityIndex = selectedHBActivityIndex
    this.props.navigation.state.params.updateKcalState(this.state)
    // then, pull the calc results back here to update this page with the most current results
    this.setState(this.props.navigation.state.params.getKcalState())
  }

  notifySummaryPageHBStressIndex = (selectedHBStressIndex) => {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.selectedHBStressIndex = selectedHBStressIndex
    this.props.navigation.state.params.updateKcalState(this.state)
    // then, pull the calc results back here to update this page with the most current results
    this.setState(this.props.navigation.state.params.getKcalState())
  }

  notifySummaryPageKcalkgIndex = (selectedKcalkgIndex) => {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.selectedKcalkgIndex = selectedKcalkgIndex
    this.props.navigation.state.params.updateKcalState(this.state)
    // then, pull the calc results back here to update this page with the most current results
    this.setState(this.props.navigation.state.params.getKcalState())
  }

  notifySummaryPageFormulaIndex = (selectedFormulaIndex) => {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.selectedFormulaIndex = selectedFormulaIndex
    this.props.navigation.state.params.updateKcalState(this.state)
    // then, pull the calc results back here to update this page with the most current results
    this.setState(this.props.navigation.state.params.getKcalState())
  }

//      <ScrollView style={styles.container}>

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
            <KcalFactors
              KcalState={this.state}
              notifySummaryPageMifflinActivityIndex={this.notifySummaryPageMifflinActivityIndex}
              notifySummaryPageHBActivityIndex={this.notifySummaryPageHBActivityIndex}
              notifySummaryPageHBStressIndex={this.notifySummaryPageHBStressIndex}
              notifySummaryPageKcalkgIndex={this.notifySummaryPageKcalkgIndex}
            />
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: 30, width: '80%', marginTop: '10%'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>KCAL: {this.state.kcal_min === this.state.kcal_max ? this.state.kcal_min.toFixed(1) : this.state.kcal_min.toFixed(1) + ' - ' + this.state.kcal_max.toFixed(1)}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(KcalScreen)
