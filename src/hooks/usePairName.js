import { erc20ABI, readContracts, useAccount, useContractRead, useContractReads } from "wagmi";
import { lpTokenAbi } from "../utils/lpTokenAbi";
import { useEffect, useState } from "react";
const usePairName = ({
    token,
    enabled
}) => {
    const [pairName, setPairName] = useState("")
    const [fullPairName, setFullPairName] = useState("")
    const tokenContract = {
        address: token,
        abi: lpTokenAbi
    }

    const { data: tokens, isSuccessTokens } = useContractReads({
        contracts: [
            {
                ...tokenContract,
                functionName: 'token0'
            },
            {
                ...tokenContract,
                functionName: 'token1'
            },
        ],
        enabled
    })
    const { data: tokenNames, isSuccess } = useContractReads({
        contracts: [
            {
                address: tokens?.[0].result,
                abi: erc20ABI,
                functionName: 'symbol'
            },
            {
                address: tokens?.[1].result,
                abi: erc20ABI,
                functionName: 'symbol'
            },
            {
                address: tokens?.[0].result,
                abi: erc20ABI,
                functionName: 'name'
            },
            {
                address: tokens?.[1].result,
                abi: erc20ABI,
                functionName: 'name'
            },
        ],
        enabled: enabled && isSuccessTokens && tokens,
        onSuccess(data) {
            setPairName(`${data[0].result}/${data[1].result}`)
            setFullPairName(`${data[2].result}/${data[3].result}`)
        }
    })

    return {
        pairName,
        fullPairName
    }
}

export default usePairName