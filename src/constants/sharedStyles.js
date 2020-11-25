import colors from './colors';
import fonts from './fonts';
import gStyle from './gStyle';

export default {
  // Text
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
  textLightGray14: {
    fontSize: 14,
    color: colors.lightGray,
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

  // Buttons
  buttonSmall: {
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 80,
    borderRadius: 30 / 2,
  },

  // Containers
  logoTextLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  // Elements
  statusCircle: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    borderWidth: 1.5,
    borderColor: colors.lightGray,
  },
  statusOnline: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    borderWidth: 1.5,
    borderColor: colors.green,
    backgroundColor: colors.green,
  },
};
