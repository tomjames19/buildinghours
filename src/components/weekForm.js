import React, { Component } from 'react';
import { Button, DialogContent, DialogActions, FormGroup,
     Grid, TextField, withStyles } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Day from './dayForm';

const styles = theme => ({
    header: {
        float: 'left',
    },
    scheduleName: {
        marginTop: '16px',
    }
});

class WeekForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            start_date: this.props.schedule.start_date ? new Date(this.props.schedule.start_date) : new Date(),
            end_date: this.props.schedule.end_date ? new Date(this.props.schedule.end_date) : new Date(),
            default: false,
            days: [],
            Sun: {},
            Mon: {},
            Tue: {},
            Wed: {},
            Thu: {},
            Fri: {},
            Sat: {},
        }
        this.handleDay = this.handleDay.bind(this)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.days !== this.state.days) {
            // console.log(this.state.days);
            this.props.updateWeek(this.state.days);
        }
    }

    componentWillMount = () => {
        if (this.props.schedule.days) {
            const updateWeek = [].concat(this.props.schedule.days.items)
            .sort((a, b) => a.order - b.order);
            this.setState({
                Sun: updateWeek[0],
                Mon: updateWeek[1],
                Tue: updateWeek[2],
                Wed: updateWeek[3],
                Thu: updateWeek[4],
                Fri: updateWeek[5],
                Sat: updateWeek[6],
            });
        }
    }

    handleDay = (day) => {
        this.setState({
            [day.day_name]: day 
        });
        setTimeout(() => {
            this.setState({
                days: [
                    this.state.Sun, this.state.Mon,
                    this.state.Tue, this.state.Wed,
                    this.state.Thu, this.state.Fri,
                    this.state.Sat
                ]  
            });
        }, 1000);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleStartDateChange = (new_date) => {
        this.setState({ start_date: new Date(new_date)});
    }

    handleEndDateChange = (new_date) => {
        this.setState({ end_date: new Date(new_date)});
    }

    handleClose = () => {
        this.props.handleClose();
    }

    handleDefault = () => {
        this.state.default ? (this.setState({
            default: true
        })) : (this.setState({
            defaulte: false
        }))
    }

    newSchedule = () => {
        const scheduleDetails = {
            schedule_name: this.state.name,
            scheduleBuildingId: this.props.building.id,
            start_date: this.state.start_date.toDateString(),
            end_date: this.state.end_date.toDateString(),
            default_schedule: "false",
        }

        this.props.addSchedule(scheduleDetails);
        this.handleClose();
    }

    render = () => {
        const { classes } = this.props
        return(
            <DialogContent>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={3} direction="row">
                        <Grid item lg={12}>
                            <FormGroup row>
                                <TextField
                                    required
                                    id="name"
                                    placeholder="Schedule Name"
                                    onChange={this.handleChange('name')}
                                    label="Schedule Name"
                                    autoFocus={true}
                                    className={classes.scheduleName}
                                    defaultValue={this.props.schedule.schedule_name}
                                />
                                <KeyboardDatePicker
                                    value={this.state.start_date}
                                    onChange={(event, x) => this.handleStartDateChange(x)}
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="start_date"
                                    label="Start Date"
                                    KeyboardButtonProps={{
                                        'aria-label': 'start date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    value={this.state.end_date}
                                    onChange={(event, x) => this.handleEndDateChange(x)}
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="end_date"
                                    label="End Date"
                                    KeyboardButtonProps={{
                                        'aria-label': 'end date',
                                    }}
                                />
                                {/* <FormControlLabel
                                    control={
                                        <Switch checked={this.state.default} onChange={this.handleDefault} value="default" />
                                             }
                                    label="Default"
                                /> */}
                            </FormGroup>
                        </Grid>
                        <Grid item lg>
                            <Day name="Sun" day={this.state.Sun} order={0} updateDay={this.handleDay}/>
                        </Grid>
                        <Grid item lg>
                            <Day name="Mon" day={this.state.Mon} order={1} updateDay={this.handleDay}/>
                        </Grid>
                        <Grid item lg>
                            <Day name="Tue" day={this.state.Tue} order={2} updateDay={this.handleDay}/>
                        </Grid>
                        <Grid item lg>
                            <Day name="Wed" day={this.state.Wed} order={3} updateDay={this.handleDay}/>
                        </Grid>
                        <Grid item lg>
                            <Day name="Thu" day={this.state.Thu} order={4} updateDay={this.handleDay}/>
                        </Grid>
                        <Grid item lg>
                            <Day name="Fri" day={this.state.Fri} order={5} updateDay={this.handleDay}/>
                        </Grid>
                        <Grid item lg>
                            <Day name="Sat" day={this.state.Sat} order={6} updateDay={this.handleDay}/>
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.newSchedule} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </DialogContent>
        )
    }
}

export default withStyles(styles)(WeekForm)