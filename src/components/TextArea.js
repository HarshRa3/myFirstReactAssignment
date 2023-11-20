import React, { createContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DisplayedData from "./DisplayedData";
import { v4 as uuidv4 } from "uuid";
import Filter from "./Filter";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const store = createContext();

const TextArea = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [todoType, setTodotype] = useState("all");

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
  }, []);

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
    }
  };

  const deleteData = (index) => {
    const updatedList = data.filter((e) => e.id !== index);
    setData(updatedList);
    toast.success('Your Todo Has been Deleted', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
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

  const saveEdit = (id, updatedvalue) => {
    if (updatedvalue.trim() !== "") {
      setData(() =>
        data.map((e) => {
          if (e.id === id) {
            return { ...e, text: updatedvalue.trim() };
          } else {
            return e;
          }
        })
      );
      toast.success('Your Todo Text Has Been Edited', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };
  

  // const todoFilterPage = (selectedType) => {
  //   setTodotype(selectedType);
  // };

  return (
    <store.Provider value={{ data, input, setInput, saveEdit, setTodotype }}>
      <Stack direction={"row"} spacing={2} sx={{ justifyContent: "center", mt: "10px" }}>
        <TextField label="Enter text" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button variant="contained" color="success" onClick={addData}>
          <AddIcon />
        </Button>
      </Stack>
      <Filter />
      <div
        style={{
          height: "400px",
          backgroundColor: "rgba(130, 112, 255, 0.2)",
          width: "70%",
          margin: "23px auto",
          overflowX: "hidden",
          overflowY: "scroll",
          boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mt: "10px" }}>
          ADD TODO HERE
        </Typography>
        {data
          .filter((item) => {
            if (todoType === "completed") {
              return item.check;
            } else if (todoType === "incompleted") {
              return !item.check;
            }
            return true;
          })
          .map((e) => (
            <DisplayedData
              text={e.text}
              key={e.id}
              deleteData={() => deleteData(e.id)}
              id={e.id}
              handleCheck={() => handleCheck(e.id)}
              complete={e.check && "Completed"}
              checkData={e.check}
            />
          ))}
      </div>
      <Box sx={{ width: "10%", margin: "10px auto", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}>
        <Button variant="contained" onClick={clearAllText} sx={{ width: "100%" }}>
          Clear All
        </Button>
      </Box>
      <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>

    </store.Provider>
  );
};

export default TextArea;
export { store };