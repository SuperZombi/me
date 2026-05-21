const App = () => {
	const [showShutDown, setShowShutDown] = React.useState(false)
	const [showShutDownImg, setShowShutDownImg] = React.useState(true)
	const [welcomeAudioPlayed, setWelcomeAudioPlayed] = React.useState(false)
	const [showStartMenu, setShowStartMenu] = React.useState(false)
	const [showWall, setShowWall] = React.useState(false)
	const clickHandler = e => {
		if (!(e.target.closest('.start-menu') || e.target.closest('.start-button'))){
			setShowStartMenu(false)
		}
		if (!welcomeAudioPlayed){playSound()}
	}
	const [apps, setApps] = React.useState([])
	const runApp = (name, icon, content, is_error=false) => {
		setApps(prev => {
			const exists = prev.find(app => app.name === name)
			if (exists) {
				return prev.map(app =>
					app.name === name
						? { ...app, minimized: false, zIndex: 40 }
						: app
				)
			}
			return [...prev,
				{
					id: crypto.randomUUID(),
					name,
					icon,
					minimized: false,
					content,
					is_error,
					zIndex: 40
				}
			]
		})
	}
	const setMinimized = (win_id) => {
		return (value) => {
			setApps(prev =>
				prev.map(app =>
					app.id === win_id
						? { ...app, minimized: typeof value === 'function' ? value(app.minimized) : value,
							zIndex: value ? 40 : 20
						} : {...app, zIndex: 20}
				)
			)
		}
	}
	const closeWindow = (win_id) => {
		setApps(prev => prev.filter(app => app.id !== win_id))
	}
	const appsList = [
		{
			name: "Profile",
			icon: "a/assets/user.png",
			content: <Profile getPopularLanguages={getPopularLanguages}/>
		},
		{
			name: "Internet Explorer",
			icon: "a/assets/browser.png",
			content: <Browser/>
		},
		{
			name: "Games",
			icon: "a/assets/game.png",
			content: <Games/>
		},
		{
			name: "My Computer",
			icon: "a/assets/trash.png",
			content: <MyComputer/>
		}
	]
	const playSound = () => {
		const audio = new Audio("a/assets/startup.mp3")
		audio.play().then(_=>{
			setWelcomeAudioPlayed(true)
			setTimeout(() => {
				const err_audio = new Audio("a/assets/error.mp3")
				err_audio.play()
				const app_name = "Local Disk (C:)"
				runApp(app_name, "a/assets/error.png", <NoDiskSpaceError onClose={_=>
					setApps(prev => prev.filter(app => app.name !== app_name)
				)}/>, true)
			}, 5000)
		})
		.catch(err => {
			console.log("Blocked autoplay:", err)
		})
	}
	React.useEffect(() => {
		setTimeout(() => {
			playSound()
			setShowWall(true)
		}, 0)
	}, [])
	const onShutDown = _=>{
		setShowShutDown(true)
		const audio = new Audio("a/assets/shutdown.mp3")
		audio.play()
		setTimeout(() => {
			setShowShutDownImg(false)
		}, 2500)
	}
	const FocusApp = (app_id) => {
		setApps(prev => prev.map(a => a.id === app_id ? {...a, zIndex: 40} : {...a, zIndex: 20}))
	}

	return (
		<div className="w-dvw h-dvh overflow-hidden bg-black" onClick={clickHandler}>
			{showShutDown ? (
				<img className={`w-dvw h-dvh fixed inset-0 object-cover z-50 select-none ${showShutDownImg ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
					src="a/assets/windows-xp-screen.jpg" draggable={false}
				/>
			) : (
			<React.Fragment>
				<img className={`select-none w-full h-full object-cover ${showWall ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
					src="a/assets/wall.jpg" draggable={false}
				/>
				<img className={`select-none absolute bottom-14 right-4 h-10 w-10 ${showWall ? 'opacity-100' : 'opacity-0'} delay-1000`}
					src="a/assets/trash.png" draggable={false}
				/>
				{showStartMenu && (
					<StartMenu
						runApp={runApp} appsList={appsList}
						setShowStartMenu={setShowStartMenu}
						onShutDown={onShutDown}
					/>
				)}
				<TaskBar
					apps={apps}
					setShowStartMenu={setShowStartMenu}
					setMinimized={setMinimized}
				/>
				{apps.map(app=>(
					<Window key={app.id} name={app.name} icon={app.icon}
						minimized={app.minimized}
						setMinimized={setMinimized(app.id)}
						close={_=>closeWindow(app.id)}
						is_error={app.is_error}
						zIndex={app.zIndex}
						onFocus={_=>FocusApp(app.id)}
					>
						{app.content}
					</Window>
				))}
			</React.Fragment>
			)}
		</div>
	)
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>)

const NoDiskSpaceError = ({onClose}) => {
	return (
		<div className="flex flex-col items-center p-3 gap-3">
			<div className="flex gap-3 items-center w-max">
				<img className="select-none h-6" src="a/assets/error.png" draggable={false}/>
				<div className="flex flex-col">
					<span>No more disk space.</span>
					<span>Delete Windows?</span>
				</div>
			</div>
			<button className="bg-gray-100 border border-gray-600 px-2 active:translate-y-[1px]"
				onClick={onClose}
			>Yes</button>
		</div>
	)
}



const MyComputer = () => {
	const specs = [
		["OS", "Windows XP Professional (Retro Build)"],
		["CPU", "Intel Core i5 / Ryzen 5 (пример)"],
		["RAM", "16 GB DDR4 (можно заменить на свои)"],
		["GPU", "NVIDIA GTX/RTX или AMD Radeon"],
		["Storage", "SSD 512 GB + HDD 1 TB"],
		["Internet", "Ethernet / Wi‑Fi"],
	]
	const ideas = [
		"Сделать страницу 'Guestbook' с сообщениями друзей.",
		"Добавить Achievements: 'Открыл 5 окон', 'Нашел пасхалку'.",
		"Спрятать hidden file на рабочем столе с секретной ссылкой.",
		"Сделать Winamp-like мини плеер со своими треками.",
		"Добавить 'BSOD prank' как редкую пасхалку (без вреда).",
	]
	return (
		<div className="p-3 text-xs min-w-max flex flex-col gap-3">
			<div className="ring-1 ring-[#a9c0e0] rounded-sm overflow-hidden">
				<div className="bg-[#c3daf2] px-3 py-1 font-bold border-b border-[#a9c0e0]">System Properties</div>
				<div className="p-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
					{specs.map(([k,v]) => <React.Fragment key={k}><div className="text-gray-500">{k}:</div><div>{v}</div></React.Fragment>)}
				</div>
			</div>
			<div className="ring-1 ring-[#a9c0e0] rounded-sm overflow-hidden">
				<div className="bg-[#c3daf2] px-3 py-1 font-bold border-b border-[#a9c0e0]">Что еще можно добавить в визитку</div>
				<ul className="p-3 list-disc pl-7 space-y-1">
					{ideas.map(i => <li key={i}>{i}</li>)}
				</ul>
			</div>
		</div>
	)
}
const cachedUserLanguages = {}
async function getPopularLanguages(username) {
	if (cachedUserLanguages[username]) {
		return cachedUserLanguages[username]
	}
	const res = await fetch(
		`https://api.github.com/users/${username}/repos?per_page=100`
	)
	if (res.ok){
		const repos = await res.json()
		const counts = {}
		for (const repo of repos) {
			if (!repo.language) continue
			counts[repo.language] = (counts[repo.language] || 0) + 1
		}
		const result = Object.entries(counts)
			.sort((a, b) => b[1] - a[1])
			.map(([language, count]) => ({
				language,
				count
			}))
		cachedUserLanguages[username] = result
		return result
	}
}
