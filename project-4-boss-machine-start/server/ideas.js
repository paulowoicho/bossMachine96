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

const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.status(200).send(ideas);
})

//return one idea from the db
ideasRouter.get('/:ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId);
    if(idea){
        res.status(200).send(idea);
    }else {
        res.status(404).send();
    }
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
})

ideasRouter.put('/:ideasId', checkMillionDollarIdea, (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideasId);
    if(idea){
        let updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body);
        res.send(updatedIdeaInstance);
    }else {
        res.status(404).send();
    }
} )

ideasRouter.delete('/:ideasId', (req, res, next) => {
    let deleted = deleteFromDatabasebyId('ideas', req.params.ideasId);
    if(deleted){
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})


module.exports = ideasRouter;