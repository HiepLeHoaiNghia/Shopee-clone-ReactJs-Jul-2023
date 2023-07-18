import { createContext } from 'vm'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: 
}

export const appContext = createContext<AppContextInterface>()
