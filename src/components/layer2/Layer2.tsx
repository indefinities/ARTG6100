import { useEffect, useState } from "react";
import { Scatterplot } from "./Scatterplot";
import { outliers } from '../../data/outliers';
import * as d3 from "d3";
import {InteractionData} from "./Tooltip";


export const Layer2 = ({height = 800 }) => {
    const [data, setData] = useState([]);
    let [width, setWidth] = useState(1000);
    const [exploded, setExploded] = useState(false);

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
    }, [width])

    return (
        <div>
            <p>
                Throughout the year of 2021, non-fungible tokens have taken a uprising within the crypto market.
                Once an NFT is purchased, owners have the ability to transfer those NFTs for a chosen amount of Ethereum currency.
            </p>
            <div className={'nft__flex'}>
                <button onClick={() => setExploded(!exploded)}>{exploded ? 'NORMAL VIEW' : 'EXPLODED VIEW'}</button>
                <button onClick={() => setWidth(width += 500)}>ZOOM IN</button>
                <button onClick={() => setWidth(width -= 500)}>ZOOM OUT</button>
            </div>

            <Scatterplot data={data} outliers={outliers} exploded={exploded} width={width} height={height} />
        </div>
    );
};
