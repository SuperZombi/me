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
    const LeftMenu = () => {
        const SearchItem = ({text}) => {
            return (
                <div className="flex gap-2 items-center px-2 py-1 hover:bg-blue-50 cursor-pointer">
                    <i className="fa-solid fa-magnifying-glass text-gray-500 text-xs leading-none"></i>
                    <span className="text-blue-800 hover:underline text-xs">{text}</span>
                </div>
            )
        }
        const SearchItems = [
            "React development",
            "JavaScript tutorials"
        ]
        return (
            <div className="border-r border-gray-300">
                <div className="bg-[#6e88dd] text-gray-100 flex gap-2 items-center px-3 py-1">
                    <i className="fa-solid fa-clock-rotate-left text-xs leading-none"></i>
                    <span className="text-sm font-bold">Search History</span>
                </div>
                <div className="divide-y">
                    {SearchItems.map((text, index) => (
                        <SearchItem key={index} text={text} />
                    ))}
                </div>
            </div>
        )
    }
    return (
        <div className="h-full">
            <Header/>
            <div className="h-full grid grid-cols-[minmax(theme(spacing.40),auto)_1fr]">
                <LeftMenu/>
                <div className="overflow-auto">
                    <h3>Hello world</h3>
                </div>
            </div>
        </div>
    )
}
