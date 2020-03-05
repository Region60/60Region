import React from 'react'
import Preloader from "../../common/Preloader/Preloader";
import classes from "./ProfileInfo.module.css";
import userImg from "../../../img/userImg.png";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({editMode:true})
    }

    deActivateEditMode = () => {
        this.setState({editMode:false})
        this.props.updateStatus(this.props.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        debugger
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                </div>
                        }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode}  value={this.props.status}/>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;