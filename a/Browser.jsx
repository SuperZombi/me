const Browser = ({}) => {
    const Header = () => {
        const Button = ({ icon }) => {
            return (
                <button className="bg-gray-100 rounded-sm border border-gray-600 text-gray-600 w-6 h-6 flex items-center justify-center active:translate-y-[1px] shrink-0">
                    <i className={`fa-solid ${icon}`}></i>
                </button>
            )
        }
        return (
            <div className="flex gap-1 p-2 bg-gray-200 border-b border-gray-400">
                <Button icon="fa-arrow-left" />
                <Button icon="fa-arrow-right" />
                <Button icon="fa-arrow-rotate-right" />
                <Button icon="fa-home text-sm" />
                <input type="text" className="h-6 w-full px-1 bg-gray-100 border border-gray-600 text-gray-600 focus:outline-none"
                    value="https://www.google.com" readOnly
                />
                <Button icon="fa-magnifying-glass" />
            </div>
        )
    }
    const LeftMenu = ({leftMenuHiden, setLeftMenuHidden}) => {
        const SearchItem = ({text}) => {
            return (
                <div className="flex gap-2 items-center px-2 py-1 hover:bg-blue-50 cursor-pointer">
                    <i className="fa-solid fa-magnifying-glass text-gray-500 text-xs leading-none"></i>
                    <span className="text-blue-800 hover:underline text-xs">{text}</span>
                </div>
            )
        }
        const SearchItems = [
            "how to kill child without killing parent",
            "how to kill child process",
            "how to center div css",
            "how to exit vim",
            "undefined is not a function",
            "how to undo rm -rf /",
            "regex to parse html",
            "difference between undefined, null, NaN",
        ]
        return (
            <div className="border-r border-gray-300">
                <div className="bg-[#6e88dd] text-gray-100 flex gap-2 items-center px-2 py-1 cursor-pointer hover:bg-[#6495d4]"
                    onClick={_=>setLeftMenuHidden(prev=>!prev)}
                >
                    <i className={`fa-solid fa-clock-rotate-left leading-none
                        ${leftMenuHiden ? "text-sm py-0.5" : "text-xs"}`}></i>
                    {!leftMenuHiden && <span className="text-sm font-bold">Search History</span>}
                </div>
                {!leftMenuHiden && (
                    <div className="divide-y">
                        {SearchItems.map((text, index) => (
                            <SearchItem key={index} text={text} />
                        ))}
                    </div>
                )}
            </div>
        )
    }
    const [leftMenuHiden, setLeftMenuHidden] = React.useState(false)
    return (
        <div className="h-full">
            <Header/>
            <div className={`h-full grid ${leftMenuHiden ? 'grid-cols-[auto_1fr]' : 'grid-cols-[minmax(theme(spacing.40),auto)_1fr]'}`}>
                <LeftMenu leftMenuHiden={leftMenuHiden} setLeftMenuHidden={setLeftMenuHidden}/>
                <div className="flex justify-center">
                    <div className="flex flex-col items-start gap-3 p-3 pt-10">
                        <img className="h-12 select-none" src="a/assets/sadpaper.png" draggable={false} />
                        <span>Webpage not available</span>
                        <span>ERR_CONNECTION_REFUSED</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
