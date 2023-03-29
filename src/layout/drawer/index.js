import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import DrawerDesktop from "./DrawerDesktop";
import DrawerMobile from "./DrawerMobile";

export default function Drawer() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {matches ? <DrawerMobile matches={matches}/> : <DrawerDesktop matches={matches}/>}
    </>
  );
}