import React, { useState } from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Calendar from "react-calendar";
import * as moment from 'moment'
import 'react-calendar/dist/Calendar.css';

function CreateTaskDialog(props) {

    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

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
                    label="description"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label htmlFor="datePicker">Pick a deadline for the task:</label>
                <Calendar
                    onChange={setDeadline}
                    value={deadline}
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
                    disabled={(description.length < 1 || deadline.length < 1)}
                    onClick={() => {
                        props.createTask(description, moment(deadline).format('DD.MM.YYYY'));
                        props.handleClose();
                    }}
                    color="primary">
                    CREATE
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateTaskDialog;