import { TaskSchema } from "@/models/Task";
import { MongoDocument } from "@/types/MongoDocument";
import { Card, CardHeader } from "@mui/material";

const TaskCard = ({task}:{
    task:TaskSchema&MongoDocument
}) => {
    return (
        <>
        <Card>
            <CardHeader 
            title={task.title}
            subheader={["to do","doing","testing","done"][task.status]}
            />
        </Card>
        </>
    );
}
 
export default TaskCard;