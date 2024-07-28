import { Checklist } from "@mui/icons-material";
import { Avatar, AvatarGroup, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

const TaekoTitle = ({title,subtitle,icon}:{
    title:string,
    subtitle:string,
    icon:JSX.Element
}) => {

    return (
        <>
            <Typography color="GrayText">
                {subtitle}
            </Typography>
            <Typography {...{
                sx:{display:{xs:"none",sm:"none",md:"flex"},alignItems:"center",gap:2,mb:2},
                variant:"h4" ,
                color:"primary" ,
            }}>
                {icon} {title}
            </Typography>
            <Typography {...{
                sx:{display:{xs:"none",sm:"flex",md:"none"},alignItems:"center",gap:2,mb:2},
                variant:"h5",
                color:"primary" ,
            }}>
                <Checklist fontSize="large"/> {title}
            </Typography>
            <Typography {...{
                sx:{display:{xs:"flex",sm:"none",md:"none"},alignItems:"center",gap:2,mb:2},
                variant:"h6",
                color:"primary" ,
            }}>
                <Checklist fontSize="large"/> {title}
            </Typography>
        </>
    );
}
 
export default TaekoTitle;