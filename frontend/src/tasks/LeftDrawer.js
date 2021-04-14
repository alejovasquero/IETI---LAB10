import React from 'react';
import { Avatar, AvatarListItem, Button, Card, CardContent, Drawer, Grid, IconButton, ListItem, Typography, withStyles } from '@material-ui/core';
import TaskCard from './TaskCard';
import LoginPhoto from "../images/tasklogo.png";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
const styles = (theme) => ({

    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
});

class LeftDrawer extends React.Component {


    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    close(e) {
        console.log(e)
        console.log(this.props.toggleDrawer)
        this.props.toggleDrawer(false)(e);
    }

    render() {

        const { classes } = this.props;

        return (
            <div>

                <React.Fragment>
                    <Drawer open={this.props.open} onClose={this.close}>
                        <Card className="userSection">
                            <CardContent>
                                <Grid container direction="row" spacing={6}>
                                    <Grid item>
                                        <Avatar alt="David Vasquez" src={LoginPhoto} className={classes.large} />

                                    </Grid>

                                    <Grid item direction="column" justify="center">
                                        <Typography>{this.props.user.name}</Typography>
                                        <Typography>{this.props.user.email}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid container direction="row">
                                    <Grid>
                                        <Link to="/user">
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                    </Grid>

                                    <Grid direction="column" justify="center">
                                        <IconButton onClick={this.close}>
                                            <ChevronLeftIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>


                            </CardContent>


                        </Card>

                        <div style={{ position: 'absolute', top: '90vh', margin: "auto" }}>
                            <ListItem>
                                <Link to="/">
                                    <Button type="button">
                                        <Avatar>
                                            <ExitToAppIcon style={{ color: 'black' }} />
                                        </Avatar>
                                        Log out
                                    </Button>
                                </Link>
                            </ListItem>
                        </div>
                    </Drawer>
                </React.Fragment>

            </div>


        );
    }
}


export default withStyles(styles)(LeftDrawer);