import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  statisticsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  cardShowWrapper: {
    marginTop: 20
  },
  cardImageWrapper: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').height - 200,
  },
  cardImage: {
    width: '100%',
    flex: 1,
    resizeMode: 'contain'
  },
  predButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  downButton: {
    padding: 20,
    margin: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    overflow: 'hidden'
  },
  upButton: {
    padding: 20,
    margin: 10,
    backgroundColor: 'green',
    borderRadius: 10,
    overflow: 'hidden'
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

});

export { styles }
