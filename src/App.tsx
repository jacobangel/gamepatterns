import * as React from 'react';
import './App.css';
import CommandExample from './Command/Example';
import { CommandTypes, CommandResult } from './Command/Command';

type Actor = {
  name: string,
  hp: number,
}

interface ActorProps {
  name: string,
  hp: number,
  onEdit: Function,
}

interface State {
  actor: Actor,
  commands: Array<String>,
  isEditing: Boolean,
  stagedActor: Actor | null,
}

const ActorViewer = (props: ActorProps) => {
  const { hp, name } = props;
  return (
    <div>
      <button onClick={() => {
        props.onEdit();
      }}>Edit</button>
      <h2>Hero: {name}</h2>
      <ul>
        <li>Hp: {hp}</li>
        <li>Status: {hp < 1 ? 
          (hp < 10 ? 'Super dead' :'Plain dead') : 
          'Still kickin\' rad'}
        </li>
      </ul>
    </div>
  );
}

const ActorEditor = ({ name, onChange, onSave, onCancel }: any) => {
  return (
    <div>
      <input type="text" value={name} onChange={onChange} />
      <input type="button" value="Save" onClick={onSave} />
      <input type="button" value="Cancel" onClick={onCancel} />
    </div>
  );
}

class App extends React.Component {
  state : State = {
    isEditing: false,
    actor: {
      name: 'Comanchenota Beunista',
      hp: 100,
    },
    stagedActor: null,
    commands: [],
  }

  handleInput = (result: CommandResult) => { 
    // if i were to extract this i'd really be inventing the wheel, huh.
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
        case CommandTypes.Jump:
          const prevCommands = prevState.commands || [];
          return {
            commands: [ ...prevCommands, result.value ]
          } 

        default:
         return {}
      }
    });
  }

  handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState(({ isEditing }: State) => {
      return { isEditing: !isEditing };
    })
  }

  handleCancel = (e : React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ 
      isEditing: false, 
      actor: {  
        ...this.state.actor, 
      },
      stagedActor: null,
    });
  }

  handleSave = (e : React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ 
      isEditing: false, 
      actor: { ...this.state.actor, ...this.state.stagedActor },
      stagedActor: {}
    });
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    this.setState({
      stagedActor: {
        ...this.state.actor,
       name: target.value,
      }
    })
  }

  render() {
    const { actor, commands, isEditing, stagedActor } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h1>Game Pattern Examples</h1>
        </div>
        {isEditing ? 
          <ActorEditor {...{...actor, ...stagedActor}}
            onChange={this.handleChange}
            onCancel={this.handleCancel} 
            onSave={this.handleSave} 
          /> :
          <ActorViewer {...actor} onEdit={this.handleEdit} />
        }
        <CommandExample 
          commands={commands} 
          myDude={actor} 
          onInput={this.handleInput}
        />
      </div>
    );
  }
}

export default App;
