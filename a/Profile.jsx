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
					<MenuItem icon="fa-heart" name="Interests" active={active === 'interests'} onClick={() => setActiveTab('interests')} />
					<MenuItem icon="fa-pen" name="Dev Log" active={active === 'dev-log'} onClick={() => setActiveTab('dev-log')} />
					<MenuItem icon="fa-at" name="Contacts" active={active === 'contacts'} onClick={() => setActiveTab('contacts')} />
				</div>
			</div>
		)
	}
	const Section = ({icon, title, items, children, className=""}) => {
		return (
			<div className="ring-1 ring-[#a9c0e0] rounded-sm">
				<div className="bg-[#c3daf2] text-gray-800 text-sm px-3 py-1 flex items-center gap-2 border-b border-[#a9c0e0]">
					<i className={`fa-solid ${icon} text-sm`}></i>
					<span className="font-bold">{title}</span>
				</div>
				<div className="px-2 py-0.5">
					{children ? children : (
						<div className={`
							grid grid-cols-[auto_1fr] items-center
							gap-x-4
							w-full text-xs
							divide-y
							${className}
						`}>
							{items.map((item, index) => {
								return (
									<Row key={index} label={item[0]} value={item[1]} className={item[2]}/>
								)
							})}
						</div>
					)}
				</div>
			</div>
		)
	}
	const Row = ({label, value, className}) => {
		return (
			<div className="grid grid-cols-subgrid col-span-2 items-center py-1.5">
				<div className="text-gray-500">
					{label}
				</div>
				<div className={`text-gray-800 ${className || ''}`}>
					{value}
				</div>
			</div>
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
	const Bar = ({current, total}) => {
		const percent = (current / total) * 100
		return (
			<div className="w-full h-2 bg-[#c3daf2] rounded-sm overflow-hidden ring-1 ring-[#a9c0e0]">
				<div className="h-full bg-[#3275dd]"
					style={{width: `${percent}%`}}
				/>
			</div>
		)
	}
	const ProjectCard = ({title, desc, stack, status, link}) => (
		<div className="border border-[#a9c0e0] bg-[#f4f9ff] rounded-sm p-2 text-xs flex flex-col gap-2">
			<div className="flex justify-between gap-2 items-start">
				<h3 className="font-bold text-[#143f88]">{title}</h3>
				<span className="bg-[#d6ebff] border border-[#96b7e8] px-1 rounded-sm text-[11px]">{status}</span>
			</div>
			<p>{desc}</p>
			<div className="flex gap-1 flex-wrap">{stack.map(item => <Tag key={item}>{item}</Tag>)}</div>
			<a href={link} target="_blank" rel="noreferrer" className="text-[#003399] hover:underline w-fit">
				<i className="fa-solid fa-arrow-up-right-from-square mr-1"></i>Открыть
			</a>
		</div>
	)
	const [userLanguages, setUserLanguages] = React.useState(null)
	React.useEffect(() => {
		getPopularLanguages('SuperZombi').then(setUserLanguages)
	}, [])
	const langTotal = userLanguages?.reduce((sum, lang) => sum + lang.count, 0) || 0
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
					<Section icon={"fa-circle-info"}
						title="General Information"
						items={[
							["Pronouns:", "he/him"],
							["Description:", "React Frontend Web Developer"],
							["IP address:", "192.168.1.101", "font-mono"],
							["Tags:", 
								<React.Fragment>
									<Tag>dev</Tag>
									<Tag>anime</Tag>
									<Tag>git</Tag>
									<Tag>react</Tag>
									<Tag>python</Tag>
								</React.Fragment>
							, "flex gap-1 font-mono"],
						]}
					/>
					<Section icon={"fa-language"}
						title="Languages"
						items={userLanguages?.map(item=>{
							return [
								item.language,
								<Bar current={item.count} total={langTotal}/>
							]
						}) || []}
					>
						{!userLanguages && <div className="flex justify-center p-2"><i className="fa-solid fa-spinner fa-spin"></i></div>}
					</Section>
					<Section icon={"fa-microchip"}
						title="My Computer"
						items={[
							["OS:", "Windows 11 Pro"],
							["CPU:", "Intel Core i5 12450H"],
							["GPU:", "NVIDIA RTX 4060"],
							["RAM:", "16 GB DDR4"],
							["Storage:", "1 TB SSD"]
						]}
					/>
				</div>
			</div>
		)},
		{name: 'projects', content: (
			<div>
				<h2>Projects</h2>
				<p>This is the projects section.</p>
			</div>
		)},
		{name: 'interests', content: (
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
			<div className="overflow-auto max-h-[75dvh]" style={{scrollbarWidth: "thin"}}>
				{tabs.find(tab=>tab.name === activeTab)?.content}
			</div>
		</div>
	)
}
