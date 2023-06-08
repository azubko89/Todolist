import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changedFilter: (value: FilterValueType, todolistId: string) => void
    id: string
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTitleTask: (taskId: string, newTitle:string, todolistId: string) => void
    changeTitleTodolist:(newTitle:string,todolistId:string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValueType
    //tasks: TaskType[]

}

function Todolist(props: PropsType) {  //props={title:'What to learn',arrTasks:[]}

    const onAllClickHandler = () => props.changedFilter('all', props.id)
    const onActiveClickHandler = () => props.changedFilter('active', props.id)
    const onCompletedClickHandler = () => props.changedFilter('completed', props.id)

    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTaskNeu = (title: string) => {
        props.addTask(title, props.id)
    }

    const onChangeTitleTodolist = (newTitle:string) => {
        props.changeTitleTodolist(newTitle,props.id)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTitleTodolist}/>
                <button onClick={onClickRemoveTodolist}>x</button>
            </h3>
            <div>
                <AddItemForm addItem={addTaskNeu}/>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    const onRemoveHandler = () => {
                        props.removeTask(task.id, props.id)
                    }

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newTitle:string) => {
                        props.changeTitleTask(task.id, newTitle, props.id)
                    }

                    return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeStatusHandler}
                               checked={task.isDone}/>
                        <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;
