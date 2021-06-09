import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

function UserCard(props) {

  return (
      <Card variant="outlined" style={{ margin: '20px 0' }}>

        <CardContent>
          <Typography variant="h5" component="h2">
            {props.user.username}
          </Typography>
          <Typography color="textSecondary">
            {props.user.mail}
          </Typography>
        </CardContent>

        <CardActions>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={()=> props.deleteUser(props.user.id)}
          >
            DELETE
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={()=>props.openEditDialog(props.user)}
          >
            EDIT
          </Button>

        </CardActions>
        <br />
      </Card>
  );
}

export default UserCard;