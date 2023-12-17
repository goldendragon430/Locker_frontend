import { useParams } from "react-router-dom"
import LockInfo from "../components/token_detail/LockInfo"
import LockRecords from "../components/token_detail/LockRecords";

const DetailLockedToken = () => {
    let { token } = useParams();
    return (
        <div className="flex flex-col gap-5">
            <LockInfo token={token} />
            <LockRecords token={token} />
        </div>
    )
}

export default DetailLockedToken