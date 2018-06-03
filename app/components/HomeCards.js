import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';

// import { AreaChart, Grid } from 'react-native-svg-charts';
// import * as shape from 'd3-shape';

import { CardContainer, Card } from './common';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HomeCards extends Component {
  renderTransactions() {
    const { transactions, loading } = this.state;
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => this.getTransactions(this.props.currencyCode)}
          />
        }
        data={transactions}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={item => item.id}
        ListEmptyComponent={this.renderEmptyList()}
      />
    );
  }

  // renderChart() {
  //   const data = [
  //     50,
  //     10,
  //     40,
  //     95,
  //     -4,
  //     -24,
  //     85,
  //     91,
  //     35,
  //     53,
  //     -53,
  //     24,
  //     50,
  //     -20,
  //     -80,
  //   ];

  //   return (
  //     <AreaChart
  //       style={{ height: 200 }}
  //       data={data}
  //       contentInset={{ top: 30, bottom: 30 }}
  //       curve={shape.curveNatural}
  //       svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}>
  //       <Grid />
  //     </AreaChart>
  //   );
  // }

  renderImage(image) {
    return <Image style={styles.imageStylePhoto} source={image} />;
  }

  render() {
    const { textStyleContent } = styles;

    return (
      <CardContainer>
        <Card
          key={0}
          title="Welcome to Rehive"
          renderHeader={this.renderImage(
            require('./../../assets/icons/card1.png'),
          )}
          // image={require()}
          // textActionOne="Cool"
          style="secondary">
          <Text style={textStyleContent}>
            Let's get you started with setting up your wallet!
          </Text>
        </Card>
        <Card
          key={1}
          // title="Please verify your account"
          renderHeader={this.renderImage(
            require('./../../assets/icons/card2.png'),
          )}
          // image={require()}
          textActionOne="GET VERIFIED"
          onPressActionOne={() => this.props.navigation.navigate('GetVerified')}
          style="secondary">
          <Text style={textStyleContent}>Please verify your account</Text>
        </Card>
        {/* <Card
          key={2}
          // title="Chart example"
          renderHeader={this.renderChart()}
          // image={require()}
          textActionOne="Awesome"
          style="secondary">
          <Text style={textStyleContent}>
            We can even include charts of your data
          </Text>
        </Card> */}
      </CardContainer>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    // padding: 8,
  },
  imageStylePhoto: {
    width: SCREEN_WIDTH - 16,
    height: 150,
  },
  viewStyleName: {
    paddingVertical: 12,
  },
  textStyleContent: {
    fontSize: 16,
    padding: 8,
    fontWeight: 'bold',
  },
};

export default HomeCards;
