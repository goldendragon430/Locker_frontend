import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isAddress } from "viem";
import { useAccount, useBalance, useContractRead, useContractReads, useToken } from "wagmi";
import ReactLoading from "react-loading"
import { lpTokenAbi } from "../../utils/lpTokenAbi";


const TokenInput = ({
    label,
    placeholder = "TOKEN ADDRESS",
    tokenMetadata,
    setTokenMetadata,
    tokenBalance,
    setTokenBalance,
    setTokenAddress,
    allowance,
    hint = [],
    required = false,
    setIsLpToken,
    isLpToken,
}) => {
    const { address, isConnected } = useAccount();
    const [inputTokenAddress, setInputTokenAddress] = useState("");
    const [changed, setChanged] = useState(false)
    const [hintIndex, setHintIndex] = useState(0)


    const errorNumber = (str) => {
        if (str != "") {
            if (isAddress(str)) return 0
            else return 2
        }
        else return 1
    }
    const { data: balanceData, isError: isErrorBalance, isSuccess: isSuccessBalance } = useBalance({
        address: address,
        token: inputTokenAddress,
        enabled: (errorNumber(inputTokenAddress) == 0 && isConnected)
    })

    const { data: tokenData, isError: isErrorToken, isSuccess: isSuccessToken, isLoading } = useToken({
        address: inputTokenAddress,
        enabled: (errorNumber(inputTokenAddress) == 0 && isConnected)
    })

    const { data: lpData, isError: isErrorLp, error: errprLp, isSuccess: isSuccessLp } = useContractReads({
        contracts: [
            {
                address: inputTokenAddress,
                abi: lpTokenAbi,
                functionName: 'factory'
            },
            {
                address: inputTokenAddress,
                abi: lpTokenAbi,
                functionName: 'token0'
            },
            {
                address: inputTokenAddress,
                abi: lpTokenAbi,
                functionName: 'token1'
            },
        ],
        enabled: (errorNumber(inputTokenAddress) == 0 && isConnected)
    })



    useEffect(() => {
        if (isSuccessLp) {
            if (lpData[0].status == 'success' && lpData[1].status == 'success' && lpData[2].status == 'success') {
                setIsLpToken(true)
            }
            else {
                setIsLpToken(false)
            }
        } else {
            setIsLpToken(false)
        }
    }, [isSuccessLp])



    useEffect(() => {
        if (!isConnected && errorNumber(inputTokenAddress) === 0) {
            toast.error("Need to connect to wallet!")
        }
    }, [isConnected, inputTokenAddress])

    useEffect(() => {
        if (isSuccessToken) {
            setTokenMetadata({
                name: tokenData.name,
                symbol: tokenData.symbol,
                decimals: tokenData.decimals,
                totalSupply: tokenData.totalSupply.formatted,
            })
            // console.log({
            //     name: tokenData.name,
            //     symbol: tokenData.symbol,
            //     decimals: tokenData.decimals,
            //     totalSupply: tokenData.totalSupply.formatted,
            // })
        }
    }, [isSuccessToken])

    useEffect(() => {
        if (isSuccessBalance) {
            setTokenBalance(balanceData.formatted)
            setTokenAddress(inputTokenAddress)
        }
    }, [isSuccessBalance])

    useEffect(() => {
        if (isSuccessToken) {
            setHintIndex(0)
        } else {
            if (errorNumber(inputTokenAddress) == 0) {
                setHintIndex(3)
            }
            else (
                setHintIndex(errorNumber(inputTokenAddress))
            )
        }
    }, [isSuccessToken, inputTokenAddress])

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <p className="text-light3 text-sm">
                    {label}
                    {required && <span className="text-red3 ml-1">*</span>}
                </p>
            )}
            <input
                type="text"
                value={inputTokenAddress}
                placeholder={placeholder}
                onChange={(e) => {
                    setInputTokenAddress(e.target.value)
                }}
                onBlur={(e) => {
                    setChanged(true)
                }}
                className={`w-full h-[50px] outline-none border  ${(hintIndex === 0 || !changed) ? "border-dark3" : "border-red3"} bg-dark4 remove-arrow p-5
                 rounded-md text-light3 text-sm`}
            />
            {
                hint && changed &&
                < span className="text-xs text-red2">
                    {hint[hintIndex]}
                </span>
            }

            {
                changed && isLoading &&
                <div className="flex flex-row items-center ">
                    <ReactLoading type={"spin"} color={"white"} height={20} width={20} />
                    <p className="text-[12px] text-light1">Fetching token info...</p>
                </div>
            }
            {
                (isSuccessBalance && isSuccessToken) &&
                < div className="flex flex-col w-full gap-1 text-[12px] text-light1 p-4">
                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-1 outline-none">
                        <p>NAME</p>
                        <p>{tokenMetadata.name}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-1 outline-none">
                        <p>SYMBOL</p>
                        <p>{tokenMetadata.symbol}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-1 outline-none">
                        <p>DECIMAL</p>
                        <p>{`${tokenMetadata.decimals}`}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-1 outline-none">
                        <p>TOTAL SUPPLY</p>
                        <p>{tokenMetadata.totalSupply}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-1 outline-none">
                        <p>MY BALANCE</p>
                        <p>{tokenBalance}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-1 outline-none">
                        <p>ALLOWANCE</p>
                        <p>{allowance.toString?.()}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-1 outline-none">
                        <p>TOKEN TYPE</p>
                        <p>{isLpToken ? "LP token" : "Normal token"}</p>
                    </div>
                </div>
            }
        </div >
    )
}

export default TokenInput