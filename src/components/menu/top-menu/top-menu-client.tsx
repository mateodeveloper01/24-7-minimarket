'use client'
import Link from 'next/link'
import { AlignJustify, Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../../ui/sheet'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { usePathname, useRouter } from 'next/navigation'
import { useCartStore } from '@/stores/useCartStore'
import { useUser } from "@auth0/nextjs-auth0"

export const TopMenuClient = ({ categories }: { categories: string[] }) => {
	const { user, isLoading } = useUser()
	const totalPrice = useCartStore((state) => state.totalPrice)
	const [isScrolled, setIsScrolled] = useState(false)
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		let timeoutId: NodeJS.Timeout
		const handleScroll = () => {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => {
				setIsScrolled(window.scrollY > 100)
			}, 50)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			clearTimeout(timeoutId)
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const searchQuery = (event.target as HTMLFormElement).search.value
		router.push(`/buscador?query=${searchQuery}`)
	}
	return (
		<>
			<header className={`sticky top-0 flex justify-center bg-gray-200 z-50 w-full transition-all duration-300 ${isScrolled ? 'py-2 md:px-10' : 'p-5 md:px-10'}`}>
				<div className="flex justify-between md:w-[900px] w-max items-center gap-1">
					<Link href={'/'} className="flex items-center">
						<Image
							src="/favicon.ico"
							alt="Favicon"
							width={100}
							height={100}
							className={`mr-2 transition-transform duration-300 max-md:w-[60px] max-md:h-[60px] ${isScrolled ? 'md:scale-50' : 'md:scale-100'}`}
						/>
					</Link>

					{/* <Link href={"/buscador"} className=""> */}
					<form onSubmit={handleSearch} className="w-3/5 only:flex gap-2 rounded-md border border-input px-2 flex">
						<Input
							className="border-none "
							placeholder="Buscar"
							name="search"
						// onChange={handleChange}
						/>
						<button type="submit">
							<Search />
						</button>
					</form>
					{/* </Link> */}
					<Link href={'/pedido'}>
						<Button className="cursor-pointer flex gap-2 max-md:hidden  bg-primary hover:bg-black">
							<ShoppingCart />
							<p>${totalPrice}</p>
						</Button>
					</Link>
					<Sheet>
						<SheetTrigger className="md:hidden py-0" asChild>
							<Button className="bg-secondary">
								<AlignJustify className="text-4xl" />
							</Button>
						</SheetTrigger>
						<SheetContent className="flex flex-col justify-between w-[215px]">
							<SheetClose asChild>
								<Link href={`/`} className={`hover:underline uppercase  border-black font-bold ${pathname === '/' && 'text-white bg-secondary '} rounded p-2`}>
									Inicio
								</Link>
							</SheetClose>
							{categories.map((item) => (
								<SheetClose asChild key={item}>
									<Link
										href={`/${item}`}
										className={`hover:underline uppercase   border-black font-bold ${pathname.slice(1) === item && 'text-white bg-secondary drop-shadow-2xl '} rounded p-2`}
									>
										{item.replace(/_/g, ' ')}
									</Link>
								</SheetClose>
							))}
						</SheetContent>
					</Sheet>
					{
						user && (
							<>
								<Link href={'/gestor'} className="cursor-pointer">
									<Button className="bg-blue-500 cursor-pointer">Gestor</Button>
								</Link>
								<Link href={'/auth/logout'} className="cursor-pointer">
									<Button className="bg-blue-500 cursor-pointer">Desconectar</Button>
								</Link>
							</>
						)
					}
				</div>
			</header>
			<ul className="mt-4 hidden gap-2 md:flex w-full justify-around max-w-[1000px] ">
				{categories.map((item) => (
					<Link
						key={item}
						href={`/${item}`}
						className={`capitalize text-sm font-semibold text-[#424242] hover:text-gray-500 transform transition delay-50 w-full py-2 text-center flex justify-center items-center `}
					>
						{item.replace(/_/g, ' ')}
					</Link>
				))}
			</ul>

		</>
	)
}
