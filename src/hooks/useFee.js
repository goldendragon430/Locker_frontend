import { useEffect, useState } from "react"
import { useAccount, useBalance, useContractRead } from "wagmi"
import { lockerContract } from "../utils/consts"
import { lockerAbi } from "../utils/lockerAbi"

const useFee = ({
    isLock = true
}) => {
    const { address, isConnected } = useAccount();

    const [fee, setFee] = useState(BigInt(0))
    const feeRead = useContractRead({
        ...lockerContract,
        functionName: 'gFees',
        args: [],
    })

    const referralTokenHoldRead = useBalance({
        address,
        token: feeRead.data?.[2]
    })


    useEffect(() => {
        if (referralTokenHoldRead.isSuccess && feeRead.isSuccess) {
            if (referralTokenHoldRead.data.value >= feeRead.data[3]) {
                setFee(feeRead.data[4])
            }
            else if (isLock) {
                setFee(feeRead.data[0])
            } else {
                setFee(feeRead.data[1])
            }
        }
    }, [referralTokenHoldRead])

    return {
        fee,
        isSuccess: referralTokenHoldRead.isSuccess && feeRead.isSuccess
    }
}

export default useFee