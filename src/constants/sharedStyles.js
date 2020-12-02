import colors from './colors';
import fonts from './fonts';
import gStyle from './gStyle';

export default {
  // Text
  text12: {
    fontSize: 12,
  },
  textBold20: {
    fontSize: 20,
    fontWeight: '700',
  },
  textLightGray12: {
    fontSize: 12,
    color: colors.lightGray,
  },
  textLightGray14: {
    fontSize: 14,
    color: colors.lightGray,
  },
  textLightGray16: {
    fontSize: 16,
    color: colors.lightGray,
  },
  textGray: {
    color: colors.gray9,
  },
  textWhite12: {
    fontSize: 12,
    color: colors.white,
  },
  textWhite20: {
    fontSize: 20,
    fontWeight: '600',
  },
  textWhiteBold12: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  textWhiteBold20: {
    fontSize: 20,
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
  textInput: {
    borderWidth: 1,
    borderColor: colors.gray4,
    padding: 15,
    borderRadius: 8,
  },
  settingsSection: {
    borderBottomColor: colors.gray4,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
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
