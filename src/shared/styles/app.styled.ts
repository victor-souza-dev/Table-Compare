import { SxProps } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const buttonSx: SxProps = {
  color: "white",
  textTransform: "none",
  backgroundColor: deepPurple[500],
  "&:hover": {
    backgroundColor: deepPurple[500],
  },
};

const iconButtonSx: SxProps = {
  width: "6em",
  transition: "filter 300ms",
  padding: "1em",
  margin: "0 10px",
  willChange: "filter",
  "&:focus": { outline: "none" },
};

const AppStyles = { LogoButton: iconButtonSx, Button: buttonSx };

export default AppStyles;
