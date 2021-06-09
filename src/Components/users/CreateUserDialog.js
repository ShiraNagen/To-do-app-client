import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function CreateUserDialog(props) {

    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");

    const isDisable = mail.length < 1 || 
                    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail) || 
                    username.length < 1

    const createUser = () => {
        props.createUser(username, mail);
        props.handleClose();
    }
    return (
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle>
                Create your Account:
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="username"
                    type="text"
                    fullWidth
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="email"
                    type="email"
                    fullWidth
                    value={mail}
                    onChange={e => setMail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => props.handleClose()} 
                    color="primary"
                >
                    CANCLE
                </Button>
                <Button
                    disabled={isDisable}
                    onClick={createUser}
                    color="primary">
                    CREATE
                </Button>
            </DialogActions>
        </Dialog>
    );
}
