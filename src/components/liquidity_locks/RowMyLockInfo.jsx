import { Link } from "react-router-dom"
import { formatUnits } from "viem"
import { useToken } from "wagmi"
import usePairName from "../../hooks/usePairName"

const RowMyLockInfo = ({
    lockInfo,
    isLpToken
}) => {
    const { data: tokenData } = useToken({
        address: lockInfo.token,
    })
    const { pairName, fullPairName } = usePairName({ token: lockInfo.token, enabled: isLpToken })
    console.log("lp lock info", lockInfo);
    return (
        <>
            {isLpToken ? (
                pairName &&
                <div className="flex flex-row text-light2 border-b border-dark1 p-3 items-center text-xs">
                    <div className="basis-1/2 flex flex-col gap-1">
                        <p>{lockInfo.description}</p>
                        <p>{pairName}</p>
                        <p>{lockInfo.token}</p>
                    </div>
                    <div className="basis-1/3">
                        <p>{`${formatUnits(lockInfo.amount, tokenData.decimals)} ${tokenData.symbol}`}</p>
                    </div>
                    <div className="basis-1/6 flex flex-row justify-end">
                        <Link to={`/record/${lockInfo.id}`} className="text-red4">
                            View
                        </Link>
                    </div>
                </div>
            ) :
                (
                    <div className="flex flex-row text-light2 border-b border-dark1 p-3 items-center text-xs">
                        <div className="basis-1/2 flex flex-col gap-1">
                            <p>{lockInfo.description}</p>
                            <p>{tokenData.name}</p>
                            <p>{lockInfo.token}</p>
                        </div>
                        <div className="basis-1/3">
                            <p>{`${formatUnits(lockInfo.amount, tokenData.decimals)} ${tokenData.symbol}`}</p>
                        </div>
                        <div className="basis-1/6 flex flex-row justify-end">
                            <Link to={`/record/${lockInfo.id}`} className="text-red4">
                                View
                            </Link>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default RowMyLockInfo