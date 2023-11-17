import {
  Box,
  Button,
  Checkbox,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { store } from "./TextArea";
// export const updateData=createContext()
const DisplayedData = (props) => {
  const [edit, setEdit] = useState(false);
  const [updateInput, setUpdateInput] = useState("");
  const inputRef = useRef(null);
  const newInputRef=useRef()
  useEffect(() => {
    if (edit) {
      // Focus on the input field when 'edit' is true
      inputRef.current.focus();
    }
  }, [edit]);
  const allData = useContext(store);
  const handleEdit = () => {
    setUpdateInput(props.text)
    setEdit(!edit);
  };
  const handleBlur = () => {
    allData.saveEdit(props.data, updateInput);
    setEdit(false);
  };
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
        sx={{
          justifyContent: "space-between",
          width: "96.5%",
          margin: "10px 0",
          padding: "0 20px",
          background: "white",
          minHeight: "19%",
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              md: "space-between",
              xs: "space-between",
              sm: "space-between",
            },
            padding: "10px 10px",
            alignItems: "center",
          }}
        >
          <Box>
            <Checkbox onClick={props.handleCheck} />
          </Box>
          <Box sx={{ wordBreak: "break-word" }}>
            {!edit ? (
              <Typography variant="h5">{props.text}</Typography>
            ) : (
              <TextField
                label="Enter text"
                value={updateInput}
                onBlur={handleBlur}
                onChange={(e) => setUpdateInput(e.target.value)}
                inputRef={inputRef}
                ref={newInputRef}
                
              />
            )}
          </Box>
        </Box>
        <Stack
          direction={"row"}
          sx={{
            textAlign: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingBottom: {
              sm: "10px",
              xs: "10px",
              md: "10px",
            },
            wordBreak: "break-word",
          }}
        >
          <Typography
            variant="p"
            color={"error"}
            sx={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            {props.complete}
          </Typography>
          {!edit ? (
            <Button
              variant="contained"
              color="secondary"
              sx={{ margin: "0px 10px" }}
              onClick={handleEdit}
            >
              <EditIcon />
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              sx={{ margin: "0px 10px" }}
              onClick={handleBlur}
            >
              <AddIcon />
            </Button>
          )}
          {/* <Button
            variant="contained"
            color="secondary"
            sx={{ margin: "0px 10px" }}
            onClick={props.handleEdit}
          >
            {props.editIcon}
          </Button> */}

          <Button variant="contained" color="error" onClick={props.deleteData}>
            <DeleteIcon />
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default DisplayedData;
// export {updateData}