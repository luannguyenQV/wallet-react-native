import React, { Component } from 'react';
import { View, FlatList, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { cardDismiss, cardRestoreAll } from './../redux/actions';

// import { AreaChart, Grid } from 'react-native-svg-charts';
// import * as shape from 'd3-shape';

import { Card, Button, CustomImage, View as MyView } from './common';
import { themeColorsSelector } from '../redux/reducers/ConfigReducer';
import { companyConfigSelector } from '../redux/sagas/selectors';
import { userProfileSelector } from '../redux/reducers/UserReducer';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HomeCards extends Component {
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

  renderCards() {
    const { profile, company_config, dismissedCards, colors } = this.props;
    const cardConfig = company_config.cards ? company_config.cards.home : null;
    // add welcome card
    let cards = [];
    let i = 0;
    const company = company_config.company ? company_config.company : null;
    // console.log(company);
    if (cardConfig) {
      if (
        cardConfig.general.welcome &&
        (!dismissedCards || !dismissedCards.includes('welcome'))
      ) {
        cards[i++] = {
          id: 'welcome',
          title:
            'Welcome to ' + (company && company.name ? company.name : 'Rehive'),
          // description: 'A multi-currency wallet built on the Rehive platform.',
          image: 'card1',
          dismiss: true,
        };
      }

      if (cardConfig.general.verified && profile.data.verified) {
        cards[i++] = {
          id: 'verify',
          description: 'Please verify your account',
          image: 'card2',
          actionLabel: 'GET VERIFIED',
          navigate: 'GetVerified',
        };
      }
      const customCards = cardConfig.custom;
      if (customCards) {
        for (let j = 0; j < customCards.length; j++) {
          if (!dismissedCards || !dismissedCards.includes(customCards[j].id)) {
            cards[i++] = customCards[j];
          }
        }
      }
    }

    return (
      <FlatList
        // refreshControl={
        //   <RefreshControl
        //     refreshing={loadingData}
        //     onRefresh={() => fetchData(type)}
        //   />
        // }
        contentContainerStyle={{ backgroundColor: colors.grey2 }}
        keyboardShouldPersistTaps="always"
        data={cards}
        renderItem={({ item }) => this.renderCard(item)}
        keyExtractor={item => (item.id ? item.id.toString() : null)}
        ListFooterComponent={this.renderFooter()}
      />
    );
  }

  renderCard(item) {
    const { colors } = this.props;
    const { textStyleContent } = styles;
    return (
      <Card
        key={item.id}
        title={item.title}
        renderHeader={
          <CustomImage
            name={item.image}
            backgroundColor={'header'}
            padding={8}
          />
        }
        onPressActionOne={() =>
          item.navigate
            ? this.props.navigation.navigate(item.navigate)
            : item.dismiss ? this.props.cardDismiss(item.id) : null
        }
        textActionOne={
          item.actionLabel ? item.actionLabel : item.dismiss ? 'DISMISS' : ''
        }>
        {item.description ? (
          <Text style={[textStyleContent, { color: colors.font }]}>
            {item.description}
          </Text>
        ) : null}
      </Card>
    );
  }

  renderFooter() {
    const { dismissedCards, cardRestoreAll } = this.props;
    const { viewStyleFooter } = styles;
    if (dismissedCards && dismissedCards.length > 0) {
      return (
        <View style={viewStyleFooter}>
          <Button
            label="RESTORE ALL"
            color="secondary"
            type="text"
            onPress={cardRestoreAll}
            backgroundColor="transparent"
          />
        </View>
      );
    }
  }

  render() {
    return <MyView>{this.renderCards()}</MyView>;
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    zIndex: 2,
  },
  imageStylePhoto: {
    width: SCREEN_WIDTH - 16,
    height: 120,
  },
  textStyleContent: {
    fontSize: 16,
    padding: 8,
    paddingHorizontal: 16,
    lineHeight: 22,
  },
  viewStyleFooter: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const mapStateToProps = state => {
  const { dismissedCards } = state.user;
  return {
    company_config: companyConfigSelector(state),
    profile: userProfileSelector(state),
    dismissedCards,
    colors: themeColorsSelector(state),
  };
};

export default connect(mapStateToProps, { cardDismiss, cardRestoreAll })(
  HomeCards,
);
