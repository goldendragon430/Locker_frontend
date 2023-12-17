const Panel = ({
    children,
    header,
    footer = false,
    footerWrapper = "",
    headerWrapper = ""
}) => {
    return (
        <div className="bg-dark2 rounded-2xl w-full">
            {
                header ?
                    <div className="p-4 pl-8 max-sm:p-4 border-b border-b-dark3">
                        <p className="text-lg text-light2 font-bold">{header}</p>
                    </div>
                    :
                    <>
                        {headerWrapper}
                    </>
            }
            <div className="p-5 pb-8 max-sm:p-4">{children}</div>
            {footer && (
                <div className="border-t border-t-dark3 p-4">{footerWrapper}</div>
            )}
        </div>
    );
};

export default Panel;