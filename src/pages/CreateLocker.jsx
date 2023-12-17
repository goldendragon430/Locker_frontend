import { useEffect, useState } from "react";
import Panel from "../components/common/Panel";
import LpLockerButton from "../components/create_locker/LpLockButton";
import ApproveButton from "../components/create_locker/ApproveButton";
import TokenInput from "../components/create_locker/TokenInput";
import { lockerAddress, tokenAddressHint, tokenAmountHint, tokenStartDateHint } from "../utils/consts";
import { erc20ABI, useAccount, useContractRead } from "wagmi";
import Input from "../components/common/Input";
import { validateTokenAddress, validateTokenAmount, validateTokenStartDate } from "../utils/validate";
import CompareDatePicker from "../components/common/CompareDatePicker";
import { formatEther, formatUnits, parseUnits } from "viem";
import Checkbox from "../components/common/Checkbox";

const CreateLocker = () => {
    const { address, isConnected } = useAccount();

    const [tokenMetadata, setTokenMetadata] = useState({
        name: "",
        symbol: "",
        decimals: 1,
        totalSupply: "",
    });

    const [title, setTitle] = useState("")
    const [tokenAddress, setTokenAddress] = useState();
    const [tokenBalance, setTokenBalance] = useState("0");
    const [useAnotherOwner, setUseAnotherOwner] = useState(false);
    const [useVesting, setUseVesting] = useState(false);
    const [anotherOwner, setAnotherOwner] = useState("");
    const [isLpToken, setIsLpToken] = useState(false);

    const [lockAmount, setLockAmount] = useState('0');
    const [unlockDate, setUnlockDate] = useState("");

    const [tokenAmountValid, setTokenAmountValid] = useState(false)
    const [unlockDateValid, setUnlockDateValid] = useState(false)
    const [anotherOwnerValid, setAnotherOwnerValid] = useState(false);

    const [isApproved, setIsApproved] = useState(false)
    const [lockEnabled, setLockEnabled] = useState(false)

    const allowanceRead = useContractRead({
        address: tokenAddress,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [address, lockerAddress],
        watch: true,
        enabled: tokenAddress && isConnected
    })

    useEffect(() => {
        if (isLpToken) {
            setUseVesting(false)
        }
    }, [isLpToken])


    useEffect(() => {
        if (allowanceRead.isSuccess) {
            let allowed = formatUnits(allowanceRead.data, tokenMetadata.decimals);
            if (parseFloat(lockAmount) == 0 && parseFloat(allowed) == 0) {
                setIsApproved(false)
            } else if (parseFloat(allowed) >= parseFloat((lockAmount))) {
                setIsApproved(true)

            } else {
                setIsApproved(false)

            }
        } else {
            setIsApproved(false)

        }
    }, [allowanceRead, lockAmount])

    useEffect(() => {
        setLockEnabled(
            unlockDateValid &&
            tokenAddress &&
            tokenAmountValid &&
            (!useAnotherOwner || anotherOwnerValid)
        )
    }, [
        unlockDateValid,
        tokenAddress,
        tokenAmountValid,
        useAnotherOwner,
        anotherOwnerValid
    ])
    return (
        <Panel
            header="CREATE YOUR LOCK"
            footer={true}
            footerWrapper={
                <div className="flex flex-row justify-end">
                    {isApproved ?
                        <LpLockerButton
                            lockAmount={parseUnits(lockAmount, tokenMetadata.decimals)}
                            tokenAddress={tokenAddress}
                            valid={lockEnabled}
                            unlockDate={unlockDate}
                            ownerAddress={useAnotherOwner ? anotherOwner : address}
                            useVesting={useVesting}
                            isLpToken={isLpToken}
                            title={title}
                        />
                        :
                        <ApproveButton
                            contractAddress={lockerAddress}
                            tokenAddress={tokenAddress}
                            lockAmount={parseUnits(lockAmount, tokenMetadata.decimals)}
                            valid={lockEnabled}
                        />
                    }
                </div>
            }
        >
            <div className="flex flex-col gap-4">
                <TokenInput
                    placeholder="ENTER TOKEN OR LP TOKEN ADDRESS"
                    label={'TOKEN OR LP TOKEN ADDRESS'}
                    tokenBalance={tokenBalance}
                    setTokenBalance={setTokenBalance}
                    setTokenAddress={setTokenAddress}
                    tokenMetadata={tokenMetadata}
                    setTokenMetadata={setTokenMetadata}
                    hint={tokenAddressHint}
                    required={true}
                    allowance={formatUnits(allowanceRead.data || BigInt(0), tokenMetadata.decimals)}
                    setIsLpToken={setIsLpToken}
                    isLpToken={isLpToken}

                />
                <div className="flex flex-col gap-2">
                    <Checkbox label="USE ANOTHER OWNER ADDRESS?" value={useAnotherOwner} setValue={setUseAnotherOwner} />
                    {useAnotherOwner && <Input
                        label="OWNER ADDRESS"
                        placeholder="OWNER ADDRESS"
                        type="text"
                        value={anotherOwner}
                        setValue={setAnotherOwner}
                        required={true}
                        hint={tokenAddressHint}
                        checkValid={validateTokenAddress}
                        setIsValid={setAnotherOwnerValid}
                    />}
                </div>
                <div className="flex flex-col gap-2 w-[100%] relative">
                    <p className="text-light3 text-[14px]">
                        TITLE
                    </p>
                    <input placeholder="ENTER YOUR LOCKER DESCRIPTION" value={title} onChange={e => setTitle(e.target.value)} className="w-full h-[50px] outline-none border  border-dark3  bg-dark4 remove-arrow p-5   rounded-lg text-light3 text-sm" />
                </div>
                <Input
                    label="Amount"
                    placeholder="0"
                    type="number"
                    value={lockAmount}
                    setValue={setLockAmount}
                    checkValid={validateTokenAmount}
                    setIsValid={setTokenAmountValid}
                    autoFocus={false}
                    required={true}
                    hint={tokenAmountHint}
                    maxValue={tokenBalance && parseInt(tokenBalance)}
                    minValue={0}
                />
                {
                    !isLpToken &&
                    <Checkbox label="USE VESTING?" value={useVesting} setValue={setUseVesting} />
                }
                <CompareDatePicker
                    minDate={new Date()}
                    label="UNLOCK DATE"
                    date={unlockDate}
                    setDate={setUnlockDate}
                    hint={tokenStartDateHint}
                    showTimeSelect={false}
                    placeholderText="SELECT DATE"
                    className="bg-[#141414] outline-none border w-[100%] border-dark3 h-[50px] py-5 px-12 rounded-lg text-base text-light1"
                    setIsValid={setUnlockDateValid}
                    required={true}
                    checkValid={validateTokenStartDate}
                />
            </div>
        </Panel>
    );
};

export default CreateLocker;