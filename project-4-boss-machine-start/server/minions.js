const express = require('express');
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('./db.js');

const minionsRouter = express.Router();


//return all minions from the database
minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.status(200).send(minions);
})

//return one minion from the db
minionsRouter.get('/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if(minion){
        res.status(200).send(minion);
    }else {
        res.status(404).send();
    }
})

//add minion to database
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
})

minionsRouter.put('/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if(minion){
        let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
        res.send(updatedMinionInstance);
    }else {
        res.status(404).send();
    }
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    let deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if(deleted){
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})


module.exports = minionsRouter;