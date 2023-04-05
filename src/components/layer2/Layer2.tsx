import { Scatterplot } from "./Scatterplot";
import * as d3 from "d3";
import { useEffect, useState } from "react";

export const Layer2 = ({ width = 1000, height = 800 }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        d3.csv('/data/transfers.csv',
            (t: any) => {
                return {
                    date: new Date(t.tsdate),
                    eth: t.eth,
                }
            })
            .then((d: any) => {
                setData(d);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [])

    return (
        <Scatterplot data={data} width={width} height={height} />
    );
};
