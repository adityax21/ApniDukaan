import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import useMediaQuery from "@mui/material/useMediaQuery";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=FontName&display=swap"
/>

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="50px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="90%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" },
          fontSize : "16px",
          fontFamily: "'FontName', sans-serif",
          padding : "5px 20px",
          backgroundColor : "white",
          }}
          borderRadius = "25px"
          color={shades.secondary[500]}
        >
          {isNonMobile ? (<text>ApniDukaan : <i> Dil se Shopping ♡ </i> </text> ) :(<text>ApniDukaan ♡ </text>)}
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: "black", backgroundColor : "white" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "black" , backgroundColor : "white"}}>
            <PersonOutline />
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" , backgroundColor : "white"}}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: "black", backgroundColor : "white"}}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
