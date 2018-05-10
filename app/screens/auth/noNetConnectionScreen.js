import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
} from 'react-native';
import Colors from './../../config/colors';
import NetInfo from './../../util/checkNetConnection';
import { Button } from './../../components/common';

class NoNetConnectionScreen extends Component {
  static navigationOptions = {
    title: 'Connection',
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
      }),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('./../../../assets/icons/new_logo.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.text}>Lost Connection</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            label="TRY AGAIN"
            onPress={() => {
              NetInfo.getInfo().then(isConnected => {
                if (isConnected) {
                  this.props.navigation.goBack();
                }
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    maxWidth: 250,
    height: 150,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'center',
    paddingVertical: 25,
  },
  button: {
    backgroundColor: Colors.lightblue,
    height: 50,
    borderRadius: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  textContainer: {
    backgroundColor: Colors.lightgray,
    paddingHorizontal: 25,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    color: Colors.lightgray,
  },
});

export default NoNetConnectionScreen;
