import { useEffect, useState } from "react"
import { useAccount, useContractRead } from "wagmi"
import { lockerAddress } from "../utils/consts"
import { lockerAbi } from "../utils/lockerAbi"

const useCountTokens = ({
    isLpToken
}) => {
    const { address, isConnected } = useAccount();

    const [numTotalTokens, setNumTokens] = useState(0)

    const lockerContract = {
        address: lockerAddress,
        abi: lockerAbi
    };

    const { isSuccess: isCountSuccess } = useContractRead({
        ...lockerContract,
        functionName: isLpToken ? "allLpTokenLockedCount" : "allNormalTokenLockedCount",
        args: [],
        enabled: isConnected,
        onSuccess(data) {
            setNumTokens(parseInt(data.toString()))
            console.log("useCountTokens", data, isLpToken)
        }
    })


    return {
        numTotalTokens,
        isCountSuccess
    }
}

export default useCountTokens