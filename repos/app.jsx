const { useEffect, useRef, useState } = React;

function App() {
	const [username, setUsername] = useState('')
	const [currentUser, setCurrentUser] = useState('')
	const [metric, setMetric] = useState('size')
	const [repos, setRepos] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const username = params.get('name') || 'SuperZombi'
		setUsername(username)
		loadRepos(username)
		setMetric(params.get('type') || 'size')
	}, [])
	useEffect(() => {
		updateSearchParam('type', metric)
	}, [metric])

	async function getReposData(name) {
		const response = await fetch(`https://api.github.com/users/${name}/repos?per_page=100`)
		if (!response.ok) {
			throw new Error(`HTTP: ${response.status}`)
		}
		return await response.json()
	}

	async function loadRepos(name) {
		if (!name) {
			setRepos(null)
			setError(false)
			history.replaceState(null, '', window.location.pathname)
			return
		}
		if (name === currentUser) return
		updateSearchParam('name', name)

		setLoading(true)
		setError(false)
		setRepos(null)
		setCurrentUser(name)
		try {
			const data = await getReposData(name)
			setRepos(data)
		} catch (e) {
			setError(true)
		} finally {
			setLoading(false)
		}
	}

	function handleSubmit(e) {
		e.preventDefault()
		loadRepos(username.trim())
	}

	function updateSearchParam(key, value) {
		const params = new URLSearchParams(window.location.search)
		params.set(key, value)
		history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
	}

	return (
		<>
			<h3>GitHub</h3>

			<form onSubmit={handleSubmit}>
				<span>Username:</span>
				<input
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button type="submit">OK</button>
			</form>

			{repos && <ChartGraph data={repos} metric={metric} setMetric={setMetric}/>}

			{loading && (
				<p>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="48" fill="#666">
						<path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1m0 19a8 8 0 1 1 8-8 8 8 0 0 1-8 8" opacity="0.25"/>
						<path d="M10.14 1.16a11 11 0 0 0-9 8.92A1.6 1.6 0 0 0 2.46 12a1.5 1.5 0 0 0 1.65-1.3 8 8 0 0 1 6.66-6.61A1.4 1.4 0 0 0 12 2.69a1.57 1.57 0 0 0-1.86-1.53">
							<animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
						</path>
					</svg>
				</p>
			)}
			{error && (
				<h3 style={{ color: 'red' }}>Error</h3>
			)}
		</>
	)
}

function ChartGraph({data, metric, setMetric}) {
	const chartRef = useRef(null)
	const [slice, setSlice] = useState(50)

	useEffect(() => {
		const target_data = data.map(r => [r.name,
			metric === 'stars' ? r.stargazers_count :
			metric === 'size' ? r.size : 0
		]).sort((a, b) => b[1] - a[1])

		const labels = target_data.slice(0, slice).map((r) => r[0])
		const values = target_data.slice(0, slice).map((r) => r[1])

		const chart = new Chart(chartRef.current, {
			type: 'bar',
			data: {
				labels,
				datasets: [{
					label: 'Repo Size',
					data: values,
					backgroundColor: metric === 'stars' ? '#f4d83f' : '#22cfcf'
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				indexAxis: 'y',
				scales: {
					x: {
						ticks: {
							callback(value) {
								if (metric === 'size') return humanFileSize(value)
								return value
							}
						}
					}
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						callbacks: {
							label(context) {
								if (metric === 'stars') return `${context.raw}⭐️`
								if (metric === 'size') return humanFileSize(context.raw)
								return context.raw
							}
						}
					}
				}
			}
		})
		return ()=>{chart.destroy()}
	}, [data, metric, slice])

	return (
		<div id="chart-area">
			<select name="metric" value={metric} onChange={(e) => setMetric(e.target.value)}>
				<option value="size">Filesize</option>
				<option value="stars">Stars</option>
			</select>

			<input
				type="range"
				min="5"
				max="50"
				value={slice}
				step="1"
				name="slice"
				onChange={(e) => setSlice(Number(e.target.value))}
			/>

			{metric === "stars" && (
				<span>Total stars: {data.reduce((acc, repo) => acc + repo.stargazers_count, 0)}⭐️</span>
			)}
			{metric === "size" && (
				<span>Total size: {humanFileSize(data.reduce((acc, repo) => acc + repo.size, 0))}</span>
			)}
			<canvas ref={chartRef}></canvas>
		</div>
	)
}

function humanFileSize(kb) {
	if (kb < 1024) return `${kb} KB`;

	const mb = kb / 1024;
	if (mb < 1024) return `${mb.toFixed(1)} MB`;

	const gb = mb / 1024;
	return `${gb.toFixed(2)} GB`;
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)
