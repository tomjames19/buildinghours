import React, { Component } from 'react';
import { Card, CardActions, CardContent, FormControlLabel, Switch, TextField, Typography} from '@material-ui/core';

 class Day extends Component {
     constructor(props){
         super(props)
         this.state = {
             closed: this.props.day.id ? this.props.day.closed : false,
             day_name: this.props.name,
             opening_time: this.props.day.opening_time ? this.props.day.opening_time : "08:00",
             closing_time: this.props.day.closing_time ? this.props.day.closing_time : "18:00",
             status: this.props.day.id ? "closed" : "open",
             order: this.props.order,
             id: this.props.day.id
         }
         this.handleChange = this.handleChange.bind(this);
     }

     componentDidUpdate = (prevProps, prevState) => {
        if(prevState !== this.state) {
            this.props.updateDay(this.state);
        }
     }

     handleChange = name => event => {
        let status = this.state.closed ? "open" : "closed"
        this.setState({
            [name]: event.target.checked,
            status: status
        });
     }

     handleDay = name => event => {
        this.setState({[name]: event.target.value})
        this.props.updateDay(this.state)
     }

     render = () => {
        return (
            <Card>
                <CardContent>
                    <Typography>
                        {this.props.name}
                    </Typography>
                    { !this.state.closed ?
                        <div>
                            <TextField
                                id="opening_time"
                                label="Open"
                                type="time"
                                value={this.state.opening_time}
                                InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                onChange={this.handleDay('opening_time')}
                            />
                            <TextField
                                id="closing_time"
                                label="Close"
                                type="time"
                                value={this.state.closing_time}
                                InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                onChange={this.handleDay('closing_time')}
                            />
                        </div>
                        : <br/>
                    }
                </CardContent>
                <CardActions>
                    <FormControlLabel label={this.state.status} 
                      control={ <Switch value={this.state.status} checked={this.state.closed} onChange={this.handleChange("closed")} color="primary" />}
                      labelPlacement="end"
                    />
                </CardActions>
            </Card>
        )
    }
}

export default Day
// checked={this.state.closed}