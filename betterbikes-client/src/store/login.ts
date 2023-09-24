import {create} from 'zustand'

type isLoggedIn = {
    loggedIn: boolean
    setLoggedIn: (loggedIn: boolean) => void
}

export const useIsLoggedIn = create<isLoggedIn>((set) => ({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean) => set({loggedIn})
}))

