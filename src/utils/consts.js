import { lockerAbi } from "./lockerAbi"

export const lockerAddress = "0x2c03BFBbfe7f0f3496F5c41A1396fd0052DE5552"
export const referralTokenAddress = "0xAe6D3803B3358b09894e2f53A9f7B6A80d648B4C"
export const lockerContract = {
    address: lockerAddress,
    abi: lockerAbi
}

export const tokenAddressHint = [
    "",
    "Address cannot be blank",
    "Invalid address",
    "Invalid Token address"
]

export const tokenAmountHint = [
    "", "Amount is a required field", "Invalid amount"
]
export const tokenStartDateHint = [
    " ", "start Date must be after now"
]
