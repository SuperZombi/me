const Profile = () => {
	const [activeTab, setActiveTab] = React.useState('general')
	const [leftMenuHiden, setLeftMenuHidden] = React.useState(false)
	const MenuItem = ({icon, name, active, onClick}) => {
		return (
			<button className={`
				flex items-center gap-2 px-3 py-1 ${active ? 'bg-[#3a5faa]' : 'hover:bg-[#5577bb]'
			}`} onClick={onClick}>
				<i className={`fa-solid ${icon} text-xs w-4 flex justify-center items-center`}></i>
				{leftMenuHiden ? null : <span className="text-sm">{name}</span>}
			</button>
	)}
	const LeftMenu = ({active, leftMenuHiden, setLeftMenuHidden, setActiveTab}) => {
		return (
			<div className="bg-[#6e88dd] h-full select-none">
				<div className="flex items-center gap-2 pl-3 pt-1 cursor-pointer" onClick={_=>setLeftMenuHidden(prev=>!prev)}>
					<i className={`
						fa-solid fa-angles-left text-xs w-4 flex justify-center items-center
						${leftMenuHiden ? 'rotate-180' : ''}
					`}
					></i>
					{leftMenuHiden ? null : <span className="text-xs">Control Panel</span>}
				</div>
				<div className="my-1 border-t border-[#5577bb]" />
				<div className="flex flex-col">
					<MenuItem icon="fa-user" name="General" active={active === 'general'} onClick={() => setActiveTab('general')} />
					<MenuItem icon="fa-code" name="Projects" active={active === 'projects'} onClick={() => setActiveTab('projects')} />
					<MenuItem icon="fa-heart" name="Interests" active={active === 'intersts'} onClick={() => setActiveTab('intersts')} />
					<MenuItem icon="fa-pen" name="Dev Log" active={active === 'dev-log'} onClick={() => setActiveTab('dev-log')} />
					<MenuItem icon="fa-at" name="Contacts" active={active === 'contacts'} onClick={() => setActiveTab('contacts')} />
				</div>
			</div>
		)
	}
	const Section = ({icon, title, children}) => {
		return (
			<div className="ring-1 ring-[#a9c0e0] rounded-sm">
				<div className="bg-[#c3daf2] text-[#000033] text-sm px-3 py-1 flex items-center gap-2 border-b border-[#a9c0e0]">
					<i className={`fa-solid ${icon}`}></i>
					<span className="font-bold">{title}</span>
				</div>
				<div className="p-2">
					{children}
				</div>
			</div>
		)
	}
	const tabs = [
		{name: 'general', content: (
			<React.Fragment>
				<div className="bg-[#c3daf2] p-3 flex items-center gap-3 border-b border-[#a9c0e0] whitespace-nowrap">
					<img className="h-12 ring-2 ring-[#7090c0] rounded-sm select-none" src="https://avatars.githubusercontent.com/u/75096786" draggable={false} />
					<div className="flex flex-col">
						<span className="text-[#003399] font-bold">Super Zombi</span>
						<span className="text-[#333366] text-xs">full-time bug creator</span>
					</div>
					<div className="flex items-center gap-1 ml-auto">
						<span className="rounded-full bg-green-600 w-2 h-2 flex ring-1 ring-green-700"></span>
						<span className="text-[#333366] text-xs">Online</span>
					</div>
				</div>
				<div className="p-3">
					<Section icon={"fa-circle-info"} title="General Information">
						Hello
					</Section>
				</div>
			</React.Fragment>
		)},
		{name: 'projects', content: (
			<div>
				<h2>Projects</h2>
				<p>This is the projects section.</p>
			</div>
		)},
		{name: 'intersts', content: (
			<div>
				<h2>Interests</h2>
				<p>This is the interests section.</p>
			</div>
		)},
		{name: 'dev-log', content: (
			<div>
				<h2>Dev Log</h2>
				<p>This is the development log section.</p>
			</div>
		)},
		{name: 'contacts', content: (
			<div>
				<h2>Contacts</h2>
				<p>This is the contacts section.</p>
			</div>
		)}
	]
	return (
		<div className={`h-full grid ${leftMenuHiden ? 'grid-cols-[40px_1fr]' : 'grid-cols-[clamp(120px,30vw,180px)_minmax(0,1fr)]'}`}>
			<LeftMenu active={activeTab} setActiveTab={setActiveTab} leftMenuHiden={leftMenuHiden} setLeftMenuHidden={setLeftMenuHidden}/>
			<div className="overflow-auto">
				{tabs.find(tab=>tab.name === activeTab)?.content}
			</div>
		</div>
	)
}
