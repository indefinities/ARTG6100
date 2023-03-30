import * as d3 from "d3";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

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
        .domain([new Date('2021-04-01'), new Date('2021-12-01')])
        .range([0, boundsWidth]);

    // Build the shapes
    const allShapes = data.map((d, i) => {
        return (
            <circle
                key={i}
                r={13}
                cx={xScale(d.eth)}
                cy={yScale(d.date)}
                opacity={1}
                stroke="#cb1dd1"
                fill="#cb1dd1"
                fillOpacity={0.2}
                strokeWidth={1}
            />
        );
    });

    return (
        <div>
            <svg width={width} height={height}>
                {/* first group is for the violin and box shapes */}
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    {/* Y axis */}
                    <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

                    {/* X axis, use an additional translation to appear at the bottom */}
                    {/*<g transform={`translate(0, ${boundsHeight})`}>*/}
                    {/*    <AxisBottom*/}
                    {/*        xScale={xScale}*/}
                    {/*        pixelsPerTick={40}*/}
                    {/*        height={boundsHeight}*/}
                    {/*    />*/}
                    {/*</g>*/}

                    {/* Circles */}
                    {allShapes}
                </g>
            </svg>
        </div>
    );
};
