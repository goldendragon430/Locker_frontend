import { useAccount, useContractRead, useToken } from "wagmi"
import Panel from "../common/Panel"
import { useEffect, useState } from "react"
import { formatUnits, zeroAddress } from "viem"
import usePairName from "../../hooks/usePairName"
import { lockerAddress } from "../../utils/consts"
import { lockerAbi } from "../../utils/lockerAbi"

const LockInfo = ({
    token
}) => {
    const [isLpToken, setIsLpToken] = useState(false)
    const { address, isConnected } = useAccount()
    const lockerContract = {
        address: lockerAddress,
        abi: lockerAbi,
    };


    const { data: tokenData, isSuccess: isSuccessToken } = useToken({
        address: token,
        enabled: isConnected
    })

    const { data: cumulativeInfo, isSuccess: isSuccessCumulativeInfo, isLoading } = useContractRead({
        ...lockerContract,
        functionName: "cumulativeLockInfo",
        args: [token],
        enabled: isConnected,
        onSuccess(data) {
            setIsLpToken(data[1] != zeroAddress)
        }
    })


    const { pairName } = usePairName({
        token,
        enabled: isLpToken
    })
    return (
        <div className="rounded-md bg-dark2">
            <Panel
                header="LOCK INFO"
            >
                <div className="flex flex-col w-full gap-1 text-[12px] text-light1 ">
                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                        <p>CUMULATIVE LOCKED AMOUNT</p>
                        <p>{
                            (isSuccessCumulativeInfo && isSuccessToken) &&

                            formatUnits(cumulativeInfo[2].toString(), tokenData.decimals)

                        }</p>
                    </div>

                    {
                        cumulativeInfo && (
                            (isLpToken) ? (
                                <>
                                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                        <p>LIQUIDITY ADDRESS</p>
                                        <p>{tokenData?.address}</p>
                                    </div>
                                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                        <p>PAIR NAME</p>
                                        <p>{pairName}</p>
                                    </div>

                                </>
                            ) :
                                (<>
                                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                        <p>TOKEN ADDRESS</p>
                                        <p>{tokenData?.address}</p>
                                    </div>
                                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                        <p>TOKEN NAME</p>
                                        <p>{tokenData?.name}</p>
                                    </div>
                                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                        <p>TOKEN SYMBOL</p>
                                        <p>{tokenData?.symbol}</p>
                                    </div>
                                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                        <p>TOKEN DECIMAL</p>
                                        <p>{tokenData?.decimals.toString()}</p>
                                    </div>
                                </>
                                )
                        )
                    }

                </div >

            </Panel >
        </div>
    )
}

export default LockInfo