import React from 'react';
import './App.css';

function LoadingText() {
  return <div>Loading ...</div>;
}

class MonsterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {monster: null};
    this.fetchData = this.fetchData.bind(this);
    this.feed = this.feed.bind(this);
  }

  componentDidMount() {
    let intervalId = setInterval(this.fetchData, 1000);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  fetchData() {
    fetch(`/api/monsters/${this.props.monsterId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          monster: data
        });
      });
  }

  feed() {
    console.log('feed me');
    // change the state of the monster

    // update the amount of food
  }

  render() {
    if (this.state.monster === null) {
      return (
        <div className='card'>
          <LoadingText/>
        </div>);
    } else {
      return (
        <div className='card'>
          <div>{this.state.monster.kind.name}</div>
          <img src={this.state.monster.imagePath} 
               alt={this.state.monster.kind.name}/>
          <div>{this.state.monster.hunger}</div>
          <button onClick={this.feed}>Feed</button>
        </div>
      );
    }
  }
}

function MonstersGrid(props) {
  let cards = props.monsters.map(monster => {
    return <MonsterCard key={monster.id.toString()} 
                        monsterId={monster.id}
                        totalFood={props.totalFood}/>
  });
  return <div>{cards}</div>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      totalFood: 10
    };
  }

  componentDidMount() {
    this.fetchMonsters();
  }

  fetchMonsters() {
    fetch('/api/monsters')
      .then(res => res.json())
      .then(data => {
        this.setState({
          monsters: data
        });
      });
  }



  decromentFood() {
    let newFood = this.state.totalFood - 1;

    // get the new food dz
    fetch('/api/food')
      .then(res => res.json())
      .then(data => {
        this.setState({
          totalFood: data
        });
      });
  }

  render() {
    const content = this.state.monsters.length === 0 ?
                      <LoadingText/> :
                      <MonstersGrid monsters={this.state.monsters}/>;
    return (
      <div className="App">
        <header>
          <h1>Monster Zoo!</h1>
          <div>Total Food: {this.state.totalFood}</div>
        </header>
        {content}
      </div>
    );
  }
}

export default App;
