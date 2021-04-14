import axios from 'axios';

var token = localStorage.getItem("token");

var instance = axios.create({
    baseURL: 'http://localhost:8080/'
});


export const get = (path, data, params) => {
    return new Promise((resolve, reject) => {
        instance.get(path, data, params)
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err)
            });
    });
}

export const post = (path, data, params) => {
    return new Promise((resolve, reject) => {
        instance.post(path, data, params)
            .then(res => {
                console.log(res)
                resolve(res.data);
            }).catch(err => {
                reject(err)
            });
    });
}


export const jwtRequest = (user, pass) => {

    post("/user/login", {
        username: user,
        password: pass
    }).then(function (response) {
        token = response.accessToken;
        localStorage.setItem("token", token);
        instance = axios.create({
            baseURL: 'http://localhost:8080/',
            timeout: 1000,
            headers: { 'Authorization': 'Bearer ' + token }
        });

    }).catch(function (error) {
        console.log(error);
        localStorage.removeItem("token");
    });


}