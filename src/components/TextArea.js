import React, { createContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DisplayedData from "./DisplayedData";
import { v4 as uuidv4 } from "uuid";
const store = createContext();
const TextArea = (props) => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  // const [isChecked, setIsChecked] = useState(false);
  const addData = () => {
    if (input.trim() !== "") {
      setData([...data, { id: uuidv4(), text: input, check: false }]);
      setInput("");
    } else {
    }
  };
  const deleteData = (index) => {
    const updatedList = data.filter((e) => {
      return e.id !== index;
    });
    setData(updatedList);
  };

  const clearAllText = () => {
    setData([]);
  };
  const handleCheck = (index) => {
    setData(
      data.map((e) => {
        if (e.id === index) {
          return { ...e, check: !e.check };
        }
          return e;
      })
    );
  };
  return (
    <store.Provider value={{ data }}>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ justifyContent: "center", mt: "10px" }}
      >
        <TextField
          label="Enter text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={addData}>
          <AddIcon />
        </Button>
      </Stack>
      <div
        style={{
          height: "400px",
          backgroundColor: "#70a1ff",
          width: "70%",
          margin: "auto",
          overflowX: "hidden",
          overflowY: "scroll",
          marginTop: "10px",
          boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'
        }}
      >
        {data.map((e) => {
          return (
            <DisplayedData
              input={e.text}
              key={e.id}
              deleteData={() => deleteData(e.id)}
              data={data}
              handleCheck={() => handleCheck(e.id)}
              complete={e.check&&'Completed'}
            />
          );
        })}
      </div>
      <Box sx={{ width: "9%", margin: "10px auto" }}>
        <Button variant="contained" onClick={clearAllText}>
          Clear All
        </Button>
      </Box>
    </store.Provider>
  );
};

export default TextArea;
export { store };
