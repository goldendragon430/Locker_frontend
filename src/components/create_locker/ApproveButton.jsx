import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { erc20ABI, useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';


const ApproveButton = ({
    tokenAddress,
    contractAddress,
    valid,
    lockAmount
}) => {
    const { address, isConnected } = useAccount();

    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        address: tokenAddress,
        abi: erc20ABI,
        functionName: 'approve',
        args: [contractAddress, lockAmount],
        enabled: (valid && isConnected)
    })

    const { data, error, isError, write, isLoading: isWriteLoading } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(txData) {
            toast.info("Approved Successfully!!!");
        },
        onError(error) {
            toast.error(`Error: ${(error)?.message}`)
        }
    });

    const handleApprove = () => {
        if (!isConnected) {
            toast.warning('Please connect your wallet first')
            return;
        }
        if (isPrepareError) {
            toast.error(`Error: ${(prepareError)?.message}`)
            return;
        }
        console.log({
            tokenAddress,
            contractAddress,
            valid,
            lockAmount
        })
        write?.()
    }


    return (
        <>
            <button
                disabled={(isLoading || !valid || isWriteLoading)}
                className={`px-12 py-[10px] text-sm text-light3 font-monobold rounded-[10px] bg-red4 flex flex-row gap-1  ${(isLoading || !valid || isWriteLoading) && "cursor-not-allowed"}`}
                onClick={handleApprove}
            >
                {(isLoading) && <ReactLoading type={"spin"} color={"white"} height={20} width={20} />}
                {isLoading ? <div>Approving...</div> : <div>APPROVE</div>}
            </button>
            {
                (isLoading || isWriteLoading) && <div className={`w-screen h-screen fixed top-0 left-0 bg-black opacity-70 z-40 flex justify-center items-center`}>
                    <ReactLoading type={"spinningBubbles"} color={"#FBBF04"} height={100} width={100} />
                </div>
            }
        </>
    );
};

export default ApproveButton;