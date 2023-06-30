import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { addUser, destroyUser, editUser, getUsers } from '../redux/actions/userAction';

const UserListComponent = ({ data, getUsers, addUser, updateUser, deleteUser }) => {

    const [name, setName] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleSubmit = () => {
        if (userId) {
            updateUser({ id: userId, name });
            setUserId(null);
            setIsEdit(false);
        } else {
            if (!name.trim()) return
            addUser(name.trim());
        }
        setName('');
    }

    const handleEdit = (user) => {
        setIsEdit(true);
        setName(user.name);
        setUserId(user.id);
    }

    const handleDelete = (user) => {
        if (window.confirm(`Are you sure to delete "${user.name}"`)) {
            deleteUser(user);
        }
    }

    return (
        <div>
            <h3>User List</h3>
            <input onChange={e => setName(e.target.value)} value={name} />
            <button onClick={handleSubmit}>{isEdit ? 'Update' : 'Add'} User</button>
            <ul>
                {data.loading && 'Loading'}
                {data.error && data.error}
                {!data.loading && !data.error && data.users.map((user, index) => (
                    <li key={index} style={{ display: 'flex', gap: '5px' }}>{user.name}<button onClick={() => handleEdit(user)}>Edit</button><button onClick={() => handleDelete(user)}>Delete</button></li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
        addUser: (name) => dispatch(addUser({ name })),
        updateUser: (user) => dispatch(editUser(user)),
        deleteUser: (user) => dispatch(destroyUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListComponent);