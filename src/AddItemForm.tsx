import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsId = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsId) {

    const [newAddTask, setNewAddTask] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAddTask(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13 && newAddTask.trim() !== '') {
            props.addItem(newAddTask)
            setNewAddTask('')
        }
        if (e.ctrlKey && e.charCode === 13 && newAddTask.trim() === '') {
            setError('Field is required')
        }
    }
    const addTask = () => {
        if (newAddTask.trim() === '') {
            setError('Field is required')
        } else {
            props.addItem(newAddTask.trim());
            setNewAddTask('')
        }
    }
    return <div>
        <input value={newAddTask} onChange={onNewTitleChangeHandler} onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}/>
        <button onClick={addTask}>+</button>
        {error && <div className={'error-message'}> {error} </div>}
    </div>
}