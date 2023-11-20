import React, { useContext, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { store } from "./TextArea";
import FilterButton from "./FilterButton";

const Filter = () => {
  const allData = useContext(store);
  const { setTodotype } = useContext(store);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const todoFilterPage = (selectedType) => {
    setTodotype(selectedType);
    setSelectedFilter(selectedType);
  };
  const FilterBtnObj = [
    {
      btnTitle: "All",
      selectedFilter: selectedFilter === "all" ? "secondary" : "primary",
      todoFilterPage: () => todoFilterPage("all"),
    },
    {
      btnTitle: "Completed",
      selectedFilter: selectedFilter === "completed" ? "secondary" : "primary",
      todoFilterPage: () => todoFilterPage("completed"),
    },
    {
      btnTitle: "Incompleted",
      selectedFilter:
        selectedFilter === "incompleted" ? "secondary" : "primary",
      todoFilterPage: () => todoFilterPage("incompleted"),
    },
  ];
  return (
    <Box>
      {allData.data.length > 0 && (
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
          {FilterBtnObj.map((e) => {
            return (
              <FilterButton
                key={e.btnTitle}
                btnTitle={e.btnTitle}
                selectedFilter={e.selectedFilter}
                todoFilterPage={e.todoFilterPage}
              />
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

export default Filter;
