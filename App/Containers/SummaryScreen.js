import React, { Component } from 'react'
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Button, Animated } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import PropTypes from 'prop-types'
import { Colors } from '../Themes/'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SummaryScreenStyle'

const buttons = ['Kcal', 'Protein', 'Fluid', 'Ibw', 'Bmi']

const noop = () => {}

//class FocusableTextInput extends TextInput {
//  // Props:
//  static propTypes = {
//    focus: PropTypes.bool
//  }
//
//  static defaultProps = {
//    focus: false
//  }
//
//  // Methods:
//  focus () {
//    this._component.focus()
//  }
//
//  componentDidUpdate (nextProps) {
//    const {focus} = nextProps
//
//    //focus && this.focus()
//  }
//}

class ChildSummary extends React.Component {
  render () {
    const {name, KcalState, ProteinState, FluidState, IbwState, BmiState, style} = this.props
    var summary = ''

    if (name === 'Kcal') {
      if (KcalState.formulaData[KcalState.selectedFormulaIndex].label === 'Mifflin St. Jeor') {
        summary = 'Mifflin St. Jeor; ' + KcalState.mifflinActivityData[KcalState.selectedMifflinActivityIndex].label
      }
      if (KcalState.formulaData[KcalState.selectedFormulaIndex].label === 'Harris-Benedict') {
        summary = 'Harris-Benedict; ' + KcalState.hbActivityData[KcalState.selectedHBActivityIndex].label + '; ' + KcalState.hbStressData[KcalState.selectedHBStressIndex].label
      }
      if (KcalState.formulaData[KcalState.selectedFormulaIndex].label === 'Kcal/Kg') {
        summary = 'Kcal/Kg; ' + KcalState.kcalkgData[KcalState.selectedKcalkgIndex].LL + ' - ' + KcalState.kcalkgData[KcalState.selectedKcalkgIndex].UL + ' ' + KcalState.kcalkgData[KcalState.selectedKcalkgIndex].label
      }
    }

    if (name === 'Protein') {
      let selectedProtein = ProteinState.data.find(e => e.selected === true)
      summary = selectedProtein ? selectedProtein.label : ''
    }

    if (name === 'Fluid') {
      if (FluidState.formulaData[FluidState.selectedFormulaIndex].label === 'ml/kg') {
        summary = 'ml/kg; ' + FluidState.mlkgData[FluidState.selectedMlkgIndex].LL + ' - ' + FluidState.mlkgData[FluidState.selectedMlkgIndex].UL + ' ' + FluidState.mlkgData[FluidState.selectedMlkgIndex].label
      }
      if (FluidState.formulaData[FluidState.selectedFormulaIndex].label === '1 ml/kcal') {
        summary = '1 ml/kcal'
      }
      if (FluidState.formulaData[FluidState.selectedFormulaIndex].label === 'Holliday-Seger Method') {
        summary = 'Holliday-Seger'
      }
    }

    if (name === 'Ibw') {
      let selectedAmp = IbwState.ampData.find(e => e.index === IbwState.selectedAmpIndex)
      let selectedPlegia = IbwState.plegiaData.find(e => e.value === IbwState.plegiaVal)
      if (selectedPlegia) {
        summary = selectedAmp.label + '; ' + selectedPlegia.label
      } else {
        summary = selectedAmp.label + '; No plegia'
      }
    }

    if (name === 'Bmi') {
      let selectedAmp = BmiState.ampData.find(e => e.index === BmiState.selectedAmpIndex)
      summary = selectedAmp.label + '; ' + BmiState.classification
    }

    return (<View style={style}><Text style={styles.TextSmallLight}>{summary}</Text></View>)
  }
}

