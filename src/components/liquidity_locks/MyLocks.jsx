import { useAccount } from "wagmi"
import useMyLocks from "../../hooks/useMyLocks";
import RowMyLockInfo from "./RowMyLockInfo";

const MyLocks = ({
    isLpToken,
    searchAddress
}) => {
    const { myLocks, isSuccess, isLoading } = useMyLocks({ isLpToken })
    return (
        <div className="flex flex-col gap-10 w-full items-center">
            {
                myLocks?.length > 0 ?
                    (<div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row text-light2  p-3 items-center text-sm font-monobold">
                            <p className="basis-1/2">{isLpToken ? "LIQUIDITY TOKEN" : "TOKEN"}</p>
                            <p className="basis-1/3">AMOUNT</p>
                        </div>
                        {
                            (isSuccess && myLocks.length > 0) &&
                            myLocks.reverse().filter((info, index) => info.token.includes(searchAddress))
                                .map((info, index) => (
                                    <RowMyLockInfo isLpToken={isLpToken} key={index} lockInfo={info} />
                                ))
                        }
                        {
                            (isSuccess && !myLocks.length) &&
                            <p className="text-light1 text-lg">
                                No Data
                            </p>
                        }
                    </div>)
                    :
                    (<div className="text-lg text-light1">
                        No Data
                    </div>)
            }

        </div>
    )
}

export default MyLocks;