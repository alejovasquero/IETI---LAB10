import React from 'react';
import { Button, CssBaseline, Dialog, Fab, Grid } from '@material-ui/core';
import "./Tasks.css"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import TaskCard from './TaskCard';
import LeftDrawer from './LeftDrawer';
import { Link } from 'react-router-dom';
import FilterListIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import TaskFilter from './TaskFilter';
import { format } from "date-fns";
import { get } from '../requests/axiosRequests';

class Tasks extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            tasks: [], drawerOpen: false, filterOpen: false, filterData: {
                date: { value: new Date(), custom: false }, custom: false, responsible: "", state: ""
            }
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleFilterClose = this.handleFilterClose.bind(this);
        this.handleFilterOpen = this.handleFilterOpen.bind(this);
        this.handleFilterDataDateChange = this.handleFilterDataDateChange.bind(this);
        this.handleFilterDataResponsibleChange = this.handleFilterDataResponsibleChange.bind(this);
        this.handleFilterDataStateChange = this.handleFilterDataStateChange.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }


    componentDidMount() {
        get("api/tasks").then(data => {
            this.setState({ tasks: data });
        });
    }

    

    clearAll() {
        this.setState({
            filterData: {
                date: { value: new Date(), custom: false }, custom: false, responsible: "", state: ""
            }
        });
    }

    handleFilterDataDateChange = (date) => {
        var filterData = { ...this.state.filterData }
        filterData.date = { value: date, custom: true };
        filterData.custom = true;
        this.setState({ filterData });
    }

    handleFilterDataResponsibleChange = (event) => {
        console.log(this.state.filterData)
        var filterData = { ...this.state.filterData }
        filterData.responsible = event.target.value;
        filterData.custom = true;
        this.setState({ filterData });
    }

    handleFilterDataStateChange = (event) => {
        var filterData = { ...this.state.filterData }
        filterData.state = event.target.value;
        filterData.custom = true;
        this.setState({ filterData });
    }

    handleFilterOpen() {
        this.setState({ filterOpen: true });
    }

    handleFilterClose() {
        this.setState({ filterOpen: false });
    }

    toggleDrawer = (open) => (event) => {
        console.log(open);
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ drawerOpen: open });
    };

    handleDrawerOpen() {
        this.setState({ drawerOpen: true });
    };

    handleDrawerClose() {
        this.setState({ drawerOpen: false });
    };



    handleDialogClose() {
        this.setState({ dialogOpen: false });
    }

    render() {
        console.log(this.props.tasks)
        console.log(this.state.filterData)
        const taskList = this.state.tasks.filter(task =>
            !this.state.filterData.custom ||
            (
                (this.state.filterData.responsible === "" || task.responsible.name.includes(this.state.filterData.responsible))
                && (this.state.filterData.state === "" || task.status === this.state.filterData.state)
                && (!this.state.filterData.date.custom || format(new Date(task.dueDate), "dd/MM/yyyy") === format(this.state.filterData.date.value, "dd/MM/yyyy"))
            )

        )
            .map((task, i) => {

                return (
                    <TaskCard key={i} task={task} />
                );
            });

        return (
            <div>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            Task Planner
                        </Typography>
                    </Toolbar>


                </AppBar>

                <div className="pageContent">

                    {taskList}

                    <div className="addIcon">

                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <Tooltip title="Add Task" arrow>
                                    <Link to="/create">
                                        <Fab aria-label="Add Task">
                                            <AddIcon />
                                        </Fab>
                                    </Link>
                                </Tooltip>
                            </Grid>


                            <Grid item>
                                <Tooltip title="Filter" arrow>
                                    <Button onClick={this.handleFilterOpen}>
                                        <Fab aria-label="Add Task">
                                            <FilterListIcon />
                                        </Fab>
                                    </Button>
                                </Tooltip>
                            </Grid>


                        </Grid>

                    </div>

                </div>

                <LeftDrawer user={this.props.user} open={this.state.drawerOpen} toggleDrawer={this.toggleDrawer}></LeftDrawer>

                <Dialog open={this.state.filterOpen} onClose={this.handleFilterClose}>
                    <TaskFilter
                        filterData={this.state.filterData}
                        onDateChange={this.handleFilterDataDateChange}
                        onResponsibleChange={this.handleFilterDataResponsibleChange}
                        onStateChange={this.handleFilterDataStateChange}
                        close={this.handleFilterClose}
                        clearAll={this.clearAll}
                    ></TaskFilter>
                </Dialog>
            </div>
        );
    }
}


export default Tasks;