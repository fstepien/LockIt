import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import Geocoder from "react-native-geocoding";

import NewLocationForm from "./NewLocationForm";
import navStyles from "../styles/navStyles";

Geocoder.init("AIzaSyBUbheD2zoRHgW4FjggoXlLhlSjL3n1A2Y");

class NewLocation extends Component {
  state = {
    loading: false
  };
  static navigationOptions = {
    title: "Set Home Location",
    ...navStyles
  };

  newLocation = async ({ address }) => {
    this.setState({ loading: true });
    const { newLocation, navigation } = this.props;
    let location;
    await Geocoder.from(address)
      .then(json => {
        location = json.results[0].geometry.location;
      })
      .catch(error => console.warn(error));
    // let lat = "43.649165";
    // let long = "-79.397644";
    // console.log(location);
    newLocation({
      variables: {
        lat: location.lat,
        long: location.lng
      }
    })
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  render() {
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <NewLocationForm onSubmit={this.newLocation} />
        )}
      </View>
    );
  }
}

const newLocation = gql`
  mutation newLocation($lat: Float!, $long: Float!) {
    createLocation(lat: $lat, long: $long) {
      id
    }
  }
`;

export default graphql(newLocation, {
  name: "newLocation",
  options: {
    refetchQueries: ["locationQuery"]
  }
})(NewLocation);
