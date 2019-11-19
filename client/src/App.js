import React from 'react';
import './App.css';

function capitalise(text) {
  return text.charAt(0).toUpperCase() + text.substring(1);
}

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
    fetch(`/api/monsters/${this.props.monsterId}/food`)
      .then(res => res.json())
      .then(data => {
        this.setState({
         monster: data
        });
      });
  }

  render() {
    if (this.state.monster === null) {
      return (
        <div className='card'>
          <LoadingText/>
        </div>);
    } else {
      let cardStyle = this.state.monster.isHungry ? 'hungry-card' : 'card';
      let hungryText = this.state.monster.isHungry ? 'Hungry' : 'Not Hungry';
      return (
        <div className={cardStyle}>
          <div>{capitalise(this.state.monster.kind.name)}</div>
          <img src={this.state.monster.imagePath} 
               alt={this.state.monster.kind.name}/>
          <div>{hungryText}</div>
          <button onClick={this.feed}>Feed</button>
        </div>
      );
    }
  }
}

function MonstersGrid(props) {
  let cards = props.monsters.map(monsterId => {
    return <MonsterCard key={monsterId.toString()} 
                        monsterId={monsterId}/>
  });
  return <div>{cards}</div>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: []
    };
  }

  componentDidMount() {
    this.fetchMonsters();
  }

  fetchMonsters() {
    fetch('/api/monsters')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          monsters: data
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
        </header>
        {content}
      </div>
    );
  }
}

export default App;