class SummaryScreen extends Component {
  constructor (props) {
    super(props)

    const onGetKcalState = () => {
      return this.KcalState
    }

    const onGetProteinState = () => {
      return this.ProteinState
    }

    const onGetFluidState = () => {
      return this.FluidState
    }

    const onGetIbwState = () => {
      return this.IbwState
    }

    const onGetBmiState = () => {
      return this.BmiState
    }

    const onUpdateKcalState = (state) => {
      this.KcalState = state
      this.runAllCalcs()
      this.setState({kcal_min: this.KcalState.kcal_min, kcal_max: this.KcalState.kcal_max})
    }

    const onUpdateProteinState = (state) => {
      this.ProteinState = state
      this.runAllCalcs()
      this.setState({protein_min: this.ProteinState.protein_min, protein_max: this.ProteinState.protein_max})
    }

    const onUpdateFluidState = (state) => {
      this.FluidState = state
      this.runAllCalcs()
      this.setState({fluid_min: this.FluidState.fluid_min, fluid_max: this.FluidState.fluid_max})
    }

    const onUpdateIbwState = (state) => {
      this.IbwState = state
      this.runAllCalcs()
      this.setState({ibw_min: this.IbwState.ibw_min, ibw_max: this.IbwState.ibw_max})
    }

    const onUpdateBmiState = (state) => {
      this.BmiState = state
      this.runAllCalcs()
      this.setState({bmi: this.BmiState.bmi})
    }

    this.state = {
      gender: 'female',
      age: 0,
      weight_lbs: 0,
      height_ft: 0,
      height_in: 0,
      kcal_min: 0.0,
      kcal_max: 0.0,
      protein_min: 0.0,
      protein_max: 0.0,
      fluid_min: 0.0,
      fluid_max: 0.0,
      ibw_min: 0.0,
      ibw_max: 0.0,
      bmi: 0.0,
      getKcalState: onGetKcalState,
      updateKcalState: onUpdateKcalState,
      getProteinState: onGetProteinState,
      updateProteinState: onUpdateProteinState,
      getFluidState: onGetFluidState,
      updateFluidState: onUpdateFluidState,
      getIbwState: onGetIbwState,
      updateIbwState: onUpdateIbwState,
      getBmiState: onGetBmiState,
      updateBmiState: onUpdateBmiState,
      focusWeightInput: false,
      focusHeightFtInput: false,
      focusHeightInInput: false
    }

    /* Store sub page state here in Summary Page so it can be maintained while navigating around */
    this.KcalState = {
      formulaData: [
        {
          label: 'Mifflin St. Jeor'
        },
        {
          label: 'Harris-Benedict'
        },
        {
          label: 'Kcal/Kg'
        }
      ],
      mifflinActivityData: [
        {
          label: 'sedentary',
          value: 1.2
        },
        {
          label: 'lightly active',
          value: 1.375
        },
        {
          label: 'moderately active',
          value: 1.55
        },
        {
          label: 'very active',
          value: 1.725
        },
        {
          label: 'extra active',
          value: 1.9
        }
      ],
      hbActivityData: [
        {
          label: 'comatose, motionless',
          value: 1.0
        },
        {
          label: 'in bed, bed to chair',
          value: 1.2
        },
        {
          label: 'hospitalized ambulatory',
          value: 1.3
        },
        {
          label: 'regular exercise',
          value: 1.5
        },
        {
          label: 'strenuous activity',
          value: 1.8
        }
      ],
      hbStressData: [
        {
          label: 'No stress',
          UL: 1.0,
          LL: 1.0
        },
        {
          label: 'Minor Surgery',
          UL: 1.2,
          LL: 1.0
        },
        {
          label: 'Major Surgery',
          UL: 1.3,
          LL: 1.1
        },
        {
          label: 'Skeletal Trauma',
          UL: 1.6,
          LL: 1.1
        },
        {
          label: 'Head Trauma',
          UL: 1.8,
          LL: 1.6
        },
        {
          label: 'Mild Infection',
          UL: 1.2,
          LL: 1.0
        },
        {
          label: 'Moderate Infection',
          UL: 1.4,
          LL: 1.2
        },
        {
          label: 'Severe Infection',
          UL: 1.8,
          LL: 1.4
        },
        {
          label: '<20% BSA Burn',
          UL: 1.5,
          LL: 1.2
        },
        {
          label: '20% - 40% BSA Burn',
          UL: 1.8,
          LL: 1.5
        },
        {
          label: '>40% BSA Burn',
          UL: 2.0,
          LL: 1.8
        }
      ],
      kcalkgData: [
        {
          label: 'Kcal/Kg',
          UL: 22,
          LL: 18
        },
        {
          label: 'Kcal/Kg',
          UL: 30,
          LL: 25
        },
        {
          label: 'Kcal/Kg',
          UL: 35,
          LL: 30
        },
        {
          label: 'Kcal/Kg',
          UL: 40,
          LL: 35
        }
      ],
      selectedFormulaIndex: 0,
      selectedMifflinActivityIndex: 0,
      selectedHBActivityIndex: 0,
      selectedHBStressIndex: 0,
      selectedKcalkgIndex: 0,
      kcal_min: 0.0,
      kcal_max: 0.0
    }

    this.ProteinState = {
      data: [
        {
          label: 'Pre-Dialysis: 0.6 - 0.8 gm/kg',
          value: 'LL: 0.6, UL: 0.8'
        },
        {
          label: 'Normal: 0.8 - 1.0 gm/kg',
          value: 'LL: 0.8, UL: 1.0',
          selected: true
        },
        {
          label: 'Older Adult > 65 yrs: 1.0 gm/kg',
          value: 'LL: 1.0, UL: 1.0'
        },
        {
          label: 'CKD w/ Dialysis: 1.2 - 1.5 gm/kg',
          value: 'LL: 1.2, UL: 1.5'
        },
        {
          label: 'Pressure Sore: 1.25 - 1.5 gm/kg',
          value: 'LL: 1.25, UL: 1.5'
        },
        {
          label: 'Critical Illness: 1.2 - 2.0 gm/kg',
          value: 'LL: 1.2, UL: 2.0'
        }
      ],
      selectedVal: 'LL: 0.8, UL: 1.0',
      protein_min: 0.0,
      protein_max: 0.0
    }

    this.FluidState = {
      formulaData: [
        {
          label: 'ml/kg'
        },
        {
          label: '1 ml/kcal'
        },
        {
          label: 'Holliday-Seger Method'
        }
      ],
      mlkgData: [
        {
          label: 'ml/kg',
          UL: 30,
          LL: 25
        },
        {
          label: 'ml/kg',
          UL: 35,
          LL: 30
        }
      ],
      selectedFormulaIndex: 0,
      selectedMlkgIndex: 0,
      fluid_min: 0.0,
      fluid_max: 0.0
    }

    this.ampData = [
      {
        label: 'No Amputation',
        value: 0.0,
        index: 0
      },
      {
        label: 'Below Knee - 5.9%',
        value: 0.059,
        index: 1
      },
      {
        label: 'Above Knee - 10%',
        value: 0.1,
        index: 2
      },
      {
        label: 'Bilateral BKA - 11.8%',
        value: 0.118,
        index: 3
      },
      {
        label: 'Bilateral AKA - 20%',
        value: 0.2,
        index: 4
      },
      {
        label: 'BKA + AKA - 16%',
        value: 0.16,
        index: 5
      },
      {
        label: 'Foot - 1.5%',
        value: 0.015,
        index: 6
      },
      {
        label: 'Both Feet - 3%',
        value: 0.03,
        index: 7
      },
      {
        label: 'Forearm and Hand - 2.3%',
        value: 0.023,
        index: 8
      },
      {
        label: 'Both Forearms and Hands - 4.6%',
        value: 0.046,
        index: 9
      },
      {
        label: 'Entire Arm - 5%',
        value: 0.05,
        index: 10
      },
      {
        label: 'Both Entire Arms - 10%',
        value: 0.1,
        index: 11
      },
      {
        label: 'Entire Leg - 16%',
        value: 0.16,
        index: 12
      },
      {
        label: 'Both Entire Legs - 32%',
        value: 0.32,
        index: 13
      }
    ]

    this.IbwState = {
      ampData: this.ampData,
      plegiaData: [
        {
          label: 'Paraplegia',
          value: 10
        },
        {
          label: 'Quadraplegia',
          value: 15
        }
      ],
      plegiaVal: 0,
      selectedAmpIndex: 0,
      ibw_min: 0.0,
      ibw_max: 0.0
    }

    this.BmiState = {
      ampData: this.ampData,
      selectedAmpIndex: 0,
      bmi: 0.0,
      classification: 'Normal'
    }
  } // constructor


