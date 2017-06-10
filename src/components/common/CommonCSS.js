import { PixelRatio, Platform, StyleSheet } from 'react-native';

export default {
  cardStyle: {
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },

  cardSectionStyle: {
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    opacity: 0.8
  },

  upload: {
    width: 180,
    height: 100,
  },

  errorTextStyle: {
    fontSize: 12,
    color: 'red'
  },

  loginFormMainBodyCardStyle: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    alignItems: 'stretch'
  },

  loginFormLogoCardSectionStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },

  loginFormContentsCardSectionStyle: {
    flex: 2,
    flexDirection: 'column',
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'stretch',
  },

  buttonTextStyle: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 13,
    fontWeight: '700',
    paddingTop: 5,
    paddingBottom: 5
  },

  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#87cefa',
    marginLeft: 5,
    marginRight: 5
  },

  textStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#000',
    fontFamily: 'Times New Roman'
  },

  logInputStyle: {
    color: '#000000',
    paddingRight: 5,
    paddingLeft: 20,
    fontSize: 20,
    lineHeight: 23,
    height: 40,
    flex: 2,
    //borderBottomWidth: 1,
    borderColor: '#000',
    fontFamily: 'Times New Roman'
  },

  inputStyle: {
    color: '#000000',
    paddingRight: 5,
    paddingLeft: 20,
    fontSize: 20,
    lineHeight: 23,
    height: 40,
    flex: 2,
    borderBottomWidth: 1,
    borderColor: '#000',
    fontFamily: 'Times New Roman'
  },

  labelStyle: {
    color: '#000000',
    fontSize: 18,
    paddingLeft: 20,
    flex: 2,
    fontFamily: 'Times New Roman',
    lineHeight: 30,
    height: 40
  },

  inputContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  mulInputStyle: {

    color: '#000',
    paddingRight: 5,
    paddingLeft: 20,
    fontSize: 18,
    lineHeight: 60,
    height: 80,
    flex: 2,
    borderBottomWidth: 1,
    borderColor: '#fff'
    },

  mulInpcontainerStyle: {
    //height: 80,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerStyle: {
    backgroundColor: '#87cefa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //justifyContent: 'flex-start',
    //alignItems: 'center',
    height: 40,
    paddingTop: 8
  },

  imageStyle: {
    width: 50,
    height: 50,
  //  resizeMode: 'contain',
    alignSelf: 'flex-end'
  },

  hamStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'flex-end'
  },

  logoStyle: {
    width: 80,
    height: 30,
    resizeMode: 'contain',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartStyle: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  searchStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  emailNpwdIconStyle: {
    paddingLeft: 10,
    alignSelf: 'center'
  },

  selContainerStyle: {
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative',
    opacity: 0.7
  },

  uploadContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },

  uploadLabelStyle: {
    color: '#000000',
    fontSize: 18,
    paddingLeft: 20,
    fontFamily: 'Times New Roman',
    lineHeight: 23,
    height: 30
  },

  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  prdContainerStyle: {
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    position: 'relative'
  },

  prdLabelStyle: {
    color: '#000000',
    fontSize: 18,
    paddingLeft: 20,
    fontFamily: 'Times New Roman',
    lineHeight: 23,
    height: 30
  },

  container: {
   flex: 1,
   paddingTop: Platform.OS === 'ios' ? 20 : 0,
   backgroundColor: '#fff'
 },

 item: {
    flex: 1,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    overflow: 'hidden'
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  MenuContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  MenuButton: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },

  searchImg: {
    width: 20,
    height: 70,
  },

  spinnerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },

  spinnerBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

   chatImageStyle: {
     width: 30,
     height: 30,
     resizeMode: 'contain',
     alignSelf: 'flex-start'
   },

   titleStyle: {
     fontSize: 18,
     color: '#ddd',
     paddingLeft: 15
   },

   pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }

};
