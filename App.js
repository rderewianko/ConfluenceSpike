import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, WebView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { getPage } from './APIFunctions';

class HomeScreen extends Component {
  state={
    htmlString: 'loading...'
  }

  componentWillMount() {
    getPage().then(response => {
       if (response.ok) {
           this.setState({ htmlString: response.data.body.view.value });
       }
     })
  }

  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state.htmlString)
    return (
        <WebView
          source={{html: this.state.htmlString, baseUrl: ''}}
          scalesPageToFit={true}
          style={{marginTop: 20, flex: 1}}
        />
    );
  }
}

class PageListScreen extends React.Component {
  static navigationOptions = {
    title: 'Confluence Pages',
  };
  render() {
    return (
      <View>
        <Text>Confluence Pages</Text>
      </View>
    );
  }
}

export const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  List: { screen: PageListScreen },
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
