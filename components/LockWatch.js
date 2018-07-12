import React, { Component } from "react";
import {
  Text,
  View,
  Alert,
  Button,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import geolib from "geolib";
import { Form, Item, Input, Label, Icon } from "native-base";

class LockWatch extends Component {
  state = {
    currentLat: "",
    currentLong: "",
    tracking: false,
    watchId: "",
    distance: 0,
    alertDistance: 10
  };

  componentWillUnmount() {
    this.stopTracking();
  }

  stopTracking = () => {
    clearInterval(this.interval);
    navigator.geolocation.clearWatch(this.state.watchID);
    this.setState({ tracking: false });
  };

  startWatch = () => {
    this.interval = setInterval(() => this.watch(), 1000);
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

  watch = () => {
    let watchID = navigator.geolocation.watchPosition(
      position => {
        console.log(position);
        this.checkDistance(position.coords);
        this.setState(
          {
            currentLat: position.coords.latitude,
            currentLong: position.coords.longitude,
            error: null,
            tracking: true
          },
          this.alert()
        );
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: Infinity, maximumAge: 0 }
    );
    console.log(watchID);

    this.setState({ watchID });
  };

  alert = () => {
    this.state.distance > this.state.alertDistance &&
      Alert.alert(
        "Lock Your Door",
        `You are ${this.state.distance}m from home`,
        [
          {
            text: "Locked it!",
            onPress: () => {
              this.stopTracking();
              console.log("confimed lock");
            }
          },
          { text: "Cancel", onPress: () => console.log("canceled") }
        ]
      );
  };
  render() {
    const { loading, allLocations } = this.props;
    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    if (allLocations.length < 1)
      return (
        <View style={styles.container}>
          <Text>No Home Coordinates Entered</Text>
        </View>
      );
    return (
      <View style={styles.container}>
        {!this.state.tracking && (
          <Form style={styles.container}>
            <Item floatingLabel>
              <Label>Enter Alert Distance from Home</Label>
              <Input
                keyboardType="numeric"
                onChangeText={alertDistance =>
                  this.setState({ alertDistance: Number(alertDistance) })
                }
                placeholder="0"
                value={String(this.state.alertDistance)}
              />
            </Item>
          </Form>
        )}
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
            onPress={() => this.startWatch()}
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
