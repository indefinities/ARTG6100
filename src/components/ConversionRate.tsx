export const ConversionRate = () => {

    function getCurrentRate() {
        // Call for fetching ETH to USD conversion using Coinbase API
        fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot')
            .catch()
    }

    return (
        <div className="nft-conversion-rate">
            <div>

            </div>
        </div>
    )
}
