import { TaskSchema } from "@/models/Task";
import { useAuthStore } from "@/store/Auth/AuthStore";
import { MongoDocument } from "@/types/MongoDocument";
import { Autorenew, Check, Delete, HourglassBottom } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionSummary, Avatar, Button, Card, CardHeader, Divider, IconButton } from "@mui/material";

const TaskCard = ({task}:{
    task:TaskSchema&MongoDocument
}) => {

    return (
        <Accordion>

            <AccordionSummary>
                {task.title}
            </AccordionSummary>

            <AccordionActions sx={{justifyContent:"center"}}>

                <IconButton {...{
                    disabled:task.status==4,
                    color:"inherit",
                    sx:{opacity:.5},
                    size:"small"
                }}>
                    <Delete/>
                </IconButton>

                <Divider orientation="vertical" flexItem />

                <IconButton {...{
                    disabled:task.status==0,
                    color:"info",
                    size:"small"
                }}>
                    <HourglassBottom/>
                </IconButton>

                <IconButton {...{
                    disabled:task.status==1,
                    color:"warning",
                    size:"small"
                }}>
                    <Autorenew/>
                </IconButton>

                <IconButton {...{
                    disabled:task.status==2,
                    color:"success",
                    size:"small"
                }}>
                    <Check/>
                </IconButton>

            </AccordionActions>
        </Accordion>
        
    );
}
 
export default TaskCard;