import { Button } from "@mui/material";
import React from "react";

const FilterButton = (selectedFilter,todoFilterPage,btnTitle) => {
  // const [selectedFilter, setSelectedFilter] = useState("all");
  return (
    <Button
      variant="contained"
      color={selectedFilter}
      onClick={todoFilterPage}
      sx={{
        width: { sm: "60%", xs: "80%", md: "40%", lg: "23%" },
        height: "10%",
        fontSize: "15px",
        boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
      }}
    >
      {btnTitle}
    </Button>
  );
};

export default FilterButton;
