import { Network } from "./Network";
import * as d3 from "d3";
import { useEffect, useState } from "react";

export const Layer0 = ({ width = 800, height = 800 }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        d3.csv('/data/nfts.csv',
            (n: any) => {
                return {
                    address: n.address,
                    name: n.name,
                }
            })
            .then((n: any) => {
                setNodes(n);
            })
            .catch((error: any) => {
                console.log(error);
            });

        d3.csv('/data/transfers.csv',
            (t: any) => {
                return {
                    from: t.from_address,
                    to: t.to_address,
                }
            })
            .then((e: any) => {
                setEdges(e);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [])

    return (
        <Network
            nodes={nodes}
            edges={edges}
            width={width}
            height={height}
        />
    );
};
