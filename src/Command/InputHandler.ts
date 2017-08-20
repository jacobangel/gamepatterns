
interface Command {
  execute(actor: any): CommandResult;
}
export type CommandResult = {
  type: CommandTypes,
  value: number | String
}
export enum CommandTypes {
  Damage,
  NameChange,
  Speak,
}



class Button implements Command {
  name: String;

  constructor(name: String) {
    this.name = name;
  }

  execute(actor: any): CommandResult {
    if (actor.name) {
      return {
        type: CommandTypes.Speak,
        value: `Button ${this.name} pressed, targeting: ${actor.name}`,
      }
    } 
    return {
      type: CommandTypes.Speak,
      value: `Button ${this.name} was pressed.`
    };
  }
}
class DamageButton extends Button {
  execute(actor: any): CommandResult {
    return {
      type: CommandTypes.Damage,
      value: Math.floor(Math.random() * 10),
    }
  }
}
class InputHandler {
  buttonX = new Button('X');
  buttonY = new Button('Y');
  buttonO = new Button('O');
  buttonT = new DamageButton('T');

  constructor() {

  }

  handleInput(e: React.SyntheticEvent<HTMLButtonElement>): Button | undefined {
    console.log(e);
    const value = String(e.currentTarget.innerHTML).trim();
    if (value === 'X') {
      return this.buttonX;
    } 

    if (value === 'Y') {
      return this.buttonY;
    } 

    if (value === 'O') {
      return this.buttonO;
    } 

    if (value === 'T') {
      return this.buttonT;
    }
    return undefined;
  }
}

export default InputHandler;