  clearInputFocus = () => {
    this.setState({
      focusWeightInput: false,
      focusHeightFtInput: false,
      focusHeightInInput: false
    })
  }

  handleAgeInputSubmit = () => {
    this.setState({
      focusWeightInput: true,
      focusHeightFtInput: false,
      focusHeightInInput: false
    })
  }

  handleWeightInputSubmit = () => {
    this.setState({
      focusWeightInput: false,
      focusHeightFtInput: true,
      focusHeightInInput: false
    })
  }

  handleHeightFtInputSubmit = () => {
    this.setState({
      focusWeightInput: false,
      focusHeightFtInput: false,
      focusHeightInInput: true
    })
  }

  handleHeightInInputSubmit = () => {
    this.clearInputFocus()
  }

  runAllCalcs () {
    if (this.state.height_ft !== 0) {
      this.calcKcal()
      // set kcal immediately since Fluid calc may need to reference it
      this.state.kcal_min = this.KcalState.kcal_min
      this.state.kcal_max = this.KcalState.kcal_max
      this.calcIbw()
      this.setState(
        {
          ibw_min: this.IbwState.ibw_min,
          ibw_max: this.IbwState.ibw_max,
          kcal_min: this.KcalState.kcal_min,
          kcal_max: this.KcalState.kcal_max
        })
    }
    if (this.state.weight !== 0) {
      this.calcFluid()
      this.calcProtein()
      this.setState(
        {
          fluid_min: this.FluidState.fluid_min,
          fluid_max: this.FluidState.fluid_max,
          protein_min: this.ProteinState.protein_min,
          protein_max: this.ProteinState.protein_max
        })
    }
    if ((this.state.height_ft !== 0) && (this.state.weight_lbs !== 0)) {
      this.calcBmi()
      this.setState({bmi: this.BmiState.bmi})
    }
  }

