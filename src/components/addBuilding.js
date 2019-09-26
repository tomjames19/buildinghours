import React, { Component } from 'react';
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

class AddBuilding extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleClose = () => {
        this.props.handleClose();
    }

    addBuilding = () => {
        const buildingName = this.state.name
        this.props.addBuilding(buildingName);
    }

    render = () => {
        return(
            <DialogContent>
                <DialogTitle>New Building</DialogTitle>
                <TextField 
                    required 
                    id="name" 
                    label="Building Name" 
                    value={this.state.name} 
                    fullWidth
                    onChange={this.handleChange('name')}/>
                <DialogActions>
                    <Button onClick={() => this.handleClose()}>Cancel</Button>
                    <Button onClick={() => this.addBuilding()}>Add</Button>
                </DialogActions>
            </DialogContent>
        )
    }
}

export default AddBuilding;