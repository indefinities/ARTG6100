import * as d3 from "d3";

const MARGIN = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};

type NetworkProps = {
    width: number;
    height: number;
    edges: {
        from: String;
        to: String;
    }[];
    nodes: {
        address: String;
        name: String;
    }[];
};

export const Network = ({ width, height, edges, nodes }: NetworkProps) => {
    const links = edges.map((n, i) => {
        return (
            <line
                stroke={"white"}
            />
        );
    });

    const circles = nodes.map((n, i) => {
        return (
            <circle
                key={i}
                width={5}
                height={5}
                cx={}
                cy={}
                fill="white"
                fillOpacity={1}
            />
        );
    });



    return (
        <div>
            {circles}
        </div>
    )
};