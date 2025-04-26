import { Router } from '../../lib/electron-router-dom'
import { Route } from 'react-router-dom'
import MainScreen from './screens/main.screen'
import { Layout } from './layout'
import SettingsScreen from './screens/settings.screen'
export function AppRoutes(): React.ReactElement {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Route>
          {/* <Route path="/search" element={<SearchScreen />} /> */}
        </>
      }
      // about={<Route path="/" element={<AboutScreen />} />}
    />
  )
}
