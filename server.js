const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const csvParse = require('csv-parse')
const app = express();
const port = process.env.PORT || 5000;
const pokemon = require('./pokemnon.json');

// add express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


class Monster {
    constructor(id) {
        this.id = id;
        this.name = Monster.makeName();
        this.hunger = 0;
    }
    update() {
        ++ this.hunger;
    }
    feed() {
        this.hunger = 0;
    }
    static makeName() {
        const starts = ['Idoap', 'Col', 'Mor', 'Jol'];
        const middles = ['il', 'om', 'per', 'tek'];
        const ends = ['osaurus', 'urid', 'odon', 'bit'];
        const sample = (xs) => {
            return xs[Math.floor(Math.random() * xs.length)];
        }
        return sample(starts) + sample(middles) + sample(ends);
    }
}

function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

function makeMonsters(startId, count) {
    return [...range(startId, startId + count)]
           .map(id => new Monster(id));
}

// setup the global data model
let nextMonsterId = 0;
let monsters = makeMonsters(nextMonsterId, 3);
let availableFood = 100;

app.get('/monsters', (req, res) => {
    res.json(monsters); 
});

app.get('/monsters/:id', (req, res) => {
    let index = req.params['id'];
    if (index < monsters.length) {
        let monster = monsters[index];
        res.json(monster);
    } else {
        res.status(404).json('monster at index does not exist');
    }
});

app.get('/food', (req, res) => {
    res.json({availableFood:availableFood});
});

app.post('/food/:monsterId', (req, res) => {
    let index = req.params['id'];
    if (index < monsters.length) {
        let monster = monsters[index];
        monster.feed();
        res.json(monster);
    } else {
        res.status(404).json('monster at index does not exist');
    }
});

setInterval(function() {
    console.log('Updating ...')
    // update the monsters
    for (let monster of monsters) {
        monster.update();
    }
}, 5000);

app.listen(port, () => 
    console.log(`Monster Zoo server running on port: ${port}!`));