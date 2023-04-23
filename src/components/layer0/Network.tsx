import * as d3 from "d3";
import {useEffect} from "react";

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
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const links = edges.map((n, i) => {
        return (
            <line
                stroke={"white"}
            />
        );
    });

    const node = nodes.map((n, i) => {
        return (
            <circle
                key={i}
                width={5}
                height={5}
                fill="white"
                fillOpacity={1}
            />
        );
    });

    useEffect(() => {
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink()
                .id((n:any) => { return n.address })
                .links(edges))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, height / 2));

        // simulation.on("end", () => {
        //     links
        //         .attr("x1", )
        //         .attr("y1", (d: any) => { return d.source.y; })
        //         .attr("x2", (d: any) =>  { return d.target.x; })
        //         .attr("y2", (d: any) => { return d.target.y; });
        //
        //     node
        //         .attr("cx", (d: any) =>  { return d.x+6; })
        //         .attr("cy", (d: any) =>  { return d.y-6; });
        // });

    }, [nodes]);


    return (
        <div>
            <svg width={width} height={height}>
            {node}
            </svg>
        </div>
    )
};