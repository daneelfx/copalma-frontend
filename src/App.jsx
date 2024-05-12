import PollinationMap from './pages/PollinationMap'
import Header from './components/Header'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

import { MantineProvider } from '@mantine/core'

function App() {
  return (
    <MantineProvider>
      {/* <Header /> */}
      <PollinationMap />
    </MantineProvider>
  )
}

export default App
