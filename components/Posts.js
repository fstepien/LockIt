import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

class Posts extends Component {
  render() {
    const { loading, allPosts, navigation, allLocations } = this.props;
    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <View>
        <FlatList
          data={allPosts}
          renderItem={({ item }) => (
            <React.Fragment>
              <Text
                onPress={() => {
                  navigation.navigate("Post", {
                    id: item.id,
                    title: item.title
                  });
                }}
              >
                {item.title}
              </Text>
              <Text
                onPress={() => {
                  navigation.navigate("Post", {
                    id: item.id,
                    title: item.title
                  });
                }}
              >
                {item.title}
              </Text>
            </React.Fragment>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const postsQuery = gql`
  query postQuery {
    allPosts {
      id
      title
      body
    }
  }
`;

export default graphql(postsQuery, {
  //destructure to get props withouot the data
  props: ({ data }) => ({ ...data })
})(Posts);
