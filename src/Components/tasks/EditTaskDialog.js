import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Calendar from "react-calendar";
import * as moment from 'moment'
import 'react-calendar/dist/Calendar.css';


export default function EditTaskDialog(props) {

    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        if (props.task) {
            setDescription(props.task.description);
            setDeadline(new Date(moment(props.task.deadline, 'DD.MM.YYYY').format('MM.DD.YYYY')))
        }
    }, [props.task]);

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}
        >
            <DialogTitle>
                Edit task details:
            </DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New deacrition"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label htmlFor="datePicker">Pick a new deadline:</label>
                <Calendar id="datePicker" onChange={setDeadline} value={deadline} />
            </DialogContent>
            <DialogActions>
                <Button 
                onClick={props.handleClose} 
                color="primary"
                >
                    Cancel
                </Button>
                <Button
                    disabled={(description.length < 1 || deadline.length < 1)}
                    onClick={() => {
                        props.updateTask(
                                    props.task.id, 
                                    description, 
                                    moment(deadline).format('DD.MM.YYYY'));
                        props.handleClose()
                    }} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
