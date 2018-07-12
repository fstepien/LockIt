import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, Body, Right, Icon } from "native-base";
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
        <List>
          <FlatList
            data={allPosts}
            renderItem={({ item }) => (
              <ListItem>
                <Body>
                  <Text
                    style={{ fontWeight: "bold" }}
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
                    {item.body}
                  </Text>
                </Body>
                <Right>
                  <Icon
                    name="arrow-forward"
                    onPress={() => {
                      navigation.navigate("Post", {
                        id: item.id,
                        title: item.title
                      });
                    }}
                  />
                </Right>
              </ListItem>
            )}
            keyExtractor={item => item.id}
          />
        </List>
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
