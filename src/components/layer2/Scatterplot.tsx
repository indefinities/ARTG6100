import * as d3 from "d3";
import { YAxis } from "./YAxis";
import { XAxis } from "./XAxis";

const MARGIN = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};

type ScatterplotProps = {
    width: number;
    height: number;
    data: {
        date: Date,
        eth: number,
    }[];
};

export const Scatterplot = ({ width, height, data }: ScatterplotProps) => {
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const yScale = d3.scaleLinear()
                    .domain([0, 2275])
                    .range([boundsHeight, 0]);

    const xScale = d3.scaleTime()
        .domain([new Date('2021-04-01'), new Date('2021-10-01')])
        .range([0, boundsWidth]);

    const allShapes = data.map((d, i) => {
        return (
            <rect
                key={i}
                width={5}
                height={5}
                x={xScale(d.date)}
                y={yScale(d.eth)}
                fill="white"
                fillOpacity={0.5}
            />
        );
    });

    return (
        <div>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    <YAxis yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

                    <g transform={`translate(0, ${boundsHeight})`}>
                        <XAxis
                            xScale={xScale}
                            pixelsPerTick={50}
                            height={boundsHeight}
                        />
                    </g>

                    { allShapes }
                </g>
            </svg>
        </div>
    );
};
