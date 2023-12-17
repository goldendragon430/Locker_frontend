import { useAccount, useContractRead, useToken } from "wagmi"
import { lockerContract } from "../../utils/consts"
import { zeroAddress } from "viem"
import usePairName from "../../hooks/usePairName"
import Panel from "../common/Panel"
import { useState } from "react"
const PairOrTokenInfo = ({
    token
}) => {
    const { isConnected } = useAccount()

    const [isLpToken, setIsLpToken] = useState(false)


    const { pairName } = usePairName({ token, isLpToken })

    const { data: dataToken, isSuccessToken } = useToken({
        address: token,
        enabled: isConnected && token
    })


    return (
        <Panel
            header={isLpToken ? "Pair Info" : "Token Info"}
            footer={false}
        >
            <div className="flex flex-col w-full gap-1 text-[12px] text-light1 ">

                {
                    (isLpToken) ? (
                        <>
                            <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                <p>Pair Address</p>
                                <p>{token}</p>
                            </div>
                            <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                <p>PAIR NAME</p>
                                <p>{pairName}</p>
                            </div>
                            <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                <p>Token</p>
                                <p>{dataToken?.name}</p>
                            </div>

                        </>
                    ) :
                        (<>
                            <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                <p>TOKEN ADDRESS</p>
                                <p>{dataToken?.address}</p>
                            </div>
                            <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                <p>TOKEN NAME</p>
                                <p>{dataToken?.name}</p>
                            </div>
                            <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                <p>TOKEN SYMBOL</p>
                                <p>{dataToken?.symbol}</p>
                            </div>
                            <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                                <p>TOKEN DECIMAL</p>
                                <p>{dataToken?.decimals.toString()}</p>
                            </div>
                        </>
                        )
                }
            </div>
        </Panel>
    )
}

export default PairOrTokenInfo