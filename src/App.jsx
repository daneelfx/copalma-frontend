import Dashboard from './pages/PollinationMap'
import Header from './components/Header'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

function App() {
  return (
    <MantineProvider>
      <Dashboard />
    </MantineProvider>
  )
}

export default App
