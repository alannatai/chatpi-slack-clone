import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../components/Button';
import { StylePropType } from '../utils/types';

const style = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionButton: {
    marginVertical: 17,
  },
  scrollView: {
    paddingVertical: 20,
  },
};

export default function OnboardingView({
  ImageComponent,
  BeforeImageComponent,
  AfterImageComponent,
  AfterActionComponent,
  ...props
}) {
  const ContainerView = props.disableScroll ? View : ScrollView;
  return (
    <ContainerView style={[style.scrollView, props.containerStyle]}>
      <View style={[style.container, { paddingHorizontal: 20 }]}>
        {BeforeImageComponent && <BeforeImageComponent />}
        {ImageComponent && <ImageComponent />}
        {AfterImageComponent && <AfterImageComponent />}
        <View
          style={[
            {
              paddingVertical: 20,
              paddingHorizontal: 20,
              width: '100%',
            },
          ]}
        >
          {props.onActionPress && (
            <Button
              buttonStyle={style.actionButton}
              onPress={props.onActionPress}
            >
              {props.actionMsg}
            </Button>
          )}
          {AfterActionComponent && <AfterActionComponent />}
        </View>
      </View>
    </ContainerView>
  );
}

OnboardingView.propTypes = {
  onActionPress: PropTypes.func,
  disableScroll: PropTypes.bool,
  actionMsg: PropTypes.string,

  BeforeImageComponent: PropTypes.func,
  ImageComponent: PropTypes.func,
  AfterImageComponent: PropTypes.func,
  AfterActionComponent: PropTypes.func,
  containerStyle: StylePropType,
};
