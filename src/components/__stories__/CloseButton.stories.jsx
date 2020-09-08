import React from 'react';

import { storiesOf } from '@storybook/react-native';
import CloseButton from '../CloseButton';
import { MockWithPadding } from 'utils/testing/Mock';

export const Basic = () => (
  <MockWithPadding appearance="outline">
    <CloseButton />
  </MockWithPadding>
);

storiesOf('CloseButton', module).add('basic', Basic);
