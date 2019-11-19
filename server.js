const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const pokemon = require('./public/pokemon.json');

// add express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

class Monster {
    constructor(id) {
        this.id = id;
        this.kind = Monster.getKind();
        this.isHungry = false;
        this.imagePath = `/images/${this.kind.name}.png`;
    }
    update() {
        if (!this.isHungry) {
            // get hungry with a 25% chance
            this.isHungry = Math.random() >= 0.75;
        }
    }
    feed() {
        this.isHungry = false;
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

// print out the monsters
console.log(`Generated ${numInitalMonsters} monsters`);
console.log(monsters);

/*
/api/monsters           - GET a list of all the current monster ids
/api/monsters/:id       - GET a specific monster
/api/monsters/:id/food  - POST some food to the monster 
*/

app.get('/api/monsters', (req, res) => {
    let monsterIds = monsters.map(m => m.id);
    res.json(monsterIds); 
});

app.get('/api/monsters/:id', (req, res) => {
    let index = req.params['id'];
    if (index < monsters.length) {
        let monster = monsters[index];
        res.json(monster);
    } else {
        res.status(404).json('monster at index does not exist');
    }
});

app.get('/api/monsters/:id/food', (req, res) => {
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

app.use(express.static(__dirname + '/public'));

app.listen(port, () => 
    console.log(`Monster Zoo server running on port: ${port}!`));