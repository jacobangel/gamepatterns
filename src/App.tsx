import * as React from 'react';
import './App.css';
import CommandExample from './CommandExample';
import { CommandTypes, CommandResult } from './InputHandler';

type Actor = {
  name: String,
  hp: number,
}

interface State {
  actor: Actor,
  commands: Array<String>
}

const Actor = ({ hp, name }: Actor) => {
  return (
    <div>
      <h2>Hero: {name}</h2>
      <ul>
        <li>Hp: {hp}</li>
        <li>Status: {hp < 1 ? (hp < 10 ? 'Super dead' :'Plain dead') : 'Still kickin\' rad'}</li>
      </ul>
    </div>
  );
}

class App extends React.Component {
  state : State = {
    actor: {
      name: 'Comanchenota Beunista',
      hp: 100,
    },
    commands: []
  }

  handleInput = (result: CommandResult) => { 
    if (result.type === CommandTypes.Speak) {
    
    }
    this.setState((prevState: State, props) => {
      switch (result.type) {
        case CommandTypes.NameChange:
          return {
            actor: { 
              ...prevState.actor, 
              name: result.value, 
           }
          } 
        case CommandTypes.Damage: 
          if (typeof result.value !== 'number') {
            return {};
          }
          return {
            commands: [...prevState.commands, `Ugh, ${prevState.actor.name} took ${result.value} damage!!!`],
            actor: { 
               ...prevState.actor, 
               hp: prevState.actor.hp - result.value 
            }
          }
        case CommandTypes.Speak:
          const prevCommands = prevState.commands || [];
          return {
            commands: [ ...prevCommands, result.value ]
          } 

        default:
         return {}
      }
    });
  }

  render() {
    const { actor, commands } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h1>Game Pattern Examples</h1>
        </div>
        <Actor {...actor} />
        <CommandExample 
          commands={commands} 
          myDude={actor} 
          onInput={this.handleInput}/>
      </div>
    );
  }
}

export default App;
