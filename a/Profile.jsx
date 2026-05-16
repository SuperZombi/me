const Profile = ({getPopularLanguages}) => {
	const [activeTab, setActiveTab] = React.useState('general')
	const [leftMenuHiden, setLeftMenuHidden] = React.useState(false)
	const MenuItem = ({icon, name, active, onClick}) => {
		return (
			<button className={`
				flex items-center gap-2 ${active ? 'bg-[#3a5faa]' : 'hover:bg-[#5577bb]'}
				${leftMenuHiden ? 'p-2 justify-center' : 'px-3 py-1'}
			`} onClick={onClick}>
				<i className={`fa-solid ${icon} text-xs w-4 leading-none`}></i>
				{leftMenuHiden ? null : <span className="text-sm">{name}</span>}
			</button>
	)}
	const LeftMenu = ({active, leftMenuHiden, setLeftMenuHidden, setActiveTab}) => {
		return (
			<div className="bg-[#6e88dd] text-gray-200 h-full select-none">
				<div className={`flex items-center gap-2 cursor-pointer pt-1
					${leftMenuHiden ? 'justify-center' : 'pl-3'}
				`} onClick={_=>setLeftMenuHidden(prev=>!prev)}>
					<i className={`
						fa-solid fa-angles-left text-xs w-4 leading-none
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
				<div className="bg-[#c3daf2] text-gray-800 text-sm px-3 py-1 flex items-center gap-2 border-b border-[#a9c0e0]">
					<i className={`fa-solid ${icon} text-sm leading-none`}></i>
					<span className="font-bold">{title}</span>
				</div>
				<div className="p-2">
					{children}
				</div>
			</div>
		)
	}
	const Row = ({label, value, className}) => {
		return (
			<React.Fragment>
				<div className="text-gray-500">
					{label}
				</div>
				<div className={`text-gray-800 ${className || ''}`}>
					{value}
				</div>
			</React.Fragment>
		)
	}
	const Tag = ({children}) => {
		return (
			<div className="bg-[#c3daf2] border border-[#a9c0e0] text-xs px-1 w-fit rounded-sm">
				{children}
			</div>
		)
	}
	const Link = ({icon, name, url}) => {
		return (
			<a href={url} className="flex items-center gap-1">
				<i className={`${icon} w-5 flex items-center justify-center leading-none`}></i>
				<span className="hover:underline">{name}</span>
			</a>
		)
	}
	const [userLanguages, setUserLanguages] = React.useState(null)
	React.useEffect(() => {
		getPopularLanguages('SuperZombi').then(setUserLanguages)
	}, [])
	const total = userLanguages?.reduce((sum, lang) => sum + lang.count, 0) || 0
	const tabs = [
		{name: 'general', content: (
			<div className="min-w-max">
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
				<div className="p-3 flex flex-col gap-3">
					<Section icon={"fa-circle-info"} title="General Information">
						<div className="text-xs grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1.5 w-full">
							<Row label="Pronouns:" value="he/him" />
							<Row label="Description:" value="React Frontend Web Developer" />
							<Row label="IP address:" value="192.168.1.101" className="font-mono" />
							<Row label="Tags:" value={(
								<React.Fragment>
									<Tag>dev</Tag>
									<Tag>anime</Tag>
									<Tag>git</Tag>
									<Tag>react</Tag>
									<Tag>python</Tag>
								</React.Fragment>
							)} className="flex gap-1"/>
						</div>
					</Section>
					{userLanguages && (
						<Section icon={"fa-microchip"} title="Languages">
							<div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 w-full">
								{userLanguages.map(lang => {
									const percent = (lang.count / total) * 100
									return (
										<React.Fragment key={lang.language}>
											<div className="text-xs truncate text-gray-600">
												{lang.language}
											</div>
											<div className="w-full h-2.5 bg-[#ddddee] rounded-xs overflow-hidden ring-1 ring-[#aaaabb]">
												<div className="h-full bg-[#3275dd]"
													style={{width: `${percent}%`}}
												/>
											</div>
										</React.Fragment>
									)
								})}
							</div>
						</Section>
					)}
				</div>
			</div>
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
			<div className="min-w-max">
				<div className="p-3 flex flex-col gap-3">
					<Section icon={"fa-link"} title="Connected Accounts">
						<div className="text-xs flex flex-col gap-y-1.5 w-full">
							<Link icon="fa-brands fa-github" name="github" url="https://github.com/SuperZombi"/>
							<Link icon="fa-brands fa-youtube" name="youtube" url="https://www.youtube.com/@SuperZombi"/>
							<Link icon="fa-brands fa-telegram" name="telegram" url="https://t.me/SuperZombi"/>
							<Link icon="fa-solid fa-envelope" name="email" url="mailto:super.zombi.yt@gmail.com"/>
						</div>
					</Section>
				</div>
			</div>
		)}
	]
	return (
		<div className={`h-full grid ${leftMenuHiden ? 'grid-cols-[36px_1fr]' : 'grid-cols-[minmax(theme(spacing.36),auto)_1fr]'}`}>
			<LeftMenu active={activeTab} setActiveTab={setActiveTab} leftMenuHiden={leftMenuHiden} setLeftMenuHidden={setLeftMenuHidden}/>
			<div className="overflow-auto">
				{tabs.find(tab=>tab.name === activeTab)?.content}
			</div>
		</div>
	)
}
