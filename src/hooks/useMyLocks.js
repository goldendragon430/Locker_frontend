import { useAccount, useContractRead } from "wagmi"
import { lockerAddress } from "../utils/consts"
import { lockerAbi } from "../utils/lockerAbi"

const useMyLocks = ({
    isLpToken
}) => {
    const { address, isConnected } = useAccount();
    const lockerContract = {
        address: lockerAddress,
        abi: lockerAbi
    };

    const { data: myLocks, isLoading, isSuccess } = useContractRead({
        ...lockerContract,
        functionName: isLpToken ? "lpLocksForUser" : "normalLocksForUser",
        args: [address],
        enabled: isConnected
    })
    return {
        myLocks,
        isLoading,
        isSuccess,
    }
}

export default useMyLocks