import { useEffect, useState } from "react";
import { Scatterplot } from "./Scatterplot";
import { Outliers } from './Outliers';
import { outliers } from '../../data/outliers';
import * as d3 from "d3";


export const Layer2 = ({ width = 1500, height = 800 }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        d3.csv('/data/transfers.csv',
            (t: any) => {
                return {
                    date: new Date(t.tsdate),
                    name: t.name,
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
        <div>
            <p>
                Throughout the year of 2021, non-fungible tokens have taken a uprising within the crypto market.
                Once an NFT is purchased, owners have the ability to transfer those NFTs for a chosen amount of Ethereum currency.
                
            </p>
            {/*<Outliers outliers={outliers} data={data} />*/}
            <Scatterplot data={data} width={width} height={height} />
        </div>
    );
};
