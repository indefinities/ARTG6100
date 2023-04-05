import { useMemo } from "react";
import {ScaleTime} from "d3";

type AxisBottomProps = {
    xScale: ScaleTime<number, number>;
    pixelsPerTick: number;
    height: number;
};

// tick length
const TICK_LENGTH = 10;

export const XAxis = ({ xScale, pixelsPerTick, height }: AxisBottomProps) => {
    const range = xScale.range();

    const ticks = useMemo(() => {
        const width = range[1] - range[0];
        const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

        return xScale.ticks(numberOfTicksTarget).map((date: Date, index: number) => ({
            date,
            index,
            xOffset: xScale(date),
        }));
    }, [xScale]);

    return (
        <>
            {/* Ticks and labels */}
            {ticks.map(({ date, index, xOffset }) => (
                <g key={index} transform={`translate(${xOffset}, 0)`}>
                    <line
                        y1={TICK_LENGTH}
                        y2={-height - TICK_LENGTH}
                        stroke="currentColor" />
                    <text
                        key={index}
                        style={{
                            fontSize: "10px",
                            textAnchor: "middle",
                            transform: "translateY(20px)",
                            fill: "white",
                        }}
                    >
                        {date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }).replace('/', '-')}
                    </text>
                </g>
            ))}
        </>
    );
};