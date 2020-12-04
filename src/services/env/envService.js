import { map } from 'ramda';

import uuidv1 from 'uuid/v1';
import { activateKeepAwake } from 'expo-keep-awake';

import config from '../../config.json';
import configProd from '../../config.production.json';

const handleRandomValues = (v) => {
  if (v === 'randomEmail') {
    return `hello+${uuidv1().split('-')[0]}@gmail.com`;
  }
  return v;
};

export default {
  init() {
    if (__DEV__) {
      activateKeepAwake();
    }
  },
  getConfig() {
    if (__DEV__) {
      return config;
    }
    return configProd;
  },
  getDefaultValues(k) {
    if (!this.getConfig()?.useDefaultValues) {
      return {};
    }
    return map(
      (v) => handleRandomValues(v),
      this.getConfig()?.defaultValues?.[k] || {},
    );
  },
};
