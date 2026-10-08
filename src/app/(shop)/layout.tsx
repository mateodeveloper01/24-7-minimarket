import { AboutMe } from '@/components/aboutMe/AboutMe'
import { TopMenu } from '@/components/menu/top-menu/top-menu'
import { MaintenanceScreen } from '@/components/maintenance/MaintenanceScreen'
import { getMaintenanceMode } from '@/resources/site-settings/api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Mini market'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	if (await getMaintenanceMode()) {
		return <MaintenanceScreen />
	}
	return (
		<>
			<TopMenu />
			{children}
			<AboutMe />
		</>
	)
}
