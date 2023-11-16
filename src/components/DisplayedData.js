import { Box, Button, Checkbox, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const DisplayedData = (props) => {
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
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        }}
      >
        <Box
          sx={{
            //   width:'50%',
            display: "flex",
            justifyContent: {
              md: "space-between",
              xs: "space-between",
              sm: "space-between",
            },
            padding: "10px 10px",
          }}
        >
          <Box>
            <Checkbox onClick={props.handleCheck} />
          </Box>
          <Box sx={{ wordBreak: "break-word" }}>
            <Typography variant="h5">{props.input}</Typography>
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
            // width:'100%'
          }}
        >
         <Typography
            // key={e.id}
            variant="p"
            color={'error'}
            sx={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            {props.complete}
          </Typography> 
          <Button
            variant="contained"
            color="secondary"
            sx={{ margin: "0px 10px" }}
          >
            <EditIcon />
          </Button>
          <Button variant="contained" color="error" onClick={props.deleteData}>
            <DeleteIcon />
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default DisplayedData;
