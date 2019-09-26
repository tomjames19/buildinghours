import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteBuilding, createSchedule, createDay, updateSchedule, updateDay } from '../utils/queries';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
         Grid, Typography, withStyles } from '@material-ui/core';
import WeekList from './weekList';
import WeekForm from './weekForm';

const styles = theme => ({
    header: {
        float: 'left',
    },
    bottomButtons: {
        marginTop: '500px',
    }
});

class ScheduleForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            deleteDialog: false,
            scheduleDialog: false,
            building: this.props.building,
            days: [],
            schedule: {},
        }
        this.updateBuilding = this.updateBuilding.bind(this);
        // this.deleteSchedule = this.deleteSchedule.bind(this);
    }

    updateBuilding = (building) => {
        console.log('update', building);
        this.setState({
            building: building,
        });
    }

    handleWeek = (days) => {
        this.setState({
            week: days,
        });
    }

    handleClose = () => {
        this.setState({
            deleteDialog: false,
            scheduleDialog: false,
        })
    }

    handleOpen = () => {
        this.setState({
            deleteDialog: true,
        })
    }
    
    handleOpenSchedule = (schedule) => {
        this.setState({
            scheduleDialog: true,
            schedule: schedule
        })
    }

    addSchedule = (scheduleDetails) => {
        if(this.state.schedule.id) {
            let updateDetails = {
                id: this.state.schedule.id,
                schedule_name: scheduleDetails.schedule_name ? scheduleDetails.schedule_name : this.state.schedule.schedule_name,
                start_date: scheduleDetails.start_date ? scheduleDetails.start_date : this.state.schedule.start_date,
                end_date: scheduleDetails.end_date ? scheduleDetails.end_date : this.state.schedule.end_date,
                default_schedule: scheduleDetails.default_schedule ? scheduleDetails.default_schedule : false,
            }

            API.graphql(graphqlOperation(updateSchedule, updateDetails))
            .then(res => {
                if (this.state.week) {
                    this.state.week.forEach((day, index) => {
                        let dayDetails = {
                            id: day.id,
                            day_name: day.day_name,
                            opening_time: day.opening_time,
                            closing_time: day.closing_time,
                            closed: day.closed,
                            order: day.order
                        }
                        API.graphql(graphqlOperation(updateDay, dayDetails))
                        .then(dayRes => {
                            let newBuilding = dayRes.data.updateDay.schedule.building;
                            this.updateBuilding(newBuilding);
                        });
                    });
                } else {
                    this.setState({building: res.data.updateSchedule.building});
                }
            });
        } else {
            API.graphql(graphqlOperation(createSchedule, scheduleDetails))
            .then(res => {
                this.state.week.forEach((day, index) => {
                    let dayDetails = {
                        day_name: day.day_name,
                        opening_time: day.opening_time,
                        closing_time: day.closing_time,
                        scheduleday: res.data.createSchedule.id,
                        closed: day.closed,
                        order: day.order
                    }
                    API.graphql(graphqlOperation(createDay, dayDetails))
                    .then(res => {
                        this.setState({building: res.data.createDay.schedule.building})
                    })
                })
            });
        }
    }

    deleteBuilding = async () => {
        const event = await API.graphql(graphqlOperation(deleteBuilding, {id: this.state.building.id}))
        console.log(event);
        /*
            Forcing a reload of the page will immediately update the UI
            on the deletion of the building.  This is an inccorect practice
            and should not be used.
            Todo: add state management to application.
        */
        window.location.reload();
        this.handleClose()
    }

    // deleteSchedule = (id) => {
    //     let updateBuilding = {...this.state.building}
    //     let newSchedule = updateBuilding.schedules.items
    //     newSchedule.forEach((schedule, index) => {
    //         if (schedule.id === id) {
    //             newSchedule.splice(index, 1);
    //         }
    //     })
    //     updateBuilding.schedules.items = newSchedule;
    //     this.setState({building})
    // }

    render = () => {
        return( 
            <div>
                <Grid container spacing={3} direction="row">
                    {this.state.building.schedules && this.state.building.schedules.items.length > 0 ? (
                        this.state.building.schedules.items.map((schedule, index) => (
                            <Grid item lg={12} key={index}>
                                <WeekList schedule={schedule} openSchedule={this.handleOpenSchedule} />
                            </Grid>
                        ))
                    ): (
                        <Grid container spacing={3} direction="row">
                            <Grid item lg={12}>
                                <Typography variant="h5">No schedules yet</Typography>
                            </Grid>
                        </Grid>
                    )}
                    <Grid container spacing={3} direction="row" justify="flex-end" style={{ paddingTop: 20 }}>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={this.handleOpen}>Delete Building</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={this.handleOpenSchedule}>+ Add Schedule</Button>
                        </Grid>
                    </Grid> 
                </Grid>

                <Dialog open={this.state.scheduleDialog} onClose={this.handleClose} fullWidth={true} maxWidth={'lg'}>
                    <DialogTitle>{"New Schedule"}</DialogTitle>
                    <WeekForm handleClose={this.handleClose} building={this.state.building} addSchedule={this.addSchedule} updateWeek={this.handleWeek} schedule={this.state.schedule}/>
                </Dialog>

                <Dialog open={this.state.deleteDialog} onClose={this.handleClose}>
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
                        <Button onClick={this.deleteBuilding} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        ) 
    }
}

export default withStyles(styles)(ScheduleForm)