  convertLbsToKg = (lbs) => {
    return lbs * 0.453592
  }

  convertInToCm = (inches) => {
    return inches * 2.54
  }

  calcKcal () {
    var bmrBase = 0
    var bmr = 0
    var heightIn = this.state.height_ft * 12.0 + this.state.height_in

    if (this.KcalState.formulaData[this.KcalState.selectedFormulaIndex].label === 'Mifflin St. Jeor') {
      if (this.state.gender === 'male') {
        // Male: BMR = 10 * weight + 6.25 * height - 5 * age + 5
        bmrBase = 10.0 * this.convertLbsToKg(this.state.weight_lbs) +
                  6.25 * this.convertInToCm(heightIn) -
                  5.0 * parseFloat(this.state.age) +
                  5
      } else if (this.state.gender === 'female') {
        // Female: BMR = 10 * weight + 6.25 * height - 5 * age - 161
        bmrBase = 10.0 * this.convertLbsToKg(this.state.weight_lbs) +
                  6.25 * this.convertInToCm(heightIn) -
                  5.0 * parseFloat(this.state.age) -
                  161
      }
      var bmrBoth = bmrBase * this.KcalState.mifflinActivityData[this.KcalState.selectedMifflinActivityIndex].value
      bmr = {'LL': bmrBoth, 'UL': bmrBoth}
    } else if (this.KcalState.formulaData[this.KcalState.selectedFormulaIndex].label === 'Harris-Benedict') {
      if (this.state.gender === 'male') {
        // Male: RMR = 13.75 * weight + 5 * height - 6.75 * age + 66.47
        bmrBase = 13.75 * this.convertLbsToKg(this.state.weight_lbs) +
                  5 * this.convertInToCm(heightIn) -
                  6.75 * parseFloat(this.state.age) +
                  66.47
      } else if (this.state.gender === 'female') {
        // Female: RMR = 9.56 * weight + 1.84 * height - 4.67 * age + 655.09
        bmrBase = 9.56 * this.convertLbsToKg(this.state.weight_lbs) +
                  1.84 * this.convertInToCm(heightIn) -
                  4.67 * parseFloat(this.state.age) +
                  655.09
      }
      bmr = {
        'LL': bmrBase * this.KcalState.hbActivityData[this.KcalState.selectedHBActivityIndex].value * this.KcalState.hbStressData[this.KcalState.selectedHBStressIndex].LL,
        'UL': bmrBase * this.KcalState.hbActivityData[this.KcalState.selectedHBActivityIndex].value * this.KcalState.hbStressData[this.KcalState.selectedHBStressIndex].UL
      }
    } else if (this.KcalState.formulaData[this.KcalState.selectedFormulaIndex].label === 'Kcal/Kg') {
      let weightKg = this.convertLbsToKg(this.state.weight_lbs)
      bmr = {
        'LL': this.KcalState.kcalkgData[this.KcalState.selectedKcalkgIndex].LL * weightKg,
        'UL': this.KcalState.kcalkgData[this.KcalState.selectedKcalkgIndex].UL * weightKg
      }
    }
    this.KcalState.kcal_min = bmr['LL']
    this.KcalState.kcal_max = bmr['UL']
  }

