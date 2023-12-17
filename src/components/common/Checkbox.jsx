const Checkbox = ({
    label = "",
    value,
    setValue
}) => {
    return (
        <div className="flex flex-row justify-start gap-2 items-center cursor-pointer">
            <input type="checkbox" className="cursor-pointer"
                checked={value} onChange={() => setValue(!value)} />
            <p className="text-sm text-light3" onClick={() => setValue(!value)}>
                {label}
            </p>
        </div>
    )
}

export default Checkbox;