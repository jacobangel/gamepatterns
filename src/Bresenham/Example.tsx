import * as React from 'react';

export interface Props {
}

const RED = [255, 0, 0, 128];
const BLACK = [0, 0, 0, 128];
class Canvas extends React.Component<Props> {
  canvas : HTMLCanvasElement | null = null;

  state = {
    a: [],
    b: [],
  }

  constructor(props : object) {
    super(props); 
  }

  handleCanvasClick = (e:any) => {
    let { pageX, pageY } = e;
    let { offsetLeft, offsetTop } = e.target;
    const { a, b } = this.state;
    if (a.length && b.length) {
      this.setState({ 
        a: [], 
        b: [] 
      });
      return;
    }
    let newPoint = [ pageX - offsetLeft, pageY - offsetTop ];
    if (a.length) {
      this.setState({ b: newPoint})
    } else {
      this.setState({ a: newPoint })
    }
  }

  fillPixel = (ctx: CanvasRenderingContext2D, point: Array<number>, color: Array<number>)=> {
    let imageData = ctx.createImageData(1, 1);
    let data = imageData.data;
    data[0] = color[0];
    data[1] = color[1];
    data[2] = color[2];
    data[3] = color[3];
    ctx.putImageData(imageData, point[0], point[1]);
  }

  drawLink(ctx: CanvasRenderingContext2D, a : Array<number>, b: Array<number>) {
    let [ ax, ay ] = a;
    let [ bx, by ] = b;

    let dx = Math.abs(bx - ax);
    let sx = ax < bx ? 1 : -1;
    let dy = -1 * Math.abs(by - ay);
    let sy = ay < by ? 1 : -1;
    let err = dx + dy;
    let e2;

    while(true) {
      this.fillPixel(ctx, [ax, ay], BLACK);
      if (ax === bx && ay === by) {
        break;
      }
      e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        ax += sx;
      }
      if (e2 <= dx) {
        err += dx;
        ay += sy;
      }
    }

  }

  handleDraw() {
    const { a, b } = this.state;
    if (!a || !b) {
      return;
    }
    if (this.canvas && this.canvas.getContext) {
      let ctx = this.canvas.getContext('2d');
      if (ctx === null) {
        return;
      }
      if (a.length && b.length) {
        this.drawLink(ctx, a, b);
      }
      if (a.length) {
        this.fillPixel(ctx, a, RED);
      }
      if (b.length) {
        this.fillPixel(ctx, b, RED);
      }
    }
  }

  componentDidUpdate() {
    this.handleDraw();
  }

  render () {
    return (
      <div>
        <canvas 
          onClick={this.handleCanvasClick}
          width={200}
          height={200}
          style={{ border: '1px solid red' }}

          ref={(ref) => { this.canvas = ref; }} 
        />
        <div>
         {
          <div><strong>a</strong>: {this.state.a[0]}, {this.state.a[1]}</div>
         } 
         {
          this.state.b && 
          <div><strong>b</strong>: {this.state.b[0]}, {this.state.b[1]}</div>
         }
        </div>
      </div>
    )
  }
}

export default Canvas;