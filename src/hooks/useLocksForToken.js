import { useEffect, useState } from "react"
import { useAccount, useContractRead } from "wagmi"
import { lockerAddress } from "../utils/consts"
import { lockerAbi } from "../utils/lockerAbi"

const useLocksForToken = ({
    token,
    start = 0,
    end = 0,
    enabled = false
}) => {

    const { address, isConnected } = useAccount();

    const lockerContract = {
        address: lockerAddress,
        abi: lockerAbi
    };

    const [locksForToken, setLocksForToken] = useState([])

    const { isSuccess, isLoading } = useContractRead({
        ...lockerContract,
        functionName: 'getLocksForToken',
        args: [token, start, end],
        enabled: enabled && isConnected,
        onSuccess(data) {
            setLocksForToken(data)
        }
    })


    return {
        locksForToken,
        isSuccess,
        isLoading
    }
}

export default useLocksForToken