import { useEffect, useState } from "react"
import Panel from "../common/Panel"
import { useAccount, useContractRead, useToken } from "wagmi"
import { lockerContract } from "../../utils/consts"
import { formatUnits } from "viem"
import { Modal } from "antd"
import TransferOwnershipModal from "./TransferOwnershipModal"
import IncreaseLockModal from "./IncreaseLockModal"
import ConfirmUnlockModal from "./ConfirmUnlockModal"

const LockInfoDetail = ({ lock, isOwner = false }) => {
    const { address, isConnected } = useAccount()
    const { data: dataToken, isSuccessToken } = useToken({
        address: lock?.token,
        enabled: isConnected && lock
    })
    const { data: withdrawableTokens } = useContractRead({
        ...lockerContract,
        functionName: 'withdrawableTokens',
        args: [lock?.id],
        watch: true,
        enabled: lock && isConnected
    })



    const [isTransferOwnershipModalOpen, setIsTransferOwnershipModalOpen] = useState(false);
    const [isIncreaseLockModalOpen, setIsIncreateLockModalOpen] = useState(false);
    const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);

    return (
        <Panel
            header={"Lock"}
            footer={isOwner}
            footerWrapper={
                isOwner &&
                <div className="flex flex-row justify-evenly text-sm ">
                    <button onClick={() => setIsTransferOwnershipModalOpen(true)} className="border p-2 bg-dark4 text-light2 rounded-lg hover:text-light3" >
                        TRANSFER LOCK OWNERSHIP
                    </button>
                    <button onClick={() => setIsIncreateLockModalOpen(true)} className="border p-2 bg-dark4 text-light2 rounded-lg hover:text-light3" >
                        INCREASE LOCK
                    </button>
                    <button onClick={() => setIsUnlockModalOpen(true)} className={`border p-2 bg-dark4 text-light2 disabled:bg-dark3 rounded-lg `} disabled={!lock.isVesting && lock.unlockDate * 1000n > BigInt(new Date().getTime())} >
                        UNLOCK
                    </button>

                    <TransferOwnershipModal lockId={lock?.id} isModalOpen={isTransferOwnershipModalOpen} setModalOpen={setIsTransferOwnershipModalOpen} />
                    <ConfirmUnlockModal lockId={lock?.id} isModalOpen={isUnlockModalOpen} setModalOpen={setIsUnlockModalOpen} />
                    <IncreaseLockModal lock={lock} tokenDecimal={dataToken?.decimals} isModalOpen={isIncreaseLockModalOpen} setModalOpen={setIsIncreateLockModalOpen} />
                </div>
            }
        >

            <div className="flex flex-col w-full gap-1 text-[12px] text-light1 ">

                {
                    isOwner &&
                    <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                        <p>TITLE</p>
                        <p>{lock?.description}</p>
                    </div>
                }
                <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                    <p>TOTAL AMOUNT LOCKED</p>
                    <p>{(lock && dataToken) && (formatUnits(lock.amount, dataToken.decimals) + " " + dataToken.name)}</p>
                </div>
                <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                    <p>OWNER</p>
                    <p>{lock?.owner}</p>
                </div>
                <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                    <p>LOCK DATE</p>
                    <p>{lock && new Date(parseInt(lock.lockDate.toString()) * 1000).toUTCString()}</p>
                </div>
                <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                    <p>UNLOCK DATE</p>
                    <p>{lock && new Date(parseInt(lock.unlockDate.toString()) * 1000).toUTCString()}</p>
                </div>
                {
                    lock?.isVesting &&
                    <>
                        <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                            <p>UNLOCKED AMOUNT</p>
                            <p>{(lock && dataToken) && (formatUnits(lock.withdrawnAmount, dataToken.decimals) + " " + dataToken.name)}</p>
                        </div>
                        <div className="flex flex-row justify-between items-center border-b border-b-dark3 pb-2 outline-none p-3">
                            <p>WITHDRAWABLE AMOUNT</p>
                            <p>{(lock && dataToken && withdrawableTokens) && (formatUnits(withdrawableTokens, dataToken.decimals) + " " + dataToken.name)}</p>
                        </div>
                    </>
                }
            </div>
        </Panel >
    )
}

export default LockInfoDetail