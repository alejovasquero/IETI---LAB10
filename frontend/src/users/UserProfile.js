import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { IconButton } from '@material-ui/core';
const styles = (theme) => ({
    root: {
        padding: theme.spacing(7),
    }
});
class UserProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = { error: false }
        this.handleSave = this.handleSave.bind(this)
    }

    handleSave(event) {
        event.preventDefault();
        let fpass = event.target[2].value;
        let fconpass = event.target[4].value;
        console.log(fpass)
        console.log(fconpass)
        if (fpass !== fconpass) {
            this.setState({ error: true });
            return;
        }
        this.setState({ error: false });
        let newConfig = {
            name: event.target[0].value,
            email: event.target[1].value,
            password: event.target[2].value,
        }
        console.log(JSON.stringify(newConfig))
        this.props.onConfigSubmit(newConfig);
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
                <form onSubmit={this.handleSave} >

                    <FormControl margin="normal" required fullWidth onChange={this.handleName}>
                        <InputLabel htmlFor="password">Full name</InputLabel>
                        <Input id="name" name="name" type="text" autoComplete="email" />
                    </FormControl>

                    <FormControl margin="normal" required fullWidth onChange={this.handleMail}>
                        <InputLabel htmlFor="email">email</InputLabel>
                        <Input id="email" name="email" autoComplete="email" autoFocus />
                    </FormControl>

                    <FormControl margin="normal" required fullWidth onChange={this.handlePassword}>
                        <TextField
                            error={this.state.error}
                            label="password"
                            helperText={"Contraseñas desiguales." && this.state.error}
                            variant="outlined"
                            type="password"
                        />
                    </FormControl>

                    <FormControl margin="normal" required fullWidth onChange={this.handleConfirmPassword}>
                        <TextField
                            error={this.state.error}
                            label="confirm password"
                            helperText={"Contraseñas desiguales." && this.state.error}
                            variant="outlined"
                            type="password"
                        />
                    </FormControl>

                    <div style={{ textAlign: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="submit"
                        >
                            Save
                                </Button><br />
                    </div>
                </form>
            </div>

        )

    }
}

export default withStyles(styles)(UserProfile);