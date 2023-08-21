import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  //items state 
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch(
      "https://apnidukaan-backend-up90.onrender.com/api/items?populate=image",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems(); //effect should run only when array empty - effect runs only initially
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );

  return (
    <Box
    sx = {{
      backgroundImage:'url("../../shoppinglistbg.jpg")',
      backgroundSize: 'cover',
      borderTopWidth : "40px",
      borderTopStyle : 'groove',
      borderTopColor: 'blanchedalmond',
      padding : "0px 0px 40px 0px",
      borderBottomWidth : "40px",
      borderBottomStyle : 'groove',
      borderBottomColor: 'blanchedalmond',
    }}
    > 
      <Box width="80%" margin="0px auto" padding = "45px 0px 0px 0px"

      >
        <Typography
          variant="h3" textAlign="center" borderRadius="45px" backgroundColor = "white" padding = "10px 0px">
          <b>Featured Products</b>
        </Typography>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          centered
          TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
          sx={{
            m: "25px",
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
              backgroundColor : "white",
              borderRadius : "20px"
            },
          }}
        >
          <Tab label="ALL" value="all" />
          <Tab label="NEW ARRIVALS" value="newArrivals" />
          <Tab label="BEST SELLERS" value="bestSellers" />
          <Tab label="TOP RATED" value="topRated" />
        </Tabs>
        <Box
          margin="0 auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          {value === "all" &&
            items.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {value === "newArrivals" &&
            newArrivalsItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {value === "bestSellers" &&
            bestSellersItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {value === "topRated" &&
            topRatedItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ShoppingList;
