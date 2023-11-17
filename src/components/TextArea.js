import React, { createContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DisplayedData from "./DisplayedData";
import { v4 as uuidv4 } from "uuid";
// import EditIcon from "@mui/icons-material/Edit";
const store = createContext();
const TextArea = (props) => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  // const[updateInput,setUpdateInput]=useState()

  // useEffect(() => {
  //   const storage = JSON.parse(localStorage.getItem("Data"));
  //   setData(storage);
  // }, []);
  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem("Data");
  
    // Check if the retrieved data is not null or undefined
    if (storedData) {
      try {
        // Parse the JSON data
        const parsedData = JSON.parse(storedData);
  
        // Check if the parsed data is different from the current state
        if (JSON.stringify(parsedData) !== JSON.stringify(data)) {
          // Update the state with the parsed data
          setData(parsedData);
        }
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
    }
  },[]);
  useEffect(() => {
    if (data.length > 0) {
      // Convert 'data' to a JSON string and store it in local storage
      localStorage.setItem("Data", JSON.stringify(data));
    }
  }, [data]);

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
    localStorage.clear();
  };
  const handleCheck = (id) => {
    const checkBoxData = data.map((e) => {
      if (e.id === id) {
        return { ...e, check: !e.check };
      }
      return e;
    });
    setData(checkBoxData);
  };
  // saveEdit(id, updatedvalue){
  //setData(()=>data.map((e)=>{if(e.id===id){return {...e, text:updatedvalue}}else {return e;}}))
  // }
  // localStorage.setItem('key', 'vlaue')
  // data = [{},{id:2, text:param},{}]
  const saveEdit = (id, updatedvalue) => {
    if (updatedvalue.trim() !== "") {
      setData(() =>
        data.map((e) => {
          if (e.id === id) {
            return { ...e, text: updatedvalue };
          } else {
            return e;
          }
        })
      );
    } else {
      alert("Please enter a valid value");
    }
  };

  return (
    <store.Provider value={{ data, input, setInput, saveEdit }}>
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
          boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
        }}
      >
        {data.map((e) => {
          return (
            <DisplayedData
              text={e.text}
              key={e.id}
              deleteData={() => deleteData(e.id)}
              data={e.id}
              handleCheck={() => handleCheck(e.id)}
              complete={e.check && "Completed"}
              // editIcon={e.editIcon}
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
