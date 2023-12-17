import { Button, Modal } from "antd"
import { useEffect, useState } from "react";
import Input from "../common/Input";
import { validateTokenAddress, validateTokenAmount, validateTokenStartDate } from "../../utils/validate";
import { lockerAddress, lockerContract, tokenAddressHint, tokenAmountHint, tokenStartDateHint } from "../../utils/consts";
import { erc20ABI, useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import useFee from "../../hooks/useFee";
import ReactLoading from 'react-loading';
import { formatUnits, parseUnits } from "viem";
import CompareDatePicker from "../common/CompareDatePicker";

const IncreaseLockModal = ({
    isModalOpen,
    setModalOpen,
    lock,
    tokenDecimal
}) => {
    const { address, isConnected } = useAccount();

    const [newAmount, setNewAmount] = useState("0");
    const [newAmountValid, setNewAmountValid] = useState(false)

    const [unlockDate, setUnlockDate] = useState(new Date());
    const [unlockDateValid, setUnlockDateValid] = useState(false)

    const [isApproved, setIsApproved] = useState(false)

    useEffect(() => {
        if (lock) {
            setNewAmount(formatUnits(lock?.amount, tokenDecimal))
            setUnlockDate(new Date(parseInt(lock.unlockDate.toString()) * 1000))
        }
    }, [lock])

    const allowanceRead = useContractRead({
        address: lock?.token,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [address, lockerAddress],
        watch: true,
        enabled: lock && isConnected,
    })

    useEffect(() => {
        if (allowanceRead.isSuccess && lock) {
            let allowed = formatUnits(allowanceRead.data + lock.amount, tokenDecimal);
            console.log("allowed", allowed, newAmount)
            if (parseFloat(allowed) >= parseFloat(newAmount)) {
                setIsApproved(true)

            } else {
                setIsApproved(false)

            }
        } else {
            setIsApproved(false)

        }
    }, [allowanceRead, newAmount])

    const handleOk = () => {
        if (!isConnected) {
            toast.warning('Please connect your wallet first')
            return;
        }
        if (!isApproved) {
            if (isPrepareErrorApprove) {
                toast.error(`Error: ${(prepareErrorApprove)?.message}`)
                return;
            }
            writeApprove?.()
        } else {
            if (isPrepareError) {
                toast.error(`Error: ${(prepareError)?.message}`)
                return;
            }

            writeIncrease?.()
        }
    };

    const { config: configApprove, error: prepareErrorApprove, isError: isPrepareErrorApprove } = usePrepareContractWrite({
        address: lock?.token,
        abi: erc20ABI,
        functionName: 'approve',
        args: [lockerAddress, (parseUnits(newAmount, tokenDecimal) - lock?.amount)],
        enabled: lock && newAmountValid && isConnected
    })

    const { data: dataApprove, error: errorApprove, isError: isErrorApprove, write: writeApprove, isLoading: isWriteLoadingApprove } = useContractWrite(configApprove)

    const { isLoading: isLoadingApprove, isSuccess: isSuccessApprove } = useWaitForTransaction({
        hash: dataApprove?.hash,
        onSuccess(txData) {
            toast.info("Approved Successfully!!!");
            setIsApproved(true)
        },
        onError(error) {
            toast.error(`Error: ${(error)?.message}`)
        }
    });

    const { fee, isSuccessFee } = useFee({
        isLock: false
    })
    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        ...lockerContract,
        functionName: "editLock",
        args: [lock?.id, parseUnits(newAmount, tokenDecimal), unlockDate / 1000],
        value: fee?.toString(),
        enabled: (newAmountValid && unlockDateValid && isConnected && isSuccessFee && isApproved)
    })

    const { data, error, isError, write: writeIncrease, isLoading: isWriteLoading } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(txData) {
            toast.info("Increased lock Successfully!!!");
            setModalOpen(false)
        },
        onError(error) {
            toast.error(`Error: ${(error)?.message}`)
        }
    });


    return (

        <Modal
            title="Increase Lock"
            onCancel={() => setModalOpen(false)}
            open={isModalOpen}
            footer={[
                <Button loading={isLoading} key="submit" onClick={handleOk} disabled={!(newAmountValid && unlockDateValid)}>
                    {isApproved ? "Increase Lock" : "Approve"}
                </Button>
            ]}

        >

            <Input
                label="New Amount"
                placeholder="New Amount"
                type="number"
                value={newAmount}
                setValue={setNewAmount}
                required={true}
                checkValid={validateTokenAmount}
                setIsValid={setNewAmountValid}
                autoFocus={false}
                hint={tokenAmountHint}
                minValue={parseInt(formatUnits(lock?.amount, tokenDecimal))}
            />

            <CompareDatePicker
                minDate={new Date(parseInt(lock?.unlockDate.toString()) * 1000)}
                label="UNLOCK DATE"
                date={unlockDate}
                setDate={setUnlockDate}
                hint={tokenStartDateHint}
                showTimeSelect={false}
                placeholderText="SELECT DATE"
                className="bg-[#141414] outline-none border w-[100%] border-dark3 h-[50px] py-5 px-12 rounded-lg text-base text-light1"
                setIsValid={setUnlockDateValid}
                required={true}
                checkValid={validateTokenStartDate}
            />

            {
                (isLoading || isWriteLoading || isLoadingApprove || isWriteLoadingApprove) && <div className={`w-screen h-screen fixed top-0 left-0 bg-black opacity-70 z-40 flex justify-center items-center`}>
                    <ReactLoading type={"spinningBubbles"} color={"#FBBF04"} height={100} width={100} />
                </div>
            }
        </Modal>
    )

}

export default IncreaseLockModal