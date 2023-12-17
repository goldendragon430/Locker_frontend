//! import icon

import { useEffect, useState } from "react";

const Input = ({
    label = "",
    type = "text",
    value,
    setValue,
    placeholder = "",
    autoFocus = false,
    checkValid,
    setIsValid,
    required = false,
    hint = [],
    maxValue,
    minValue
}) => {
    const [hintIdx, setHintIndex] = useState(checkValid ? checkValid(value) : 0)
    const [changed, setChanged] = useState(false)

    useEffect(() => {
        setIsValid && (hintIdx === 0 ? setIsValid(true) : setIsValid(false))
    }, [hintIdx])

    useEffect(() => {
        if (!required && value == '') {
            isValid && isValid(true)
        }
    }, [])

    return (
        <div className="flex flex-col gap-2 w-[100%] relative">
            {label && (
                <p className="text-light3 text-[14px]">
                    {label}
                    {required && <span className="text-red3 ml-1">*</span>}
                </p>
            )}
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                autoFocus={autoFocus}
                onChange={(e) => {
                    checkValid && setHintIndex(checkValid(e.target.value, minValue, maxValue))
                    setValue(e.target.value)

                    setChanged(true)
                }}
                onBlur={() => {
                    checkValid && setHintIndex(checkValid(value, minValue, maxValue))
                }}
                className={`w-full h-[50px] outline-none border ${(hintIdx === 0 || !changed) ? "border-dark3" : "border-red3"} bg-dark4 remove-arrow p-5   rounded-lg text-light3 text-sm`}
            />
            <span className="text-[12px] text-red3">{changed && hint.length !== 0 && hint[hintIdx]}</span>
        </div>
    );
};

export default Input;
