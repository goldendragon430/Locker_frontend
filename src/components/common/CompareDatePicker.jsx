import { useEffect, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { FaCalendarDays } from "react-icons/fa6";
import "react-datepicker/dist/react-datepicker.css";

const CompareDatePicker = ({
    minDate,
    date,
    setDate,
    hint,
    dateFormat,
    placeholderText,
    className,
    showTimeSelect,
    setIsValid,
    label,
    checkValid,
    required = true
}) => {
    const [hintIdx, setHintIndex] = useState(0)
    const [changed, setChanged] = useState(false)


    useEffect(() => {
        setIsValid && (hintIdx === 0 ? setIsValid(true) : setIsValid(false))
    }, [hintIdx])

    return (


        <div className="flex flex-col w-[100%] relative">
            {label && (
                <p className="text-white text-sm mb-2">
                    {label}
                    {required && <span className="text-red3 ml-1">*</span>}
                </p>
            )}
            <DatePicker
                minDate={minDate}
                selected={date}
                onChange={(date) => {
                    setDate(date)

                    setHintIndex(checkValid(date))
                    setChanged(true)
                }
                }
                showTimeSelect={showTimeSelect}
                dateFormat="MM/d/yyyy HH:mm"
                placeholderText={placeholderText}
                className={className}
                showTimeInput={true}
                calendarClassName="bg-light3 font-monobold "
                calendarContainer={({ className, children }) => (
                    <div className="p-0 text-light3">
                        <CalendarContainer className={className}>
                            <div className="relative bg-dark3">
                                {children}
                            </div>
                        </CalendarContainer>
                    </div>
                )}
            />
            <FaCalendarDays className="text-light1 w-4 h-4 absolute top-11 left-5" />

            <p className="text-xs text-red3">
                {changed && hint.length !== 0 && hint[hintIdx]}
            </p>
        </div>
    )
}

export default CompareDatePicker