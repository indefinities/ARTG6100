import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import Sketch from "react-p5";

export function App() {
    let data;

    function setup(p5, canvasParentRef) {
        p5.createCanvas(800, 800).parent(
            canvasParentRef
        );
        data = p5.loadTable('/data/nft_sales.csv', 'csv', 'header');
    }

    function draw(p5) {
        for (let r = 0; r < data.getRowCount(); r++) {
            for (let c = 0; c < data.getColumnCount(); c++) {
                console.log(data.getString(r, c))
            }
        }
    }

  return (
    <>
      <Sketch
      setup={setup}
      draw={draw}/>
    </>
  )
}
