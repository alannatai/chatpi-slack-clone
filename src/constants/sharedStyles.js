import colors from './colors';
import fonts from './fonts';
import gStyle from './gStyle';

export default {
  textWhite20: {
    ...gStyle.textLarsBold20,
    color: colors.white,
  },
  textWhiteBold20: {
    ...gStyle.textLarsBold20,
    color: colors.white,
    fontWeight: '600',
  },
};
