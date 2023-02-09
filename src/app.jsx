import {useEffect, useState} from 'preact/hooks'
import * as d3 from 'd3';
import {createRef} from "preact";

export function App() {
    const size = {
        width: 2000,
        height: 2000,
    }
    const [data, setData] = useState([]);
    const ref = createRef();

    function renderChart() {
        d3.csv("/data/digital_art_nfts.csv", n => {
            setData(data.push(n))
        });

       var svg =  d3.select(ref.current)
           .append('svg')
            .attr("width", size.width)
            .attr("height", size.height)
           .style("background-color", "light-grey");

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cy", 60)
            .attr("cx", (d, i) => { return i * 100 + 30; })
            .attr("r", d => d.price/10);

        console.log(data)
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
