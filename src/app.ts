import express from "express";
import { db } from "./db/models";
import Organization from "./db/models/Organization";
import User from "./db/models/User";

import SequelizeConnection from "./db/SequelizeConnection";

const app = express();

(async () => {
    await SequelizeConnection.connect();

    db.sequelize.sync({
        force: true
    })
})();


app.get('/users', (req, res) => {
    User
        .findAll()
        .then(users => {
            res.send(users);
        })
})

app.post('/users/add', (req, res) => {
    Organization.findOne({
        where: {
            id: 1
        }
    }).then(org => {
        User.create({
            name: 'User 1',
            email: 'test@test.com',
            phone: '1231231231',
            organization: org
        }).then(user => {
            console.log(user.id);
            res.send('User created.')
        })
    })
})

app.get('/organizations', (req, res) => {
    Organization
        .findAll()
        .then(orgs => {
            console.log(orgs);
            res.send(orgs);
        })

})

app.post('/organizations/add', (req, res) => {
    Organization.create({
        name: 'Empresa de prueba',
        code: '123abc'
    }).then(org => {
        console.log(org.id);
        res.send('Organization added');
    })

})

const server = app.listen(8000, () => {
    console.log('Server running on port 8000');
})

export default server;