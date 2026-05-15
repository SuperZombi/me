const App = () => {
	const [showStartMenu, setShowStartMenu] = React.useState(false)
	const clickHandler = e => {
		if (!(e.target.closest('.start-menu') || e.target.closest('.start-button'))){
			setShowStartMenu(false)
		}
	}
	const [apps, setApps] = React.useState([])
	const runApp = (name, icon, content) => {
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
					content
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
			icon: "a/icons/user.png",
			content: <Profile/>
		}
	]
	React.useEffect(() => {
		const app = appsList[0]
		runApp(app.name, app.icon, app.content)
	}, [])

	return (
		<div className="w-dvw h-dvh overflow-hidden" onClick={clickHandler}>
			<img className="select-none w-full h-full object-cover" src="a/icons/wall.jpg" draggable={false}/>
			{showStartMenu && (
				<StartMenu
					runApp={runApp} appsList={appsList}
					setShowStartMenu={setShowStartMenu}
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
				>
					{app.content}
				</Window>
			))}
		</div>
	)
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>)
