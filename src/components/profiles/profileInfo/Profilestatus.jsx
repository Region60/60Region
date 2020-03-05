import React from 'react'
import Preloader from "../../common/Preloader/Preloader";
import classes from "./ProfileInfo.module.css";
import userImg from "../../../img/userImg.png";

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }
    activateEditMode () {
        this.setState({editMode:true})
    }

    deActivateEditMode () {
        this.setState({editMode:false})
    }

    render() {
        debugger
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                </div>
                        }
                {this.state.editMode &&
                <div>
                    <input autoFocus={true} onBlur={this.deActivateEditMode.bind(this)}  value={this.props.status}/>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;