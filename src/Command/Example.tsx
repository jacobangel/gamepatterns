import * as React from 'react';
import InputHandler from './InputHandler';

interface CommandProps {
  children: any,
}

const CommandLine = (props: CommandProps) => {
  return (
    <li className="command--line">
      {props.children}
    </li>
  );
}

export interface Props {
  onInput: Function,
  commands: Array<any>,
  myDude: Object,
}

const inputHandler = new InputHandler();

/**
 * show off the command example. 
 * 
 */
class CommandExample extends React.Component<Props, object> {
  defaultProps = {
    commands: [],
    myDude: { name: 'Jacob '}
  }

  handleKey = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { myDude } = this.props;
    const command = inputHandler.handleInput(e);
    if (command) {
      this.props.onInput(command.execute(myDude));
    }
  }

  render() {
    return (
      <div>
            <div>
              <h2>Controls</h2>
                <button onClick={this.handleKey}>X</button>
                <button onClick={this.handleKey}>Y</button>
                <button onClick={this.handleKey}>O</button>
                <button onClick={this.handleKey}>T</button>
            </div>
        <div>
            <h2>Command Log</h2>
            <ul>
                {this.props.commands.map((content, i) => 
                    <CommandLine key={content + i}>{content}</CommandLine>
                 )}
            </ul>
        </div>
      </div>
    );
  }
}

export default CommandExample;