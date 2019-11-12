const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const pokemon = require('./pokemon.json');

// add express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

class Monster {
    constructor(id) {
        this.id = id;
        this.kind = Monster.getKind();
        this.hunger = 0;
        this.imagePath = `./public/images/${this.kind.name}.png`;
        // this.imagePath = "./public/logo192.png";
    }
    update() {
        ++ this.hunger;
    }
    feed() {
        this.hunger = 0;
    }
    static getKind() {
        const index = Math.floor(Math.random() * pokemon.length);
        return pokemon[index];
    }
}

function* range(start, end) {
    for (let i = start; i < end; i++) {
        yield i;
    }
}

function makeMonsters(startId, count) {
    return [...range(startId, startId + count)]
           .map(id => new Monster(id));
}

// setup the global data model
const numInitalMonsters = 8;
let nextMonsterId = 0;
let monsters = makeMonsters(nextMonsterId, numInitalMonsters);
let availableFood = 100;

// print out the monsters
console.log(`Generated ${numInitalMonsters} monsters`);
console.log(monsters);

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

setInterval(() => {
    console.log('Updating ...')
    // update the monsters
    for (let monster of monsters) {
        monster.update();
    }
}, 5000);

app.listen(port, () => 
    console.log(`Monster Zoo server running on port: ${port}!`));