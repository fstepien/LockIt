import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

import NewLocationForm from "./NewLocationForm";
import navStyles from "../styles/navStyles";

class NewLocation extends Component {
  state = {
    loading: false
  };
  static navigationOptions = {
    title: "Set Home Location",
    ...navStyles
  };

  newLocation = ({ address }) => {
    let lat = "43.649165";
    let long = "-79.397644";
    const { newLocation, navigation } = this.props;
    this.setState({ loading: true });
    newLocation({
      variables: {
        lat,
        long
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
  mutation newLocation($lat: String!, $long: String!) {
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