  calcProtein () {
    let weightKg = this.convertLbsToKg(this.state.weight_lbs)
    let proteinRegex = /LL: ([0-9\.]+), UL: ([0-9\.]+)/
    let proteinMatch = proteinRegex.exec(this.ProteinState.selectedVal)
    this.ProteinState.protein_min = parseFloat(proteinMatch[1]) * weightKg
    this.ProteinState.protein_max = parseFloat(proteinMatch[2]) * weightKg
  }

  calcFluid () {
    var fluid = 0

    if (this.FluidState.formulaData[this.FluidState.selectedFormulaIndex].label === 'ml/kg') {
      let weightKg = this.convertLbsToKg(this.state.weight_lbs)
      fluid = {
        'LL': this.FluidState.mlkgData[this.FluidState.selectedMlkgIndex].LL * weightKg,
        'UL': this.FluidState.mlkgData[this.FluidState.selectedMlkgIndex].UL * weightKg
      }
    } else if (this.FluidState.formulaData[this.FluidState.selectedFormulaIndex].label === '1 ml/kcal') {
      fluid = {'LL': this.state.kcal_min, 'UL': this.state.kcal_max}
    } else if (this.FluidState.formulaData[this.FluidState.selectedFormulaIndex].label === 'Holliday-Seger Method') {
      let weightKg = this.convertLbsToKg(this.state.weight_lbs)
      let fluidBase = 0.0
      if (weightKg <= 10) {
        fluidBase = 100.0 * weightKg
      } else if (weightKg <= 20.0) {
        fluidBase = 1000.0 + (weightKg - 10.0) * 50.0
      } else {
        if (parseFloat(this.state.age) <= 50) {
          fluidBase = 1500.0 + (weightKg - 20.0) * 20.0
        } else {
          fluidBase = 1500.0 + (weightKg - 20.0) * 15.0
        }
      }
      fluid = {'LL': fluidBase, 'UL': fluidBase}
    }

    this.FluidState.fluid_min = fluid['LL']
    this.FluidState.fluid_max = fluid['UL']
  }

  calcIbw () {
    var ibwBase = 0.0
    var heightIn = this.state.height_ft * 12.0 + this.state.height_in

    if (this.state.gender === 'male') {
      if (heightIn <= 60) {
        ibwBase = 106 - (60 - heightIn) * 2.5
      } else {
        ibwBase = 106 + (heightIn - 60) * 6.0
      }
    } else {
      if (heightIn <= 60) {
        ibwBase = 100 - (60 - heightIn) * 2.5
      } else {
        ibwBase = 100 + (heightIn - 60) * 5.0
      }
    }

    let selectedAmp = this.IbwState.ampData.find(e => e.index === this.IbwState.selectedAmpIndex)

    this.IbwState.ibw_min = (ibwBase * 0.9 - this.IbwState.plegiaVal) * (1.0 - selectedAmp.value)
    this.IbwState.ibw_max = (ibwBase * 1.1 - this.IbwState.plegiaVal) * (1.0 - selectedAmp.value)
  }

