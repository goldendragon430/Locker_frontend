import { Button, Modal } from "antd"
import { useState } from "react";
import Input from "../common/Input";
import { validateTokenAddress } from "../../utils/validate";
import { lockerContract, tokenAddressHint } from "../../utils/consts";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import useFee from "../../hooks/useFee";
import ReactLoading from 'react-loading';

const TransferOwnershipModal = ({
    isModalOpen,
    setModalOpen,
    lockId
}) => {
    const { isConnected } = useAccount();
    const [anotherOwner, setAnotherOwner] = useState("");
    const [anotherOwnerValid, setAnotherOwnerValid] = useState(false);

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


    const { fee, isSuccessFee } = useFee({
        isLock: false
    })
    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        ...lockerContract,
        functionName: "transferLockOwnership",
        args: [lockId, anotherOwner],
        value: fee?.toString(),
        enabled: (anotherOwnerValid && isConnected && isSuccessFee)
    })

    const { data, error, isError, write, isLoading: isWriteLoading } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(txData) {
            toast.info("Transferred ownership Successfully!!!");
            setModalOpen(false)
        },
        onError(error) {
            toast.error(`Error: ${(error)?.message}`)
        }
    });


    return (

        <Modal
            title="Transfer Ownership"
            onCancel={() => setModalOpen(false)}
            open={isModalOpen}
            footer={[
                <Button loading={isLoading} key="submit" onClick={handleOk} disabled={!anotherOwnerValid}>
                    Transfer Ownership
                </Button>
            ]}

        >
            <div className="mt-5">

                <Input
                    label=""
                    placeholder="OWNER ADDRESS"
                    type="text"
                    value={anotherOwner}
                    setValue={setAnotherOwner}
                    required={true}
                    hint={tokenAddressHint}
                    checkValid={validateTokenAddress}
                    setIsValid={setAnotherOwnerValid}
                />
            </div>

            {
                (isLoading || isWriteLoading) && <div className={`w-screen h-screen fixed top-0 left-0 bg-black opacity-70 z-40 flex justify-center items-center`}>
                    <ReactLoading type={"spinningBubbles"} color={"#FBBF04"} height={100} width={100} />
                </div>
            }
        </Modal>
    )

}

export default TransferOwnershipModal