import React, {ChangeEvent, useState} from "react";

type editableSpanPropsType = {
    title: string,
    onChange: (newTitle:string) => void
}

export function EditableSpan(props: editableSpanPropsType) {
    let [editMode,setEditMode] = useState(false)
    let [title,setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateVueMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return  editMode
        ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateVueMode} autoFocus  />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}