import React, { useState, useEffect } from 'react'
import Dialog from "@material-ui/core/Dialog";
import axios from 'axios'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SearchIcon from '@material-ui/icons/Search';
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from '@material-ui/icons/Close';

export default function AttachDialog(props) {

    const [usersList, setUsersList] = useState([]);
    const [usersAttached, setUsersAttached] = useState([]);
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        getUsers()
    }, []);

    useEffect(() => {
        props.usersAttached && setUsersAttached(props.usersAttached)
    }, [props.usersAttached]);


    const getUsers = async () => {
        try {
            const users = await axios.get('http://localhost:3001/users')
            setUsersList(users.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const searchHandler = (event) => {
        setSearchQuery(event.target.value.toLowerCase())
    }

    const attachUser = async (userId) => {
        usersAttached.push(userId)
        setUsersAttached([...usersAttached])
        try {
            await axios.patch(`http://localhost:3001/tasks/${props.taskId}`,
                `userId=${userId}&attach=true`)
        }
        catch (error) {
            console.log(error);
        }
    }

    const detachUser = async (userId) => {
        try {
            setUsersAttached(usersAttached.filter(id => id !== userId))
            await axios.patch(`http://localhost:3001/tasks/${props.taskId}`,
                `userId=${userId}&attach=false`)
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={() => {
                setSearchQuery('');
                props.handleClose()
            }}
        >
            <CloseIcon onClick={props.handleClose} />
            <DialogContent>
                <div style={{ display: 'flex' }}>
                    {<SearchIcon />}
                    <input placeholder="Search…" type="text" onChange={searchHandler} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {usersList
                        .filter((u) => {
                            let searchValue = u.username.toLowerCase();
                            return searchValue.indexOf(searchQuery) !== -1;
                        })
                        .map((user, i) =>
                            <DisplayUser
                                key={i}
                                user={user}
                                attachUser={attachUser}
                                detachUser={detachUser}
                                isChecked={usersAttached.some((element) => element === user.id)}
                            />
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
};

function DisplayUser(props) {

    const handleChange = () =>
        props.isChecked ?
            props.detachUser(props.user.id) :
            props.attachUser(props.user.id)

    return (
        <FormControlLabel
            control={<Switch
                checked={props.isChecked}
                onChange={() => handleChange()}
                name={props.user.username}
            />}
            label={props.user.username}
        />
    );
}



