const App = () => {
	const [showShutDown, setShowShutDown] = React.useState(false)
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
						? { ...app, minimized: false }
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
					is_error
				}
			]
		})
	}
	const setMinimized = (win_id) => {
		return (value) => {
			setApps(prev =>
				prev.map(app =>
					app.id === win_id
						? { ...app, minimized: typeof value === 'function' ? value(app.minimized) : value }
						: app
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
	const onShutDown = _=>{setShowShutDown(true)}

	return (
		<div className="w-dvw h-dvh overflow-hidden bg-black" onClick={clickHandler}>
			<img className={`select-none w-full h-full object-cover ${showWall ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
				src="a/assets/wall.jpg" draggable={false}
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
				>
					{app.content}
				</Window>
			))}
			{showShutDown && (
				<video className="w-dvw h-dvh inset-0 fixed z-50 object-cover" src="a/assets/shutdown.mp4" autoPlay></video>
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
