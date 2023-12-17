import { Statistic } from "antd"
const { Countdown } = Statistic;
const LockCountDown = ({
    unlockDate = 0
}) => {

    return (
        <Countdown
            value={parseInt(unlockDate) * 1000}
            format="DD : HH : mm : ss"
            valueStyle={{
                color: "red"
            }}
            className="flex flex-row items-center"

        />
    )
}

export default LockCountDown