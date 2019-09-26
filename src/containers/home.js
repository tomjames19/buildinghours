import React, { Component } from "react"
import { API, graphqlOperation } from 'aws-amplify';
import { listBuildings, createBuilding } from '../utils/queries';
import { Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Dialog, 
         Grid, Slide, Typography, withStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import AddBuilding from '../components/addBuilding';
import ScheduleForm from '../components/scheduleForm';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    addButton: {
        position: 'absolute',
    },
    expansionPanel: {
        justifyContent: 'center'
    }
});

export const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" {...props} ref={ref}/>
));

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buildings: [],
            buildingOpen: false
        }
    }
    
    componentDidMount = () => {
        this.loadBuildings()
    }
    
    loadBuildings = async () => {
        const allBuildings = await API.graphql(graphqlOperation(listBuildings));
        this.setState({
            buildings: allBuildings.data.listBuildings.items
        })
    }
    
    addBuilding = (name) => {
        const buildingDetails = {
            name: name
        }

        API.graphql(graphqlOperation(createBuilding, buildingDetails))
        .then(res => {
            this.setState({
                buildings: this.state.buildings.concat([res.data.createBuilding])
            })
        });


        this.handleClose();
    }

    handleOpen = () => {
        this.setState({buildingOpen: true});
    }

    handleClose = () => {
        this.setState({buildingOpen: false});
    }

    render = () => {
        const { classes } = this.props
        return (
            <div className={classes.root}>
               <Grid container spacing={1} direction="column">
                   <br/>
                   <br/>
                    {this.state.buildings.map((building, index) => (
                        <Grid item md={12} key={index}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                                    <Typography>{building.name}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.expansionPanel}>
                                    <ScheduleForm building={building}/>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    ))}
                    <Grid item md={12}>
                        <Button className={classes.addButton} variant="outlined" color="primary" onClick={() => this.handleOpen()}>
                            + Add Building
                        </Button>
                    </Grid>
               </Grid> 
               <Dialog 
                fullWidth={true}
                maxWidth="md"
                open={this.state.buildingOpen} 
                onClose={() => this.handleClose()} 
                TransitionComponent={Transition}>
                    <AddBuilding handleClose={() => this.handleClose()} addBuilding={(name) => this.addBuilding(name)}/>
               </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(Home);