  calcBmi () {
    var heightIn = this.state.height_ft * 12.0 + this.state.height_in
    let selectedAmp = this.BmiState.ampData.find(e => e.index === this.BmiState.selectedAmpIndex)
    this.BmiState.bmi = 703.0 * ((this.state.weight_lbs * (1.0 + selectedAmp.value)) / (heightIn * heightIn))
    if (this.BmiState.bmi < 25.0) {
      this.BmiState.classification = 'Normal'
    } else if (this.BmiState.bmi >= 25.0 && this.BmiState.bmi < 30.0) {
      this.BmiState.classification = 'Overweight'
    } else if (this.BmiState.bmi >= 30.0 && this.BmiState.bmi < 35.0) {
      this.BmiState.classification = 'Obesity I'
    } else if (this.BmiState.bmi >= 35.0 && this.BmiState.bmi < 40.0) {
      this.BmiState.classification = 'Obesity II'
    } else if (this.BmiState.bmi >= 40.0) {
      this.BmiState.classification = 'Extreme Obesity III'
    }
  }

  onPressFemale = () => {
    this.state.gender = 'female'
    this.runAllCalcs()
    this.setState({gender: 'female'})
  }

  onPressMale = () => {
    this.state.gender = 'male'
    this.runAllCalcs()
    this.setState({gender: 'male'})
  }

