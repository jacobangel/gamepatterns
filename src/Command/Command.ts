export interface Command {
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

export class Button implements Command {
  name: String;

  constructor(name: String) {
    this.name = name;
  }

  execute(actor: any): CommandResult {
    let value = `Button ${this.name} was pressed.`;
    if (actor.name) {
      value = `Button ${this.name} pressed, targeting: ${actor.name}`;
    } 
    return {
      type: CommandTypes.Speak,
      value,
    };
  }
}
export class DamageButton extends Button {
  execute(actor: any): CommandResult {
    return {
      type: CommandTypes.Damage,
      value: Math.floor(Math.random() * 10),
    }
  }
}

export default { DamageButton, Button, CommandTypes }