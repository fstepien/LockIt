import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default class NewLocationForm extends Component {
  state = {
    address: ""
  };
  submitForm = () => {
    this.props.onSubmit({
      address: this.state.address
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.address}
          onChangeText={address => this.setState({ address })}
          value={this.state.address}
          placeholder="Enter New Address"
        />
        <Button title="Save Location" onPress={this.submitForm} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  address: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10
  }
});
