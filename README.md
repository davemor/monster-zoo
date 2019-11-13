This is a demo application showing some simple ReactJS functions.

## Setup
Install NodeJS 12 base on these [instructions](https://github.com/nodesource/distributions/blob/master/README.md#deb).
```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Install Yarn
```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
```
Then install the client and server dependencies using Yarn:
```bash
yarn
cd client
yarn
cd ..
```
Install nodemon globally:
```bash
sudo npm install -g nodemon
```
Run the application:
```
yarn run dev
```
In the browser, install the react-devtools.  This add a very useful components view to the Dev Tools.

## Dataset
This project uses data from https://www.kaggle.com/vishalsubbiah/pokemon-images-and-types

```javascript
const csvParse = require('csv-parse');

// read in all the pokemon data
const filename = 'pokemon.csv';
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Pokemon file OK: ' + filename);
    console.log('Parsing to array of objects ...');
    csvParse(data, {}, (err, rows) => {
        if (err) throw err;
        let pokemon = rows.map(row => {
            return {
                name: row[0],
                type: row[1],
                subtype: row[2]
            };
        });
        console.log("complete.");
        let jp = JSON.stringify(pokemon);
        fs.writeFile("pokemon.json", jp, (err) => {
            if(err) {
                return console.log(err);
            }
            console.log('Saved!');
        });
        
    });
});
```

## Proxying API Requests in Development
https://create-react-app.dev/docs/proxying-api-requests-in-development/