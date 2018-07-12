import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Form, Item, Input, Label } from "native-base";

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
      <Form style={styles.container}>
        <Item floatingLabel>
          <Label>Enter New Address</Label>
          <Input
            style={styles.address}
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
          />
        </Item>
        <Button
          title="Save Location"
          style={{ marginTop: 20 }}
          onPress={this.submitForm}
        />
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  address: {
    // height: 40,
    // borderColor: "black",
    // borderWidth: 1,
    // marginBottom: 20,
    // padding: 10
  }
});
