import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function EditUserDialog(props) {

    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');

    const handleClose = (howTerminate) => {
        if (howTerminate === 'cancel') {
            props.handleClose();
        }

        if (howTerminate === 'update') {
            props.updateUser(props.user.id, username, mail);
            props.handleClose();
        }
    };

    useEffect(() => {
        if (props.user) {
            setUsername(props.user.username);
            setMail(props.user.mail);
        }
    }, [props.user]);

    const isDisable = mail.length < 1 || 
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail) || 
        username.length < 1;


    return (
        <Dialog
            open={props.isOpen}
            onClose={handleClose}
        >
            <DialogTitle>
                Edit user details:
            </DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New username"
                    type="text"
                    fullWidth
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="New email"
                    type="email"
                    fullWidth
                    value={mail}
                    onChange={e => setMail(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button 
                    onClick={() => handleClose('cancel')} color="primary"
                >
                    Cancel
                </Button>
                <Button
                    disabled={isDisable}
                    onClick={() => handleClose('update')} color="primary"
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
