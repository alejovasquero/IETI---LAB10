import React from 'react';
import { Button, Divider, Grid, InputLabel, TextField, Typography, withStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { ThreeSixtyOutlined } from '@material-ui/icons';


const styles = (theme) => ({

    root: {
        padding: theme.spacing(7),
    },
    title: {
        margin: "auto",
    },
    form: {
        margin: "auto",
    }
});

class LeftDrawer extends React.Component {


    constructor(props) {
        super(props);
        this.state = { stateOpen: false }
    }



    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <form className={classes.form}>
                    <Typography variant="h3" className={classes.title}>
                        Task Filter
                    </Typography>
                    <br />
                    <Divider></Divider>
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={this.props.filterData.date.value}
                            onChange={this.props.onDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <br />
                    <Divider></Divider>
                    <br />
                    <InputLabel htmlFor="state-select">State</InputLabel>
                    <Select
                        fullWidth
                        value={this.props.filterData.state}
                        onChange={this.props.onStateChange}
                        open={this.state.stateOpen}
                        onClose={()=>{this.setState({stateOpen: false})}}
                        onOpen={()=>{this.setState({stateOpen: true})}}
                    >

                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="To Do">To Do</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Ready">Ready</MenuItem>
                    </Select>
                    <Divider></Divider>
                    <br />
                    <TextField
                        fullWidth
                        label="Responsable"
                        value={this.props.filterData.responsible}
                        onChange={this.props.onResponsibleChange}
                    ></TextField>
                    <br />
                    <Divider></Divider>
                    <br />
                    
                    <Grid container direction="column" justify="center">
                        <Button onClick={this.props.close}>Done</Button>
                        <Button onClick={this.props.clearAll}>Clear All</Button>

                    </Grid>

                </form>

            </div>


        );
    }
}


export default withStyles(styles)(LeftDrawer);