  render () {
    var calculatedValStrings = {
      'Kcal': this.state.kcal_min === this.state.kcal_max ? this.state.kcal_min.toFixed(1) : this.state.kcal_min.toFixed(1) + ' - ' + this.state.kcal_max.toFixed(1),
      'Protein': this.state.protein_min === this.state.protein_max ? this.state.protein_min.toFixed(1) : this.state.protein_min.toFixed(1) + ' - ' + this.state.protein_max.toFixed(1),
      'Fluid': this.state.fluid_min === this.state.fluid_max ? this.state.fluid_min.toFixed(1) : this.state.fluid_min.toFixed(1) + ' - ' + this.state.fluid_max.toFixed(1),
      'Ibw': this.state.ibw_min === this.state.ibw_max ? this.state.ibw_min.toFixed(1) : this.state.ibw_min.toFixed(1) + ' - ' + this.state.ibw_max.toFixed(1),
      'Bmi': this.state.bmi.toFixed(1)
    }

    return (
      <ScrollView style={styles.ScrollContent}>
        { /* this is an inline JSX comment */ }
        <View>
          <View style={{borderWidth: 0, borderColor: 'blue', flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: '4%', backgroundColor: 'white'}}>
            <View style={styles.InputOutline}>
              <View style={styles.InputLabelFirstRow}>
                <Text style={styles.TextLarge}>Age</Text>
                <Text style={styles.TextSmall}>years</Text>
              </View>
              <View style={styles.TextEntryArea}>
                <TextInput
                  returnKeyType={'next'}
                  onSubmitEditing={this.handleAgeInputSubmit}
                  placeholder=''
                  underlineColorAndroid='transparent'
                  keyboardType='numeric'
                  style={styles.TextInput}
                  onChangeText={(text) => {
                    this.state.age = parseFloat(text)
                    this.runAllCalcs()
                  }}
                  value={this.state.text} />
              </View>
            </View>
            <View style={styles.InputOutline}>
              <View style={styles.InputLabelFirstRow}>
                <Text style={styles.TextLarge}>Weight</Text>
                <Text style={styles.TextSmall}>lbs</Text>
              </View>
              <View style={styles.TextEntryArea}>
                <TextInput
                  returnKeyType={'next'}
                  focus={this.state.focusWeightInput}
                  onSubmitEditing={this.handleWeightInputSubmit}
                  placeholder=''
                  underlineColorAndroid='transparent'
                  keyboardType='numeric'
                  style={styles.TextInput}
                  onChangeText={(text) => {
                    this.state.weight_lbs = parseFloat(text)
                    this.runAllCalcs()
                  }}
                  value={this.state.text} />
              </View>
            </View>
          </View>
          <View style={styles.SecondInputRow}>
            <View style={styles.InputOutline}>
              <View style={styles.InputLabelContainerSecondRow}>
                <View style={styles.InputLabelSecondRowLeft}>
                  <Text style={styles.TextLarge}>Height</Text>
                  <Text style={styles.TextSmall}>ft</Text>
                </View>
                <View style={styles.InputLabelSecondRowRight}>
                  <Text style={styles.TextSmall}>in</Text>
                </View>
              </View>
              <View style={styles.TextEntryArea}>
                <TextInput
                  returnKeyType={'next'}
                  focus={this.state.focusHeightFtInput}
                  onSubmitEditing={this.handleHeightFtInputSubmit}
                  placeholder=''
                  underlineColorAndroid='transparent'
                  keyboardType='numeric'
                  style={styles.TextInput}
                  onChangeText={(text) => {
                    this.state.height_ft = parseFloat(text)
                    this.runAllCalcs()
                  }}
                  value={this.state.text} />
                <TextInput
                  focus={this.state.focusHeightInInput}
                  onSubmitEditing={this.handleHeightInInputSubmit}
                  placeholder=''
                  underlineColorAndroid='transparent'
                  keyboardType='numeric'
                  style={styles.TextInput}
                  onChangeText={(text) => {
                    this.state.height_in = parseFloat(text)
                    this.runAllCalcs()
                  }}
                  value={this.state.text} />
              </View>
            </View>
          </View>
          <View style={styles.ThirdInputRow}>
            <View style={styles.InputOutlineGender}>
              <View style={styles.InputLabelThirdRow}>
                <Text style={styles.TextLarge}>Gender</Text>
              </View>
              <View style={styles.ThirdInputRowIconContainer}>
                <TouchableOpacity onPress={() => {
                  this.clearInputFocus()
                  this.onPressFemale()
                }}>
                  <View style={{borderBottomWidth: 4, borderColor: this.state.gender === 'female' ? 'gray' : 'rgba(0, 0, 0, 0)'}}>
                    <View style={{padding: 10}}>
                      <Image
                        source={this.state.gender === 'female' ? require('../../App/Images/female44x100-dark.png') : require('../../App/Images/female44x100.png')}
                        style={{width: 44, height: 100}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  this.clearInputFocus()
                  this.onPressMale()
                }}>
                  <View style={{borderBottomWidth: 4, borderColor: this.state.gender === 'male' ? 'gray' : 'rgba(0, 0, 0, 0)'}}>
                    <View style={{padding: 10}}>
                      <Image
                        source={this.state.gender === 'male' ? require('../../App/Images/male44x100-dark.png') : require('../../App/Images/male44x100.png')}
                        style={{width: 44, height: 100}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.ChildButtonArea}>
            {buttons.map((name, i) => [
              <View key={i} style={styles.ChildButtonContainer}>
                <TouchableOpacity style={styles.ChildButtonOutline} onPress={() => {
                  this.clearInputFocus()
                  this.props.navigation.navigate(name.concat('Screen'), this.state)
                  }}>
                  <View style={styles.ChildButtonLabel}>
                    <Text style={styles.TextMedium}>
                      {name.toUpperCase()}
                    </Text>
                  </View>
                  <ChildSummary
                    name={name}
                    KcalState={this.KcalState}
                    ProteinState={this.ProteinState}
                    FluidState={this.FluidState}
                    IbwState={this.IbwState}
                    BmiState={this.BmiState}
                    style={styles.ChildButtonSummary} />
                  <View style={styles.ChildButtonValue}>
                    <Text style={styles.TextMedium}>
                      {calculatedValStrings[name]}
                    </Text>
                  </View>
                  <Image
                    source={require('../../App/Images/right_arrow_02.png')}
                    style={{flex: 1, flexBasis: '12%', height: 26, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              </View>
            ])}
          </View>
          <View style={styles.Footer}>
            <TouchableOpacity style={{paddingRight: '10%'}} onPress={() => this.props.navigation.navigate('DisclaimerScreen', this.state)}>
              <Text>Disclaimer</Text>
            </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen)
