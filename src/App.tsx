import { useState } from 'react'

import './styles/index.css'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="min-h-screen bg-background text-foreground">
			<main className="container mx-auto px-4 py-8">
				<h1 className="text-4xl font-bold text-center mb-8">
					Welcome to Mariana Martins Portfolio
				</h1>
				<div className="text-center">
					<button
						onClick={() => setCount((count) => count + 1)}
						className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
					>
						Count is {count}
					</button>
				</div>
			</main>
		</div>
	)
}

export default App
