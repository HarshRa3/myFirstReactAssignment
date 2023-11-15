import React, { createContext, useState } from "react";
import TextField from "@mui/material/TextField";
import {  Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DisplayedData from "./DisplayedData";
const inputData=createContext()
const TextArea = (props) => {
  const[input,setInput]=useState('')
  const[data,setData]=useState([])
  const addData=()=>{
    if(!input){

    }else{
        setData([...data,{input}])
        setInput('')
    }
  }
  const deleteData=(i)=>{
    let arr=data;
    arr.splice(i,1);
    setData([...arr]);
    console.log(i)
  }
  return (
    <inputData.Provider value={{input,setInput,data}}>
      <Stack direction={"row"} spacing={2} sx={{justifyContent:'center', mt:'10px'}} >
        {/* <TextField id="fullWidth" fullWidth label="Enter Text Here"  variant="outlined" /> */}
        <TextField label="Enter text" value={input} onChange={(e)=>setInput(e.target.value)} />
        <Button variant="contained" color="success" onClick={addData} >
          <AddIcon />
        </Button>
      </Stack>
      <div stylr={{maxHeight:'900px',backgroundgColor:'red'}}>

      
      {data.map((e,i)=>{
        return <DisplayedData input={e.input} key={i} deleteData={()=>deleteData(i)}/>
      })}
      </div>
    </inputData.Provider>
  );
};

export default TextArea;
export {inputData};
