import { AboutMe } from '@/components/aboutMe/AboutMe'
import { TopMenu } from '@/components/menu/top-menu/top-menu'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Mini market'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<TopMenu />
			{children}
			<AboutMe />
		</>
	)
}
