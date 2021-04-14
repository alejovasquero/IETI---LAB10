import React from 'react';
import { Button, Dialog, DialogTitle, TextField, Divider, DialogContent, InputLabel, withStyles, IconButton } from '@material-ui/core';
import "./Tasks.css"
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { post } from '../requests/axiosRequests';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(7),
    }
});
class TaskCreator extends React.Component {


    constructor(props) {
        super(props);
        this.state = { file: null }
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleTaskSubmit = (event) => {
        event.preventDefault();

        let data = new FormData();
        data.append('file', this.state.file);

        let that = this;

        post('api/files', data).then((data) => {
            console.log("file uploaded!", data);
            let newTask = {
                description: event.target[0].value,
                responsible: {
                    name: event.target[1].value,
                    email: event.target[2].value
                },
                status: event.target[3].value,
                dueDate: new Date(),
                fileUrl: data
            }
            console.log(JSON.stringify(newTask))
            that.props.onTaskAddition(newTask);

        }).catch(function (error) {
            console.log("failed file upload", error);
        });



    }

    handleInputChange(e) {
        this.setState({
            file: e.target.files[0]
        });
        console.log(this.state.file)
    }


    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Link to="/tasks">
                    <IconButton>
                        <ChevronLeftIcon />Back
                    </IconButton>
                </Link>
                <form onSubmit={this.handleTaskSubmit}>
                    <TextField fullWidth label="Description" variant="filled"></TextField>
                    <Divider></Divider>
                    <TextField fullWidth label="Responsable" variant="filled"></TextField>
                    <Divider></Divider>
                    <TextField fullWidth label="Correo" variant="filled"></TextField>
                    <Divider></Divider>
                    <InputLabel htmlFor="state-select">State</InputLabel>
                    <Select
                        native
                        inputProps={{
                            name: 'age',
                            id: 'state-select',
                        }}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Ready">Ready</option>
                    </Select>
                    <Divider></Divider>
                    <input type="file" id="file" onChange={this.handleInputChange} />
                    <Divider></Divider>
                    <Button type="submit">Done</Button>

                </form>
            </div>
        );
    }
}


export default withStyles(styles)(TaskCreator);