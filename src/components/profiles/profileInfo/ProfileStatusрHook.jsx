import React, {useState} from 'react'

const ProfileStatusWithHook = (props) => {

    // let stateWithSetState = useState(true)
    // let editMode = stateWithSetState[0]
    // let setEditMode = stateWithSetState[1]

    let [editMode,setEditMode] = useState(false) //реструкторизация масссива
    let [status,setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode (true)
    }

    const deActivateEditMode = () => {
        setEditMode (false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode} >{props.status}</span>
            </div>
            }
            {editMode &&
            <div>
                <input  onChange={onStatusChange}  autoFocus={true} onBlur={deActivateEditMode} value={status} />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHook;