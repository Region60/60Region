import React from 'react';
import {connect} from 'react-redux';
import {
    follow,
    setCurrentPage,
    unfollow, getUsers
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingIsProgress={this.props.followingIsProgress}
            />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingIsProgress: state.usersPage.followingIsProgress


    }
}
/*const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId) => {
            dispatch(unFollowActionCreator(userId))
        },
        setUser: (users) => {
            dispatch(setUsersActionCreator(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber))
        },
        setTotalUserCount: (totalCount) => {
            dispatch(setTotalUserCountActionCreator(totalCount))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(setToggleIsFetchingActionCreator(isFetching))
        }

    }
}*/


export default connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    getUsers
})(UsersContainer);
