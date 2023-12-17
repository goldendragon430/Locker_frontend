import { useState } from "react";
import Panel from "../common/Panel"
import { useAccount, useContractRead, useToken } from "wagmi";
import { lockerContract } from "../../utils/consts";
import { isAddress } from "viem";
import useCountLockForToken from "../../hooks/useCountLockForToken";
import useLocksForToken from "../../hooks/useLocksForToken";
import RowLock from "./RowLock";
import { Pagination } from "antd";

const LockRecords = ({ token }) => {
    const defaultPageSize = 20

    const { address, isConnected } = useAccount()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageRange, setPageRange] = useState({
        start: 0,
        end: defaultPageSize - 1
    })

    const { data: tokenData, isSuccess: isSuccessToken } = useToken({
        address: token,
        enabled: (isAddress(token) && isConnected)
    })

    const { numLockForToken, isCountSuccess } = useCountLockForToken({ token })

    const { locksForToken, isSuccess, isLoading } = useLocksForToken({
        start: pageRange.start,
        end: pageRange.end,
        token,
        enabled: (isAddress(token) && isConnected)
    })

    const handleOnChangePagination = (page, pageSize) => {
        setPageRange({
            start: (page - 1) * pageSize,
            end: page * pageSize - 1
        })
        console.log("page size", page, pageSize)
    }
    return (
        <div className="rounded-md bg-dark2">

            <Panel
                header={"LOCK RECORDS"}
            >
                <div className="flex flex-col items-center gap-10 w-full">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between w-full text-light2 text-sm pb-2 outline-none p-3 ">
                            <p className="basis-1/3">OWNER</p>
                            <p className="basis-1/4">AMOUNT</p>
                            <p className="basis-1/4">UNLOCK TIME(UTC)</p>
                            <p className="basis-1/6">&nbsp;</p>
                        </div>
                        {
                            (isSuccess && locksForToken.length > 0) &&
                            locksForToken
                                .map((info, index) => (
                                    <RowLock decimals={tokenData?.decimals} key={index} lock={info} />
                                ))
                        }
                        {
                            (isSuccess && !locksForToken.length) &&
                            <p className="text-light1 text-lg">
                                No Data
                            </p>
                        }

                    </div>
                    <Pagination
                        current={currentPage}
                        total={numLockForToken}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} locks`}
                        pageSize={20}
                        showSizeChanger={false}
                        onChange={handleOnChangePagination}
                        hideOnSinglePage={true}
                    />
                </div>
            </Panel>
        </div>
    )
}

export default LockRecords