import React from "react";
import { createStackNavigator } from "react-navigation";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

import Post from "./components/Post";
import Posts from "./components/Posts";
import NewLocation from "./components/NewLocation";
import LockWatch from "./components/LockWatch";
import navStyles from "./styles/navStyles";

class Home extends React.Component {
  static navigationOptions = {
    title: "Home",
    ...navStyles
  };

  goToPost = () => {
    this.props.navigation.navigate("Post");
  };

  setLocation = () => {
    this.props.navigation.navigate("Location");
  };

  watchLock = () => {
    this.props.navigation.navigate("LockWatch");
  };

  render() {
    //   const { loading, navigation, allLocations } = this.props;
    return (
      <View style={styles.container}>
        {/* Passing in all props, specifically need navigation */}
        <Posts {...this.props} />
        <View>
          <LockWatch />
          <TouchableHighlight
            style={styles.setLocation}
            onPress={this.setLocation}
          >
            <Text style={styles.setLocationText}> Set Home Location</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  lockWatch: {
    backgroundColor: "lightgreen",
    padding: 20
  },
  setLocation: {
    backgroundColor: "#f0f7be",
    padding: 20
  },
  setLocationText: {
    fontSize: 20,
    textAlign: "center"
  }
});

export default createStackNavigator({
  Home: {
    screen: Home
  },
  Post: {
    screen: Post
  },
  Location: {
    screen: NewLocation
  }
  // LockWatch: {
  //   screen: LockWatch
  // }
});
