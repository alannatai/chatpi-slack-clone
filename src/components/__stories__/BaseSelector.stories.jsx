import React from 'react';

import { storiesOf } from '@storybook/react-native';
import BaseSelector from '../BaseSelector';
import { MockWithPadding } from 'utils/testing/Mock';

export const Basic = () => (
  <MockWithPadding appearance="outline">
    <BaseSelector />
  </MockWithPadding>
);

storiesOf('BaseSelector', module).add('basic', Basic);
