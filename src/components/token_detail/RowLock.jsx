import { formatUnits } from "viem"
import { reducedAddress } from "../../utils/utils"
import { Link } from "react-router-dom"

const RowLock = ({
    lock,
    decimals
}) => {
    return (
        <div className="flex flex-row justify-between w-full text-light1 text-xs border-b border-b-dark1 pb-2 outline-none p-3">
            <p className="basis-1/3">{reducedAddress(lock.owner)}</p>
            <p className="basis-1/4">{formatUnits(lock.amount, decimals)}</p>
            <p className="basis-1/4">{new Date(parseInt(lock.unlockDate.toString()) * 1000).toUTCString()}</p>
            <Link to={`/record/${lock.id}`} className="basis-1/6 flex-row flex justify-end text-red4">
                <p>View</p>
            </Link>
        </div>

    )
}

export default RowLock