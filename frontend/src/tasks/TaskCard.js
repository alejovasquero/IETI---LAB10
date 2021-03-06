import React from 'react';
import { Card, Grid, withStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import "./Tasks.css"
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import moment from 'moment';
import DescriptionIcon from '@material-ui/icons/Description';
import { ExternalLink } from 'react-external-link';

const styles = (theme) => ({

    root: {
        margin: "auto",
    },

    image: {
        padding: theme.spacing(2),
        maxWidth: "400px"
    }
});

class TaskCard extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Card className="mainCard" variant="outlined">
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >

                        <Grid>
                            <div className="container">
                                <CardContent className="content">
                                    <Typography color="textPrimary" gutterBottom>
                                        {this.props.task.description}
                                    </Typography>

                                    <Typography color="textSecondary" gutterBottom>
                                        {this.props.task.status}
                                    </Typography>

                                    <Typography color="textSecondary" gutterBottom>
                                        {this.props.task.responsible.name}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        {moment(new Date(this.props.task.dueDate)).format('DD-MM-YYYY')}
                                    </Typography>
                                </CardContent>
                            </div>

                        </Grid>
                        <Grid>
                            {this.props.task.status === "To Do" ? <ErrorIcon /> : this.props.task.status === "Ready" ? <CheckIcon /> : <PlayCircleFilledWhiteIcon />}
                        </Grid>

                        <td>{this.props.task.fileUrl && !this.props.task.fileUrl.endsWith('pdf') ? <img className={classes.image} src={this.props.task.fileUrl} /> :
                            <ExternalLink href={this.props.task.fileUrl}><DescriptionIcon/></ExternalLink>}</td>
                    </Grid>
                </Card>
            </div>
        );
    }
}


export default withStyles(styles)(TaskCard);