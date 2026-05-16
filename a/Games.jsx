const Games = ({}) => {
    const ListItem = ({name, icon, url}) => {
        return (
            <li className="py-1">
                <a className="flex items-center gap-2" href={url}>
                    <i className={`fa-solid ${icon} flex items-center justify-center w-6 text-sm leading-none`}></i>
                    <span className="text-blue-600 hover:underline">{name}</span>
                </a>
            </li>
        )
    }
    return (
        <div className="p-3">
            <ul className="divide-y">
                <ListItem name="New Game" icon="fa-plus" url="game"/>
                <ListItem name="Chess" icon="fa-chess-knight" url="chess"/>
                <ListItem name="Cards" icon="fa-diamond" url="https://superzombi.github.io/NURE-Cards/"/>
                <ListItem name="Captcha" icon="fa-robot" url="captcha"/>
                <ListItem name="Visual Novel" icon="fa-desktop" url="https://superzombi.github.io/visual_novel/"/>
                <ListItem name="Monty Hall" icon="fa-dice" url="https://superzombi.github.io/monty_hall/"/>
            </ul>
        </div>
    )
}
