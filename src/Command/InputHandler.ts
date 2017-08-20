import { Button, DamageButton, JumpButton } from './Command';

class InputHandler {
  buttonX = new JumpButton('X');
  buttonY = new Button('Y');
  buttonO = new Button('O');
  buttonT = new DamageButton('T');

  constructor() {

  }

  handleInput(e: React.SyntheticEvent<HTMLButtonElement>): Button | undefined {
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