import React, { Component } from "react";
import { Text, View, FlatList, Button, StyleSheet } from "react-native";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import geolib from "geolib";
import { Icon } from "native-base";

import navStyles from "../styles/navStyles";

class LockWatch extends Component {
  state = {
    currentLat: "",
    currentLong: "",
    tracking: false,
    watchId: "",
    distance: 0
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchID);
  }

  stopTracking = () => {
    navigator.geolocation.clearWatch(this.state.watchID);
    this.setState({ tracking: false });
  };

  checkDistance = currentCoords => {
    let distance = geolib.getDistance(
      {
        latitude: Number(this.props.allLocations[0].lat),
        longitude: Number(this.props.allLocations[0].long)
      },
      currentCoords
    );
    this.setState({ distance });
  };

  startWatch = () => {
    let watchID = navigator.geolocation.watchPosition(
      position => {
        console.log(position);
        this.checkDistance(position.coords);
        this.setState({
          currentLat: position.coords.latitude,
          currentLong: position.coords.longitude,
          error: null,
          tracking: true
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
    console.log(watchID);
    this.setState({ watchID });
    // const homeLat = this.props.allLocations[0].lat;
    // const homeLong = this.props.allLocations[0].long;
  };

  static navigationOptions = {
    title: "Monitor ON/OFF",
    ...navStyles
  };

  render() {
    const { loading, allLocations } = this.props;
    if (loading) return null;
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 20 }}>
          Home Coordinates: lat: {allLocations[0].lat} long:{
            allLocations[0].long
          }
        </Text>
        {this.state.tracking && (
          <Text style={{ marginBottom: 20 }}>
            Current Coordinates: lat: {this.state.currentLat} long:{
              this.state.currentLong
            }
          </Text>
        )}
        {!this.state.tracking && (
          <Button
            title="Start LockIt Monitoring"
            color="lightgreen"
            onPress={this.startWatch}
          />
        )}
        {this.state.tracking && (
          <Text style={styles.distance}>
            {this.state.distance} m from <Icon name="home" />
          </Text>
        )}
        {this.state.tracking && (
          <Button
            title="STOP TRACKING"
            color="red"
            onPress={this.stopTracking}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: "100%",
    padding: 20,
    // flexDirection: "row",
    justifyContent: "flex-end"
  },
  distance: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20
  }
});

const locationQuery = gql`
  query locationQuery {
    allLocations(orderBy: createdAt_DESC) {
      lat
      long
    }
  }
`;

export default graphql(locationQuery, {
  //destructure to get props withouot the data
  props: ({ data }) => ({ ...data })
})(LockWatch);
