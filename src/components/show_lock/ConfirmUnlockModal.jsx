import { Button, Modal } from "antd"
import { useState } from "react";
import Input from "../common/Input";
import { validateTokenAddress } from "../../utils/validate";
import { lockerContract, tokenAddressHint } from "../../utils/consts";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import useFee from "../../hooks/useFee";
import ReactLoading from 'react-loading';

const ConfirmUnlockModal = ({
    isModalOpen,
    setModalOpen,
    lockId
}) => {
    const { isConnected } = useAccount();

    const handleOk = () => {
        if (!isConnected) {
            toast.warning('Please connect your wallet first')
            return;
        }
        if (isPrepareError) {
            toast.error(`Error: ${(prepareError)?.message}`)
            return;
        }
        write?.()
    };


    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        ...lockerContract,
        functionName: "unlock",
        args: [lockId],
        enabled: (isConnected)
    })

    const { data, error, isError, write, isLoading: isWriteLoading } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(txData) {
            toast.info("Unlocked Successfully!!!");
            setModalOpen(false)
        },
        onError(error) {
            toast.error(`Error: ${(error)?.message}`)
        }
    });


    return (

        <Modal
            title="Confirm Unlock"
            onCancel={() => setModalOpen(false)}
            open={isModalOpen}
            footer={[
                <Button loading={isLoading} key="submit" onClick={handleOk} >
                    Confirm
                </Button>
            ]}

        >
            <div className="text-sm">
                Do you really want to unlock this lock?
            </div>

            {
                (isLoading || isWriteLoading) && <div className={`w-screen h-screen fixed top-0 left-0 bg-black opacity-70 z-40 flex justify-center items-center`}>
                    <ReactLoading type={"spinningBubbles"} color={"#FBBF04"} height={100} width={100} />
                </div>
            }
        </Modal>
    )

}

export default ConfirmUnlockModal