import React from 'react';
import { Button, Card, CardMedia, FormControl, TextField, Grid } from '@material-ui/core';
import './Login.css';
import LoginPhoto from "../images/tasklogo.png";
import { Link } from 'react-router-dom'
class Login extends React.Component {


    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e, v){
        console.log(e.target[0].value);
        console.log(e.target[1].value);
        const usernameLocal = localStorage.getItem('username');
        const passwordLocal = localStorage.getItem('password');
        const username = e.target[0].value;
        const password = e.target[1].value;
        if(username === usernameLocal && password === passwordLocal){
            localStorage.setItem('isLoggedIn', true);
        } else {
            localStorage.setItem('isLoggedIn', false);
        }
    }

    render() {

        return (
            <div className="outer">
                <div className="middle">
                    <div className="inner">

                        <Card className="card">

                            <CardMedia className="cardMedia"
                                image={LoginPhoto}
                                title="Task Planner"
                                component="img"
                            />
                            <form action="/tasks" onSubmit={this.handleSubmit}>
                                <div>
                                    <Grid container
                                        direction="column"
                                        justify="center"
                                        alignItems="center"
                                        >
                                        <Grid container justify="center">
                                            <FormControl className="textField">

                                                <TextField fullWidth label="Usuario" variant="filled" />
                                            </FormControl>
                                        </Grid>

                                        <Grid container justify="center">
                                            <FormControl className="textField">

                                                <TextField fullWidth label="Contraseña" variant="filled" type="password" />
                                            </FormControl>
                                        </Grid>

                                        <Grid container justify="center">
                                            <Button className="button" variant="outlined" type="submit">
                                                Log In
                                            </Button>
                                        </Grid>

                                        

                                    </Grid>

                                </div>

                            </form>
                            <Button>Create Account</Button>



                        </Card>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;