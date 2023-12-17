import { useParams } from "react-router-dom";
import LockCountDown from "../components/show_lock/LockCountdown";
import { useAccount, useContractRead } from "wagmi";
import { lockerContract } from "../utils/consts";
import Panel from "../components/common/Panel";
import PairOrTokenInfo from "../components/show_lock/PairOrTokenInfo";
import LockInfoDetail from "../components/show_lock/LockInfoDetail";
import { useEffect, useState } from "react";

const ShowLock = () => {
    let { lockId } = useParams();
    const { address, isConnected } = useAccount()

    const { data: lock, isSuccess, isError } = useContractRead({
        ...lockerContract,
        functionName: "getLockById",
        args: [lockId],
        watch: true
    })

    useEffect(() => {
        setIsOwner(lock?.owner == address)
    }, [address, lock])
    const [isOwner, setIsOwner] = useState(false)

    return (
        <div className="flex flex-col items-center w-full gap-4">
            <div className="rounded-2xl w-full items-center p-4 bg-dark2 flex flex-col justify-center">
                <p className="text-light2 text-lg">UNLOCK IN</p>
                <LockCountDown unlockDate={lock?.unlockDate} />
            </div>
            <PairOrTokenInfo token={lock?.token} />
            <LockInfoDetail lock={lock} isOwner={isOwner} />
        </div>
    )
}

export default ShowLock