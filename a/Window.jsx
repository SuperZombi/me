const Window = ({name, icon, minimized, setMinimized, close, children}) => {
	const WindowButton = ({src, onClick}) => {
		return (
			<button className="
				h-full ring-1 ring-[#bcecff] rounded cursor-pointer overflow-hidden
				active:translate-y-[1px]
			" onClick={onClick}
				onMouseDown={e => e.stopPropagation()}
			>
				<img className="h-full" src={src} draggable={false}/>
			</button>
		)
	}

	const [isFullscreen, setIsFullscreen] = React.useState(false)
	const [position, setPosition] = React.useState(null)
	const windowRef = React.useRef(null)
	const dragRef = React.useRef({
		dragging: false,
		offsetX: 0,
		offsetY: 0
	})
	const clampPosition = (x, y) => {
		const rect = windowRef.current.getBoundingClientRect()
		const maxX = window.innerWidth - rect.width
		const maxY = window.innerHeight - rect.height
		return {
			x: Math.min(Math.max(0, x), maxX),
			y: Math.min(Math.max(0, y), maxY)
		}
	}
	const startDrag = (clientX, clientY) => {
		const rect = windowRef.current.getBoundingClientRect()
		dragRef.current.dragging = true
		dragRef.current.offsetX = clientX - rect.left
		dragRef.current.offsetY = clientY - rect.top
	}
	const moveDrag = (clientX, clientY) => {
		if (!dragRef.current.dragging) return
		const x = clientX - dragRef.current.offsetX
		const y = clientY - dragRef.current.offsetY
		setPosition(clampPosition(x, y))
	}
	const stopDrag = () => {
		dragRef.current.dragging = false
	}
	React.useEffect(() => {
		const onMouseMove = (e) => {
			moveDrag(e.clientX, e.clientY)
		}
		const onMouseUp = () => {
			stopDrag()
		}
		const onTouchMove = (e) => {
			const touch = e.touches[0]
			moveDrag(touch.clientX, touch.clientY)
		}
		const onTouchEnd = () => {
			stopDrag()
		}
		window.addEventListener("mousemove", onMouseMove)
		window.addEventListener("mouseup", onMouseUp)
		window.addEventListener("touchmove", onTouchMove, {
			passive: false
		})
		window.addEventListener("touchend", onTouchEnd)
		return () => {
			window.removeEventListener("mousemove", onMouseMove)
			window.removeEventListener("mouseup", onMouseUp)
			window.removeEventListener("touchmove", onTouchMove)
			window.removeEventListener("touchend", onTouchEnd)
		}
	}, [])
	React.useEffect(() => {
		const onResize = () => {
			if (!position) return
			setPosition(prev => clampPosition(prev.x, prev.y))
		}
		window.addEventListener("resize", onResize)
		return () => {
			window.removeEventListener("resize", onResize)
		}
	}, [position])

	const toggleFullscreen = () => {
		if (!isFullscreen) {
			setPosition({x: 0, y: 0})
			setIsFullscreen(true)
		}
		else {
			setIsFullscreen(false)
			setPosition(null)
		}
	}
	if (minimized) return

	return (
		<div className={`absolute
			border-2 border-[#2359ab]
			overflow-hidden
			${isFullscreen
				? "w-dvw h-[calc(100dvh-theme(spacing.10))] z-40"
				: `rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
					max-sm:w-[calc(100dvw-theme(spacing.1))]
				`
			}
		`}
			ref={windowRef}
			style={
				position
					? {
						left: `${position.x}px`,
						top: `${position.y}px`,
						transform: "none"
					}
					: {}
			}
		>
			<div className={`
				bg-gradient-to-b from-[#096df5] to-[#0260f6]
				border-b border-[#2359ab]
				h-10 flex items-center justify-between
				text-white select-none gap-5 px-2
				${isFullscreen ? "" : "cursor-move"}
			`}
				onMouseDown={isFullscreen ? null : e => startDrag(e.clientX, e.clientY)}
				onTouchStart={isFullscreen ? null : e => {
					const touch = e.touches[0]
					startDrag(touch.clientX, touch.clientY)
				}}
			>
				<div className="h-full flex items-center gap-1">
					<img className="h-full py-2" src={icon} draggable={false}/>
					<span>{name}</span>
				</div>
				<div className="h-full py-2 flex gap-1">
					<WindowButton src="a/assets/hide.png" onClick={_=>setMinimized(true)}/>
					<WindowButton src="a/assets/fullscreen.png" onClick={toggleFullscreen}/>
					<WindowButton src="a/assets/close.png" onClick={close}/>
				</div>
			</div>
			<div className="bg-white h-full text-gray-200">
				{children}
			</div>
		</div>
	)
}
