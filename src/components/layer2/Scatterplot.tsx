import * as d3 from "d3";
import { YAxis } from "./YAxis";
import { XAxis } from "./XAxis";
import { InteractionData, Tooltip } from "./Tooltip";
import {useEffect, useState} from "react";

const MARGIN = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};

type DataPoint = {
    x: number;
    y: number;
    size: number;
    group: string;
    subGroup: string;
};

type ScatterplotProps = {
    width: number;
    height: number;
    data: {
        name: string,
        date: Date,
        eth: number,
    }[];
    outliers: {
       name: string,
       file: string,
    }[];
    exploded: boolean;
};

export const Scatterplot = ({ width, height, data, outliers, exploded }: ScatterplotProps) => {
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;
    const [hovered, setHovered] = useState<InteractionData | null>(null);


    const yScale = d3.scaleLinear()
                    .domain([0, 2250])
                    .range([boundsHeight, 0]);

    const xScale = d3.scaleTime()
        .domain([new Date('2021-04-01'), new Date('2021-10-01')])
        .range([0, boundsWidth]);

    const counts = d3.rollup(
        data,
        v => v.length,
        d => d.name
    );



    const allShapes = data.map((d, i) => {
        const pixSize: number = exploded ? (counts.get(d.name) as number)/10 : 5;

        return (
            <rect
                key={i}
                width={pixSize}
                height={pixSize}
                x={xScale(d.date)}
                y={yScale(d.eth)}
                fill="white"
                fillOpacity={0.5}
                onMouseEnter={() => // Each time the circle is hovered over...
                    setHovered({ // ... update the interactionData state with the circle information
                        xPos: xScale(d.date),
                        yPos: yScale(d.eth),
                        name: d.name,
                    })
                }
                onMouseLeave={() => setHovered(null)}
            />
        );
    });

    return (
        <div className={"nft__flex"}>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    <YAxis yScale={yScale} pixelsPerTick={50} width={boundsWidth} />

                    <g transform={`translate(0, ${boundsHeight})`}>
                        <XAxis
                            xScale={xScale}
                            pixelsPerTick={100}
                            height={boundsHeight}
                        />
                    </g>

                    { allShapes }
                </g>
            </svg>

            {/* Tooltip */}
            <div
                style={{
                    width: boundsWidth,
                    height: boundsHeight,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    marginLeft: MARGIN.left,
                    marginTop: MARGIN.top,
                }}
            >
                <Tooltip interactionData={hovered} />
            </div>

            {/* display the outliers images */}
            <div>
                { hovered !== null ?
                    outliers.some(o => o.name === hovered.name) ? (
                        <div>
                            <h2>{hovered.name}</h2>
                            <img className={"nft__img"} src={`/nfts/${outliers[outliers.findIndex(o => o.name === hovered.name)].file}`}/>
                        </div>
                    ) : (
                        <div />
                    ) :
                    <div />
                }
            </div>
        </div>
    );
};
