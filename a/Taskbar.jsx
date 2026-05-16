const TaskBar = ({apps, setMinimized, setShowStartMenu}) => {
	const [time, setTime] = React.useState("")
	React.useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setTime(
				now.toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				})
			)
		}
		updateTime()
		const interval = setInterval(updateTime, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className="fixed bottom-0 left-0 w-full h-10 bg-gradient-to-b from-[#3c89e8] to-[#245edb] flex items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] select-none">
			<button
				className="
					start-button
					h-full px-3 pr-5 py-2
					flex items-center gap-2
					bg-gradient-to-b from-[#60d050] to-[#2b9b1f]
					border border-[#1d6f14]
					rounded-r-3xl
					text-white font-bold italic
					shadow-[inset_1px_2px_4px_rgba(255,255,255,0.4)]
					active:from-[#318731] active:via-[#1a8e1a] active:to-[#259c25]
				"
				onClick={_=>setShowStartMenu(prev=>!prev)}
			>
				<img src="a/assets/logo.png" className="select-none h-full" draggable={false}/>
				Start
			</button>

			<div className="flex items-center gap-1 flex-1 overflow-hidden px-2 py-1 h-full">
				{apps.map(app => (
					<button
						key={app.id}
						className="
							h-full rounded-sm
							flex items-center gap-2 px-2.5 py-1
							bg-gradient-to-b from-[#5aa2ff] to-[#3a6fd8]
							border border-[#1f4fa8]
							text-white text-sm
							shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)]
							hover:brightness-110
							active:translate-y-[1px]
						"
						onClick={_=>setMinimized(app.id)(prev => !prev)}
					>
						<img className="h-full py-0.5" src={app.icon} draggable={false}/>
						<span className="truncate">
							{app.name}
						</span>
					</button>
				))}
			</div>

			<div
				className="
					h-full px-2
					flex items-center justify-end gap-2
					bg-gradient-to-b from-[#4aa3ff] to-[#2b74d6]
					border-l border-[#1e56aa]
					shadow-[inset_1px_1px_0_rgba(255,255,255,0.25)]
					text-white text-sm
				"
			>
				<img src="a/assets/sound.png" className="select-none h-full pt-3 pb-2" draggable={false}/>
				<span>{time}</span>
			</div>
		</div>
	)
}

const StartMenu = ({runApp, appsList, setShowStartMenu, onShutDown}) => {
	const MenuItem = ({ onClick, children }) => (
		<button
			className="
				w-full h-9 px-3 pr-4
				flex items-center gap-2
				hover:bg-[#316ac5]
				hover:text-white
				text-left text-nowrap
			"
			onClick={onClick}
		>
			{children}
		</button>
	)
	const startApp = (...app)=>{
		setShowStartMenu(false)
		runApp(...app)
	}
	return (
		<div className="
			start-menu
			rounded-t-lg
			overflow-hidden
			border border-[#0c3c74]
			shadow-2xl
			font-sans
			select-none
			fixed
			bottom-10
			left-px
			max-sm:right-px
			z-50
		">
			<div className="
				bg-gradient-to-b from-[#1767d0] to-[#4992eb]
				h-16 p-2 flex gap-2 text-white text-lg items-center
			">
				<img className="h-full rounded-md ring-2 ring-[#c0cbe3] ring-opacity-80" src="https://avatars.githubusercontent.com/u/75096786" draggable={false}/>
				<span>Super Zombi</span>
			</div>

			<div className="flex bg-white grid grid-cols-2">
				<div className="py-2">
					{appsList.map(app=>(
						<MenuItem key={app.name} onClick={_=>startApp(app.name, app.icon, app.content)}>
							<img className="h-full py-2" src={app.icon} draggable={false}/>
							<span>{app.name}</span>
						</MenuItem>
					))}
					<div className="my-2 border-t border-[#e5e5e5]" />
					<MenuItem>
						<span>🌐</span>
						<span>Internet Explorer</span>
					</MenuItem>
					<MenuItem>
						<span>📧</span>
						<span>Outlook Express</span>
					</MenuItem>
				</div>
				<div className="bg-[#d3e5fa] py-2 border-l border-[#b4d1f4]">
					<MenuItem>
						<span>🌐</span>
						<span>Internet Explorer</span>
					</MenuItem>
					<MenuItem>
						<span>📧</span>
						<span>Outlook Express</span>
					</MenuItem>
				</div>
			</div>

			<div className="
				bg-gradient-to-t from-[#1767d0] to-[#4992eb]
				h-12 px-2 py-1.5 flex gap-2 text-white text-lg items-center
				justify-end
			">
				<button
					className="
						h-full px-2 py-1.5
						flex items-center gap-2
						rounded text-white text-sm font-semibold
						hover:shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)]
						active:translate-y-[1px]
					"
					onClick={_=>onShutDown()}
				>
					<img className="select-none h-full ring-1 ring-[#c0cbe3] rounded-md" src="a/assets/turn-off.png" draggable={false}/>
					<span>Turn Off</span>
				</button>
			</div>
		</div>
	)
}
