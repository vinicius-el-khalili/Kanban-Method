import { TaskSchema } from "@/models/Task";
import { useAuthStore } from "@/store/Auth/AuthStore";
import { MongoDocument } from "@/types/MongoDocument";
import { Avatar, Card, CardHeader } from "@mui/material";

const TaskCard = ({task}:{
    task:TaskSchema&MongoDocument
}) => {

    return (
        <Card>
            <CardHeader
            avatar={<Avatar></Avatar>}
            title={task.title}
            subheader={["to do","doing","testing","done"][task.status]}
            />
        </Card>
    );
}
 
export default TaskCard;