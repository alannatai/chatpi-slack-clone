import colors from './colors';
import fonts from './fonts';
import gStyle from './gStyle';

export default {
  text12: {
    fontSize: 12,
  },
  text14: {
    fontSize: 14,
  },
  textBold20: {
    fontSize: 20,
    fontWeight: '700',
  },
  textGray: {
    color: colors.gray,
  },
  textWhite12: {
    color: colors.white,
    fontSize: 12,
  },
  textWhiteBold12: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  textWhite14: {
    color: colors.white,
    fontSize: 14,
  },
  textWhiteBold14: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  textWhite16: {
    color: colors.white,
    fontSize: 16,
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
