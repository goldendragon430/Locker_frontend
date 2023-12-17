import { Pagination } from "antd"
import { useState } from "react"
import { useAccount } from "wagmi"
import useAllLocks from "../../hooks/useAllLocks"
import useCountTokens from "../../hooks/useCountTokens"
import RowCumulativeInfo from "../liquidity_locks/RowCumulativeInfo"

const AllLocks = ({
    isLpToken,
    searchAddress
}) => {
    const defaultPageSize = 20
    const [currentPage, setCurrentPage] = useState(1);
    const [pageRange, setPageRange] = useState({
        start: 0,
        end: defaultPageSize - 1
    })

    const { numTotalTokens, isCountSuccess } = useCountTokens({ isLpToken })

    const { cumulativeInfo, isSuccess, isLoading } = useAllLocks({
        isLpToken,
        start: pageRange.start,
        end: pageRange.end,
        enabled: isCountSuccess
    })


    const handleOnChangePagination = (page, pageSize) => {
        setPageRange({
            start: (page - 1) * pageSize,
            end: page * pageSize - 1
        })
        console.log("page size", page, pageSize)
    }
    return (
        <div className="flex flex-col gap-10 w-full items-center">

            {
                cumulativeInfo?.length > 0 ?
                    (
                        <div className="flex flex-col w-full gap-2">
                            <div className="flex flex-row text-light2  p-3 items-center text-sm font-monobold">
                                <p className="basis-1/2">LIQUIDITY TOKEN</p>
                                <p className="basis-1/3">AMOUNT</p>
                            </div>
                            {
                                (isSuccess && cumulativeInfo.length > 0) &&
                                cumulativeInfo.reverse().filter((info, index) => info.token.includes(searchAddress))
                                    .map((info, index) => (
                                        <RowCumulativeInfo key={index} cumulativeInfo={info} isLpToken={isLpToken} />

                                    ))


                            }
                            {
                                (isSuccess && !cumulativeInfo.length) &&
                                <p className="text-light1 text-lg">
                                    No Data
                                </p>
                            }
                        </div>

                    )
                    :
                    (
                        <div className="text-lg text-light1">
                            No Data
                        </div>
                    )
            }

            <Pagination
                current={currentPage}
                total={numTotalTokens}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} locks`}
                pageSize={defaultPageSize}
                showSizeChanger={false}
                onChange={handleOnChangePagination}
                hideOnSinglePage={true}
            />
        </div>
    )
}

export default AllLocks