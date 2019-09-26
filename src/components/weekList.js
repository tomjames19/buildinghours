import React, { Component } from 'react';
import { Button, Card, CardActions, CardHeader, CardContent, Dialog, DialogContent, 
    DialogActions, DialogContentText, DialogTitle,
    Grid, IconButton, Paper, Typography, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteSchedule, deleteDay } from '../utils/queries';
// import moment from 'moment';

const styles = theme => ({
    header: {
        float: 'left',
    },
    editButtons: {
        justifyContent: 'flex-end',
    }
});

class WeekList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            days: this.props.schedule.days.items,
            deleteDialog: false
        }
    }

    componentDidMount = () => {
        const myData = [].concat(this.state.days)
        .sort((a, b) => a.order - b.order);
        this.setState({days: myData});
    }

    handleOpen = () => {
        console.log('hello tom')
        this.setState({deleteDialog: true});  
    }

    handleClose = () => {
        this.setState({deleteDialog: false});
    }

    handleDelete = () => {
        API.graphql(graphqlOperation(deleteSchedule, {id: this.props.schedule.id}))
        .then(res => {
            res.data.deleteSchedule.days.items.forEach((day, index) => {
                API.graphql(graphqlOperation(deleteDay, {id: day.id}))
                .then(res => {
                    console.log(res)
                })
            })
        })

        /*
            Forcing a reload of the page will immediately update the UI
            on the deletion of the schedule.  This is an inccorect practice
            and should not be used.
            Todo: add state management to application.
        */
       window.location.reload();

        this.handleClose()
    }

    editSchedule = () => {
        this.props.openSchedule(this.props.schedule)
    }

    render = () => {
        const { classes } = this.props
        return (
            <div>
                <Card>
                    <CardContent>
                        <CardHeader title={this.props.schedule.schedule_name} subheader={this.props.schedule.start_date + " - " + this.props.schedule.end_date}/>
                        <Grid container spacing={3} direction="row">
                            {this.state.days.map((day, index) => (
                                <Grid item lg key={index}>
                                    <Paper>
                                        <Typography variant="h5">{day.day_name}</Typography>
                                        {day.closed ? (<Typography>Closed</Typography>):
                                        (<Typography variant="subtitle1">{day.opening_time} - {day.closing_time}</Typography>)}
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                    <CardActions disableSpacing className={classes.editButtons}>
                        <IconButton onClick={this.handleOpen}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={this.editSchedule}>
                            <EditIcon />
                        </IconButton>
                    </CardActions>
                </Card>
                <Dialog open={this.state.deleteDialog} onClose={this.handleClose}>
                    <DialogContent>
                        <DialogTitle>{"Are you sure?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                You cannot undo this action.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleDelete} color="primary" autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                        </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(WeekList)