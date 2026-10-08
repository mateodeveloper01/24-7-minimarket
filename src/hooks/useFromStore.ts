'use client'
import { useSyncExternalStore } from "react"

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export default function useFromStore<T, F>(
	store: (callback: (state: T) => unknown) => unknown,
	storeCallback: (state: T) => F
) {
	const stateOfStore = store(storeCallback) as F
	const hydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
	return hydrated ? stateOfStore : undefined
}
