const express = require('express');
const router = express.Router();

const data = require('../data/characters');

router.get('/', (req, res) => {
    res.send(data.characters.getCharacters());
});

router.get('/name', (req, res) => {
    const result = data.characters.findCharacterByName(req.query.name);

    if(result)
        res.send(result);
    else
        res.send("No existe ese personaje");
});

// /characterByNameAndLevel/Fry/23
router.get('/:name/:level', (req, res) => {
    const result = data.characters.findCharacterByName(req.params.name);

    if(result)
        res.send(result);
    else
        res.send(`No existe ese personaje con ese nivel ${req.params.level}`);
});

router.get('/profile', (req, res) => {
    const result = data.characters.findCharactersByProfile(req.query.profile);

    if(result)
        res.send(result);
    else
        res.send("No hay personajes con ese perfil");
});

router.post('/new', (req, res) => {
    data.characters.addNewCharacter(req.body);

    res.send("Ook");
});

router.put('/update', (req, res) => {});

router.delete('/delete', (req, res) => {});

module.exports = router;