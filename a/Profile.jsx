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
				<div className="sticky top-0">
					<div className={`flex items-center gap-2 cursor-pointer hover:bg-[#5577bb]
						p-1.5 border-b border-[#5577bb]
						${leftMenuHiden ? 'justify-center' : 'pl-3'}
					`} onClick={_=>setLeftMenuHidden(prev=>!prev)}>
						<i className={`
							fa-solid fa-angles-left text-xs leading-none
							${leftMenuHiden ? 'rotate-180' : 'w-4'}
						`}
						></i>
						{leftMenuHiden ? null : <span className="text-xs">Control Panel</span>}
					</div>
					<div className="flex flex-col">
						<MenuItem icon="fa-user" name="Overview" active={active === 'general'} onClick={() => setActiveTab('general')} />
						<MenuItem icon="fa-code" name="Projects" active={active === 'projects'} onClick={() => setActiveTab('projects')} />
					</div>
				</div>
			</div>
		)
	}
	const Section = ({icon, title, items, children, className=""}) => {
		return (
			<div className="ring-1 ring-[#a9c0e0] rounded-sm">
				<div className="bg-[#c3daf2] text-gray-800 text-sm px-2 py-1 flex items-center gap-2 border-b border-[#a9c0e0]">
					<i className={`${icon.split(" ").length > 1 ? icon : `fa-solid ${icon}`} text-sm`}></i>
					<span className="font-bold">{title}</span>
				</div>
				<div className={children ? "p-2" : "px-2 py-0.5"}>
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
			<div className="bg-[#c3daf2] border border-[#a9c0e0] text-xs font-mono px-1 w-fit rounded-sm">
				{children}
			</div>
		)
	}
	const Link = ({icon, name, url}) => {
		return (
			<a href={url} target="_blank" className="flex items-center gap-1">
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
	const ProjectCard = ({title, desc, link, tags}) => (
		<div className="border border-[#a9c0e0] bg-[#f4f9ff] rounded-sm p-2 text-xs flex flex-col gap-2">
			<div className="flex justify-between gap-2 items-start">
				<a href={link} target="_blank" className="font-bold text-[#143f88] cursor-pointer hover:underline">
					{title}
				</a>
			</div>
			<div>{desc}</div>
			<div className="flex gap-1 flex-wrap">
				{tags.map(item => <Tag key={item}>{item}</Tag>)}
			</div>
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
							, "flex gap-1"],
						]}
					/>
					<Section icon={"fa-link"} title="Connected Accounts">
						<div className="text-xs grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.28),1fr))] gap-2 w-full">
							<Link icon="fa-brands fa-github" name="github" url="https://github.com/SuperZombi"/>
							<Link icon="fa-brands fa-youtube" name="youtube" url="https://www.youtube.com/@SuperZombi"/>
							<Link icon="fa-brands fa-telegram" name="telegram" url="https://t.me/SuperZombi"/>
							<Link icon="fa-solid fa-envelope" name="email" url="mailto:super.zombi.yt@gmail.com"/>
						</div>
					</Section>
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
			<div className="p-3 flex flex-col gap-3 min-w-max">
				{[
				{
					"name": "Browser Extensions",
					"icon": "fa-puzzle-piece",
					"items": [
						[
							"HDrezka Helper", "Downloads movies and subtitles. Supports mirrors", 
							"https://github.com/SuperZombi/HDrezka-Helper", ["js", "html", "css"]
						],
						[
							"PiP for Youtube", "Picture in Picture button and other useful features",
							"https://github.com/SuperZombi/Picture-in-Picture-for-Youtube", ["js", "html", "css"]
						],
					]
				},
				{
					"name": "Applications",
					"icon": "fa-layer-group",
					"items": [
						[
							"GI Cutscenes UI", "User Interface for Genshin Cutscenes Demuxer",
							"https://github.com/SuperZombi/GICutscenesUI", ["python", "js", "html", "css"]
						],
						[
							"MyTube GUI", "Downloads videos from YouTube",
							"https://github.com/SuperZombi/MyTube-GUI", ["python", "react", "js", "css"]
						],
						[
							"Discord Presence", "Customize your Discord Activity as you wish",
							"https://github.com/SuperZombi/Discord-Presence", ["python", "react", "js", "tailwind"]
						],
					]
				},
				{
					"name": "Python Libraries",
					"icon": "fa-brands fa-python",
					"items": [
						[
							"HdRezkaApi", "Unofficial API for HDrezka",
							"https://github.com/SuperZombi/HdRezkaApi", ["python"]
						],
						[
							"MyTube", "Unofficial API for YouTube",
							"https://github.com/SuperZombi/MyTube", ["python"]
						],
					]
				},
				{
					"name": "Games",
					"icon": "fa-gamepad",
					"items": [
						[
							"WoT Modpack", "Lightweight and modern modpack for World of Tanks",
							"https://github.com/SuperZombi/wot-modpack", ["python", "react", "js", "css"]
						],
					]
				},
				].map((cat, index)=>(
					<Section key={index} icon={cat.icon} title={cat.name}>
						<div className="grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.64),1fr))] gap-2">
							{cat.items.map((item, i)=>(
								<ProjectCard
									key={i}
									title={item[0]}
									desc={item[1]}
									link={item[2]}
									tags={item[3]}
								/>
							))}
						</div>
					</Section>
				))}
			</div>
		)}
	]
	return (
		<div className={`h-full grid ${leftMenuHiden ? 'grid-cols-[36px_1fr]' : 'grid-cols-[minmax(theme(spacing.36),auto)_1fr]'}`}>
			<LeftMenu active={activeTab} setActiveTab={setActiveTab} leftMenuHiden={leftMenuHiden} setLeftMenuHidden={setLeftMenuHidden}/>
			<div className="overflow-x-auto" style={{scrollbarWidth: "thin"}}>
				{tabs.find(tab=>tab.name === activeTab)?.content}
			</div>
		</div>
	)
}
