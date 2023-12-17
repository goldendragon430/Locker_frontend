import { isAddress } from "viem"

export const validateTokenAddress = (str) => {
    if (str !== "") {
        if (isAddress(str)) return 0
        else return 2
    }
    else return 1
}

export const validateTokenAmount = (str, min, max) => {
    if (str !== "") {
        if (BigInt(str) <= 0n || (min && BigInt(str) < BigInt(min)) || (max && BigInt(str) > BigInt(max))) return 2
        else return 0
    }
    else return 1
}

export const validateTokenStartDate = (date) => {
    if (date < new Date()) return 1;
    else return 0
}