export const Colors = {
  dart0: "#121923",
  dart1: "#232832",
  dart2: "#282E39",
  dart3: "#2F3744",
  gray0: "#CCD6E3",
  gray1: "#AAB4C3",
  gray2: "#9EA8B8",
  gray3: "#6D7583",
  gray4: "#676E7A",
  blue: "#3A64D5",
  orange: "#FF8701",
  green: "#70D36B",
  yellow: "#F3DB40",
  red: "#FF5D54",
  skyblue: "#49BBF8",
} as const;
export const Theme = {
  background: Colors.dart1,
  primary: Colors.blue,
  secundary: Colors.dart0,
  tertiary: Colors.dart2,
  quatary: Colors.dart3,
  navActive: Colors.blue,
  navColor: Colors.gray0,
  navHover: Colors.skyblue,

  badGrade: Colors.red,
  halfGrade: Colors.yellow,
  goodGrade: Colors.green,
  noneGrade: Colors.gray0,
  fontFamily: "inter",
  h2: {
    fontSize: "36px",
  },
  h3: {
    fontSize: "24px",
  },
  h4: {
    fontSize: "18px",
  },
  grageColor: Colors.blue,
  textColor: Colors.gray0,
} as const;
