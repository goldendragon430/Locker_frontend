import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { useAccount, useBalance, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { lockerAbi } from '../../utils/lockerAbi';
import { useEffect, useState } from 'react';
import { lockerContract, referralTokenAddress } from '../../utils/consts';
import useFee from '../../hooks/useFee';

const LpLockerButton = ({
    valid,
    tokenAddress,
    lockAmount,
    unlockDate,
    ownerAddress,
    useVesting,
    isLpToken,
    title
}) => {
    const { address, isConnected } = useAccount();
    const { fee, isSuccess: isFeeSuccess } = useFee({ isLock: true })

    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        ...lockerContract,
        functionName: useVesting ? 'vestingLock' : 'lock',
        args: [ownerAddress, tokenAddress, isLpToken, lockAmount, unlockDate && unlockDate.getTime() / 1000, title],
        value: fee,
        enabled: (valid && isConnected)
    })


    const { data, error, isError, write, isLoading: isWriteLoading } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(txData) {
            toast.info("Locked Successfully!!!");
        },
        onError(error) {
            toast.error(`Error: ${(error)?.message}`)
        }
    });

    const handleLock = () => {
        if (!isConnected) {
            toast.warning('Please connect your wallet first')
            return;
        }
        if (isPrepareError) {
            toast.error(`Error: ${(prepareError)?.message}`)
            console.log('Lock error', prepareError.message)
            console.log('fee', fee)
            return;
        }
        write?.()
    }


    return (
        <>
            <button
                disabled={(isLoading || !valid || isWriteLoading)}
                className={`px-12 py-[10px] text-sm text-light3 font-monobold rounded-[10px] bg-red4 flex flex-row gap-1  ${(isLoading || !valid || isWriteLoading) && "cursor-not-allowed"}`}
                onClick={handleLock}
            >
                {(isLoading) && <ReactLoading type={"spin"} color={"white"} height={20} width={20} />}
                {isLoading ? <div>Locking...</div> : <div>LOCK</div>}
            </button>
            {
                (isLoading || isWriteLoading) && <div className={`w-screen h-screen fixed top-0 left-0 bg-black opacity-70 z-40 flex justify-center items-center`}>
                    <ReactLoading type={"spinningBubbles"} color={"#FBBF04"} height={100} width={100} />
                </div>
            }
        </>
    );
};

export default LpLockerButton;