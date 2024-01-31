export const palette = {
  dark: {
    20: "#c6c6c6",
    40: "#7A7E80",
    60: "#464A4D",
    80: "#161719",
    100: "#0D0E0F",
  },
  light: {
    20: "#E3E5E5",
    40: "#F2F4F5",
    60: "#F7F9FA",
    80: "#FBFBFB",
    100: "#FFFFFF",
  },
  violet: {
    20: "#EEE5FF",
    40: "#D3BDFF",
    60: "#B18AFF",
    80: "#8F57FF",
    100: "#7F3DFF",
  },
  red: {
    20: "#FDD5D7",
    40: "#FDA2A9",
    60: "#FD6F7A",
    80: "#FD5662",
    100: "#FD3C4A",
  },
  green: {
    20: "#CFFAEA",
    40: "#93EACA",
    60: "#65D1AA",
    80: "#2AB784",
    100: "#00A86B",
  },
  yellow: {
    20: "#FCEED4",
    40: "#FCDDA1",
    60: "#FCCC6F",
    80: "#FCBB3C",
    100: "#FCAC12",
  },
  blue: {
    20: "#BDDCFF",
    40: "#8AC0FF",
    60: "#57A5FF",
    80: "#248AFF",
    100: "#0077FF",
  },
};

export default {
  text: palette.light[80],
  background: "rgb(20, 19, 50)",
  border: palette.light[20],
  tint: palette.blue[80],
  tabBarColor: "#1d1d41",
  tabIconDefault: palette.dark[20],
  tabIconSelected: palette.blue[100],
};
