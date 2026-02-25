import { StyleSheet } from 'react-native';

// TODO 
// use them for theme 
// --theme-main-color: #ffbb33;
// --theme-main-color-hover: #ffaa00;
// --theme-light-color: #f9e79f;
// --white-color: #ffffff;
// --red-color: #ff4d4d;
// --green-color: #00cc00;
// --black-color: #394046;
// --dark-black-color: #1a1a1a;
// --darker-black-color: #4d4d4d;
// --gray-color: #6f6f6f;
// --bg-main: #443322;
// --timeline-color: #006E51;
// --timeline-bg: #F6D155;


export const appThemeColor = 'orange'; // import from theme 
export const themeLightColor = '#f9e79f';
export const blackColor = '#1a1a1a';

export const GAPS = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};


export const containers = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWithIconButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  form: {
    marginTop: 20,
    marginBottom: 150,
    width: '100%',
    alignItems: 'center',
  },
  inputWr: {
    minWidth: 250,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    borderColor: 'orange',
    borderStyle: 'solid',
    borderRadius: 10,
  },
  passContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 50,
    elevation: 5,
  },
  inlineLinkContainer: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 20,
  },
})

export const commonStyles = StyleSheet.create({
  themedButtonWithIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: GAPS.sm,
    backgroundColor: appThemeColor,
    color: blackColor,
    borderRadius: 10,
    margin: 12,
    padding: 10,
    minWidth: 190,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 20,
  },
  inputPass: {
    flex: 1,
    height: 50,
  },
  iconPass: {
    paddingLeft: 10,
  },
  headerImage: {
    height: "100%",
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  title: {
    alignSelf: 'center',
  },
// TODO 

  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontWeight: 'bold',
  }
});


export const commonFlexStyles = StyleSheet.create({
  // For container elements
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  // For child elements
  grow: {
    flex: 1,
  },
  noGrow: {
    flex: 0,
  },
  // Alignment
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
});