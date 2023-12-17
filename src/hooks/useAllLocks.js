import { useEffect, useState } from "react"
import { useAccount, useContractRead } from "wagmi"
import { lockerAddress } from "../utils/consts"
import { lockerAbi } from "../utils/lockerAbi"

const useAllLocks = ({
    isLpToken,
    start = 0,
    end = 0,
    enabled = false
}) => {
    const { address, isConnected } = useAccount();

    const lockerContract = {
        address: lockerAddress,
        abi: lockerAbi
    };


    const { data: cumulativeInfo, isSuccess, isLoading } = useContractRead({
        ...lockerContract,
        functionName: isLpToken ? "getCumulativeLpTokenLockInfo" : "getCumulativeNormalTokenLockInfo",
        args: [start, end],
        enabled: enabled && isConnected
    })


    return {
        cumulativeInfo,
        isSuccess,
        isLoading
    }
}

export default useAllLocks