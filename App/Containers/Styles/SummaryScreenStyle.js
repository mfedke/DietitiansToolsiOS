import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  FirstInputRow: {
    borderWidth: 0,
    borderColor: 'blue',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: '4%',
    backgroundColor: 'white'
  },
  SecondInputRow: {
    borderWidth: 0,
    borderColor: 'blue',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: '4%',
    backgroundColor: 'white'
  },
  ThirdInputRow: {
    borderWidth: 0,
    borderColor: 'blue',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '4%',
    backgroundColor: 'white'
  },
  InputOutline: {
    borderWidth: 1,
    borderColor: '#86cacb',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
    backgroundColor: 'white'
  },
  InputOutlineGender: {
    borderWidth: 1,
    borderColor: '#86cacb',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '2%',
    marginTop: '0%',
    marginLeft: '20%',
    marginRight: '20%',
    marginBottom: '4%',
    backgroundColor: 'white'
  },
  InputLabelFirstRow: {
    borderWidth: 0,
    borderColor: 'black',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: '5%',
    justifyContent: 'center',
    height: 40
  },
  InputLabelContainerSecondRow: {
    borderWidth: 0,
    borderColor: 'black',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: '1%',
    justifyContent: 'center',
    height: 40
  },
  InputLabelSecondRowLeft: {
    borderWidth: 0,
    borderColor: 'green',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: '4%'
  },
  InputLabelSecondRowRight: {
    borderWidth: 0,
    borderColor: 'blue',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  InputLabelThirdRow: {
    borderWidth: 0,
    borderColor: 'black',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '5%',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100
  },
  ThirdInputRowIconContainer: {
    borderWidth: 0,
    borderColor: 'orange',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: '4%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 154,
    width: undefined
  },
  ChildButtonArea: {
    borderWidth: 0,
    borderColor: 'blue',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '0%',
    backgroundColor: 'white'
  },
  ChildButtonContainer: {
    borderWidth: 0,
    borderColor: 'red',
    flex: 1,
    flexDirection: 'column',
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '4%',
    paddingRight: '4%',
    width: '100%'
  },
  ChildButtonOutline: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#86cacb',
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: '3%',
    paddingBottom: '3%',
    justifyContent: 'space-between'
  },
  ChildButtonLabel: {
    borderWidth: 0,
    borderColor: 'green',
    flex: 1,
    flexDirection: 'row',
    flexBasis: '21%',
    justifyContent: 'center',
    paddingLeft: '2%',
    paddingRight: '2%'
  },
  ChildButtonSummary: {
    borderWidth: 0,
    borderColor: 'black',
    flex: 1,
    flexDirection: 'row',
    flexBasis: '38%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '2%',
    paddingRight: '2%'
  },
  ChildButtonValue: {
    borderWidth: 0,
    borderColor: 'blue',
    flex: 1,
    flexDirection: 'row',
    flexBasis: '29%',
    justifyContent: 'center'
  },
  Footer: {
    borderTopWidth: 2,
    borderColor: '#bfbfbf',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
    backgroundColor: '#dddddd'
  },
  TextLarge: {
    paddingRight: '5%',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  TextMedium: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black'
  },
  TextSmall: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black'
  },
  TextSmallLight: {
    fontSize: 10,
    color: '#353535'
  },
  TextEntryArea: {
    borderWidth: 0,
    borderColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },
  TextInput: {
    textAlign: 'left',
    height: 40,
    width: 75,
    borderWidth: 0,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#e8e8e8',
    margin: '2%',
    padding: '2%'
  },
  ScrollContent: {
    backgroundColor: '#F6F3E7'
  }
})
