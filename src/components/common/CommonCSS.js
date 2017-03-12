import { PixelRatio } from 'react-native';

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
    opacity: 0.7
  },

  upload: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },

  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red'
  },

  cardSeccontainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60
  },

  buttonTextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },

  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    //backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5
  },

  textStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Cochin'
  },

  inputStyle: {
    color: '#fff',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    borderBottomWidth: 1,
    borderColor: '#fff'
    //backgroundColor: '#fff'
  },

  labelStyle: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 20,
    flex: 2,
    fontFamily: 'Cochin',
    lineHeight: 23,
    height: 40
  },

  inputContainerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  mulInputStyle: {
    color: '#fff',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 60,
    flex: 2,
    //backgroundColor: '#fff'
  },

  mulInpcontainerStyle: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 60,
    paddingTop: 15,
  },

  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'flex-end'
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
    color: '#000',
    fontSize: 18,
    paddingLeft: 20,
    fontFamily: 'Cochin',
    lineHeight: 23,
    height: 30,
    backgroundColor: '#fff'
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
    color: '#000',
    fontSize: 18,
    paddingLeft: 20,
    fontFamily: 'Cochin',
    lineHeight: 23,
    height: 30
  }

};
