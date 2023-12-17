import { Link } from "react-router-dom"
import { formatUnits } from "viem"
import { useToken } from "wagmi"
import usePairName from "../../hooks/usePairName"

const RowCumulativeInfo = ({
    cumulativeInfo,
    isLpToken
}) => {
    const { data: tokenData, isSuccess } = useToken({
        address: cumulativeInfo.token,
    })

    const { pairName, fullPairName } = usePairName({ token: cumulativeInfo.token, enabled: isLpToken })
    return (
        <>
            {
                isLpToken ?
                    (pairName &&
                        <div className="flex flex-row text-light2 border-b border-dark1 p-3 items-center text-xs">
                            <div className="basis-1/2 flex flex-col gap-1">
                                <p>{fullPairName}</p>
                                <p>{pairName}</p>
                                <p>{cumulativeInfo.token}</p>
                            </div>
                            <div className="basis-1/3">
                                {
                                    isSuccess &&
                                    <p>{`${formatUnits(cumulativeInfo.amount, tokenData.decimals)} ${tokenData.symbol}`}</p>
                                }
                            </div>
                            <div className="basis-1/6 flex flex-row justify-end">
                                <Link to={`/detail/${cumulativeInfo.token}`} className="text-red4">
                                    View
                                </Link>
                            </div>
                        </div>)
                    :
                    <div className="flex flex-row text-light2 border-b border-dark1 p-3 items-center text-xs">
                        <div className="basis-1/2 flex flex-col gap-1">
                            <p>{tokenData?.name}</p>
                            <p>{tokenData?.symbol}</p>
                            <p>{cumulativeInfo.token}</p>
                        </div>
                        <div className="basis-1/3">
                            {
                                isSuccess &&
                                <p>{`${formatUnits(cumulativeInfo.amount, tokenData.decimals)} ${tokenData.symbol}`}</p>
                            }
                        </div>
                        <div className="basis-1/6 flex flex-row justify-end">
                            <Link to={`/detail/${cumulativeInfo.token}`} className="text-red4">
                                View
                            </Link>
                        </div>
                    </div>
            }
        </>
    )
}

export default RowCumulativeInfo