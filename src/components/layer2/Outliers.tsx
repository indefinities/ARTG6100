import '../../styles/_base.scss';

type OutliersProps = {
    outliers: {
        name: string,
        img: string,
        eth: number,

    }[],
    data: {
        name: string,
        date: Date,
        eth: number,
    }[];
}
export const Outliers = ({outliers, data}: OutliersProps) => {

    // const dataOutliers = data.

    return (
        <div className="nft__flex">
            {
                outliers.map((item, index) => {
                    return (
                        <div>
                            <img
                                key={index}
                                alt={item.name}
                                src={item.img}
                                width={item.eth/10}/>
                            <span>
                                {item.eth}
                            </span>
                        </div>

                    )

                })
            }
        </div>
    )
}