import colors from './colors';
import fonts from './fonts';
import gStyle from './gStyle';

export default {
  text12: {
    fontSize: 12,
  },
  textBold20: {
    fontSize: 20,
    fontWeight: '700',
  },
  textGray: {
    color: colors.gray,
  },
  textWhite20: {
    ...gStyle.textLarsBold20,
  },
  textWhiteBold20: {
    ...gStyle.textLarsBold20,
    color: colors.white,
    fontWeight: '600',
  },
};
