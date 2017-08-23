import * as React from 'react';

export interface Props {
}

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
    console.log(e);
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

  fillPixel = (ctx: CanvasRenderingContext2D, point: Array<number>) => {
    let imageData = ctx.createImageData(1, 1);
    let data = imageData.data;
    data[0] = 0;
    data[1] = 0;
    data[2] = 0;
    data[3] = 128;
    console.log(imageData, point);
    ctx.putImageData(imageData, point[0], point[1]);
  }

  handleDraw() {
    const { a, b } = this.state;
    console.log('drawring');
    if (!a || !b) {
      return;
    }
    if (this.canvas && this.canvas.getContext) {
      let ctx = this.canvas.getContext('2d');
      if (ctx === null) {
        return;
      }
      if (a.length) {
        this.fillPixel(ctx, a);
      }
      if (b.length) {
        this.fillPixel(ctx, b);
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