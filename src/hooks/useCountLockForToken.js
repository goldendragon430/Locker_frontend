import { useEffect, useState } from "react"
import { useAccount, useContractRead } from "wagmi"
import { lockerAddress } from "../utils/consts"
import { lockerAbi } from "../utils/lockerAbi"
import { isAddress } from "viem"

const useCountLockForToken = ({
    token
}) => {
    const { address, isConnected } = useAccount();

    const [numLockForToken, setNumLockForToken] = useState(0)

    const lockerContract = {
        address: lockerAddress,
        abi: lockerAbi
    };

    const { isSuccess: isCountSuccess } = useContractRead({
        ...lockerContract,
        functionName: 'totalLockCountForToken',
        args: [token],
        enabled: isConnected && isAddress(token),
        onSuccess(data) {
            setNumLockForToken(parseInt(data.toString()))
        }
    })


    return {
        numLockForToken,
        isCountSuccess
    }
}

export default useCountLockForToken