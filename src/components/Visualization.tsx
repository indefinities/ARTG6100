import { Scatterplot } from "./Scatterplot";
import * as d3 from "d3";

export const Visualization = ({ width = 800, height = 800 }) => {
    let data: {
        date: Date,
        eth: number,
    }[] = [];

    d3.csv('/data/desc_transfers.csv',
        (t: any) => {
            return {
                date: new Date(t.tsdate),
                eth: t.eth,
            }
        })
        .then((t: any) => {
            data.push(t);
        })
        .catch((error: any) => {
            console.log(error);
        });

    return (
        <Scatterplot data={data} width={width} height={height} />
    );
};
