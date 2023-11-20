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
import { useContext, useEffect, useRef, useState } from "react";
import { store } from "./TextArea";
// export const updateData=createContext()
const DisplayedData = ({text,id,handleCheck,checkData,complete,deleteData}) => {
  const [edit, setEdit] = useState(false);
  const [updateInput, setUpdateInput] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    if (edit) {
      // Focus on the input field when 'edit' is true
      inputRef.current.focus();
    }
  }, [edit]);
  const allData = useContext(store);
  const handleEdit = () => {
    setUpdateInput(text);
    setEdit(!edit);
  };
  const handleBlur = () => {
    allData.saveEdit(id, updateInput);
    setEdit(false);
  };
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
        sx={{
          justifyContent: "space-between",
          width: "100%",
          margin: "10px 0",
          padding: "",
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
            <Checkbox onClick={handleCheck} checked={checkData} />
          </Box>
          <Box
            sx={{
              wordBreak: "break-word",
              textAlign: { xs: "right", sm: "right", md: "right", lg: "left" },
              maxWidth: "500px",
            }}
          >
            {!edit ? (
              <Typography variant="h5">{text}</Typography>
            ) : (
              <TextField
                label="Enter text"
                value={updateInput}
                onBlur={handleBlur}
                onChange={(e) => setUpdateInput(e.target.value)}
                inputRef={inputRef}
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
            paddingBottom: "10px",
            wordBreak: "break-word",
          }}
        >
          <Typography
            variant="p"
            sx={{
              color: "green",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            {complete}
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

          <Button
            variant="contained"
            color="error"
            sx={{ mr: { lg: "20px" } }}
            onClick={deleteData}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default DisplayedData;
// export {updateData}
