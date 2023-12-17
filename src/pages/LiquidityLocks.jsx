import Panel from "../components/common/Panel"
import { useEffect, useState } from "react"
import MyLocks from "../components/liquidity_locks/MyLocks"
import AllLocks from "../components/liquidity_locks/AllLocks"

const LiquidityLocks = () => {

    const [searchAddress, setSearchAddress] = useState("")
    const [showsMyLocks, setShowsMylocks] = useState(false)

    return (
        <div className="rounded-md bg-dark2">
            <Panel
                footer={false}
                headerWrapper={<div className="flex flex-col p-4 gap-4">
                    <input
                        type="text"
                        value={searchAddress}
                        onChange={e => setSearchAddress(e.target.value)}
                        placeholder="SEARCH BY LP TOKEN ADDRESS"
                        autoFocus={true}
                        className={`w-full h-[50px] text-light3 outline-none border border-dark3 bg-dark4  p-5   rounded-lg  text-sm`}
                    />
                    <div className="flex flex-row justify-end gap-6 pr-3">
                        <div className={`hover:text-red3 ${!showsMyLocks ? "text-red4 border-b border-red4" : "text-light1"}  cursor-pointer`} onClick={() => setShowsMylocks(false)}>ALL LOCKS</div>
                        <div className={`hover:text-red3 ${showsMyLocks ? "text-red4  border-b border-red4" : "text-light1"}  cursor-pointer`} onClick={() => setShowsMylocks(true)}>MY LOCKS</div>
                    </div>
                </div>}
            >
                {
                    showsMyLocks ?
                        <MyLocks isLpToken={true} searchAddress={searchAddress} />
                        :
                        <AllLocks isLpToken={true} searchAddress={searchAddress} />
                }
            </Panel>
        </div>
    )
}

export default LiquidityLocks