import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

function TaskCard(props) {

    return (
        <Card variant="outlined" style={{ margin: '20px 0' }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.task.description}
                </Typography>
                <Typography color="textSecondary">
                    {props.task.deadline}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => props.deleteTask(props.task.id)}
                >
                    DELETE
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.setTaskToEdit(props.task)}
                >
                    EDIT
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.setTaskIdToAttach(props.task.id)}
                >
                    ATTACH / DETACH USER
                </Button>

            </CardActions>
            <br />
        </Card>
    )
}

export default TaskCard;