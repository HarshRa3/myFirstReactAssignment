import React, { useContext, useState } from "react";
import { Button, Stack } from "@mui/material";
import { store } from "./TextArea";

const Filter = () => {
  const { setTodotype } = useContext(store);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const todoFilterPage = (selectedType) => {
    setTodotype(selectedType);
    setSelectedFilter(selectedType);
  };

  return (
    <Stack
      direction={{ sm: "column", xs: "column", md: "column", lg: "row" }}
      spacing={2}
      sx={{
        justifyContent: "space-between",
        width: "50%",
        margin: "20px auto",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        color={selectedFilter === "all" ? "secondary" : "primary"}
        onClick={() => todoFilterPage("all")}
        sx={{ width: "23%", height: "10%", fontSize: "15px",  boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        All
      </Button>
      <Button
        variant="contained"
        color={selectedFilter === "completed" ? "secondary" : "primary"}
        onClick={() => todoFilterPage("completed")}
        sx={{ width: "23%", height: "10%", fontSize: "15px",  boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        Completed Data
      </Button>
      <Button
        variant="contained"
        color={selectedFilter === "incompleted" ? "secondary" : "primary"}
        onClick={() => todoFilterPage("incompleted")}
        sx={{ width: "23%", height: "10%", fontSize: "15px",  boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        Incompleted Data
      </Button>
    </Stack>
  );
};

export default Filter;
