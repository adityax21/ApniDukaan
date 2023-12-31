import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

//Item has two props : item , width
const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  const { category, price, name, image } = item.attributes;
  const { //url extraction 
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  return (
    <Box width={width}
      sx = {{
        backgroundColor : "white",
      }}
      borderRadius = "20px"
    >
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        borderRadius= "45px"
      >
        <img
          alt={item.name}
          width="300px"
          height="400px"
          src={`${url}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer", padding : "10px", borderRadius : "20px" }}
        />
        <Box
          display={isHovered ? "block" : "none"} //to be shown only when hovered over image
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px"
        sx = {{
          padding : "0px 0px 10px 12px"
        }}
      >
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, " $1") //match uppercase letters in string and add space before them
            .replace(/^./, (str) => str.toUpperCase())} {/*first char of string to UC */}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">₹ {price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
