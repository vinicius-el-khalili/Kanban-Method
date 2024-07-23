import { useEffect, useState } from "react"

const Page = async () => {

    const fetchTasks = async () => {
        const res = await fetch("http://localhost:3000/api/tasks")
        const tasks:any[] = await res.json()
        console.log(tasks)
        return tasks
    }

    const tasks = await fetchTasks()

    return (
        <>
        <h1>Tasks</h1>
        <div>
            {tasks.map((task,i)=>(
                <div key={`task${i}`}>
                    <p>{task.title}</p>
                    <p>{task.description}</p>
                    <p>{task.status}</p>
                </div>
            ))}
        </div>
        </>
    );
}
 
export default Page;