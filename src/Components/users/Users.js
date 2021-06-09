import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import Button from "@material-ui/core/Button";
import CreateUserDialog from './CreateUserDialog';
import EditUserDialog from './EditUserDialog';
import axios from 'axios'

function Users() {

  const [isOpenCreateUserDialog, setIsOpenCreateUserDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [userToEdit, setUserToEdit] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/users')
      setUsers(res.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const createUser = async (username, mail) => {
    try {
      await axios.post(`http://localhost:3001/users/`,
        `username=${username}&mail=${mail}`)
      getUsers()
    }
    catch (error) {
      console.log(error)
    }
  }

  const updateUser = async (userId, username, mail) => {
    try {
      await axios.put(`http://localhost:3001/users/${userId}`,
        `username=${username}&mail=${mail}`)
      getUsers()
    }
    catch {

    }
  }

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/users/${userId}`)
      getUsers()
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div style={{ margin: '80px 25%' }}>

      <EditUserDialog
        user={userToEdit}
        handleClose={()=>setIsOpenEditDialog(false)}
        updateUser={updateUser}
        isOpen={isOpenEditDialog}
      />

      <CreateUserDialog
        isOpen={isOpenCreateUserDialog}
        handleClose={() => setIsOpenCreateUserDialog(false)}
        createUser={createUser}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsOpenCreateUserDialog(true)}
      >
        ADD USER
      </Button>

      {users.map((user, id) =>
        <UserCard
          key={id}
          user={user}
          updateUser={updateUser}
          deleteUser={deleteUser}
          openEditDialog={()=>{
            setUserToEdit(user);
            setIsOpenEditDialog(true)}}
        />)}
    </div>
  );
}

export default Users;