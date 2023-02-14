import {createRef} from "preact";
import {useEffect} from 'preact/hooks'
import * as d3 from 'd3';


export function App() {
    const size = {
        width: 1000,
        height: 1000,
    }
    const nfts = [];
    const ref = createRef();

    function renderChart() {
        d3.csv("/data/digital_art_nfts.csv", n => {
            nfts.push(n);
        });


       const svg =  d3.select(ref.current)
           .append('svg')
            .attr("width", size.width)
            .attr("height", size.height)
           .data(nfts)
           .enter();
    }

    useEffect(() => {
        renderChart();
    }, []);

    return (
        <>
            <div ref={ref}>
            </div>
        </>
    )
}
