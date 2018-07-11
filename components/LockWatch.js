import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

class LockWatch extends Component {
  render() {
    const { loading, allLocations } = this.props;
    if (loading) return null;
    return (
      <View>
        <FlatList
          data={allLocations}
          renderItem={({ item }) => (
            <Text>
              Home Coords: lat: {item.lat} long: {item.long}
            </Text>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const locationQuery = gql`
  query locationQuery {
    allLocations {
      lat
      long
    }
  }
`;

export default graphql(locationQuery, {
  //destructure to get props withouot the data
  props: ({ data }) => ({ ...data })
})(LockWatch);
