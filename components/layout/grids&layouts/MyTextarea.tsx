import { useThemeStore } from "@/store/Theme/ThemeStore";
import { TextareaAutosize } from "@mui/material";
import { ChangeEvent } from "react";

const MyTextarea = ({value,onChange,placeholder=""}:{
  value: string
  onChange: (e:ChangeEvent<HTMLTextAreaElement>)=>any
  placeholder?:string
}) => {

  const mode = useThemeStore((state)=>(state.mode))

  return (
    <TextareaAutosize {...{
      value,
      onChange,
      placeholder,
      className:`textarea textarea_${mode}`,
      minRows:8,
      maxRows:8,
      style:{paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:6},
      autoFocus:true
    }}
    />
  );
}
 
export default MyTextarea;