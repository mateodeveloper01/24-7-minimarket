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
import { type PromotionImage } from '@prisma/client'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"

const PromotionCarousel = ({ promotionImages }: { promotionImages: PromotionImage[] }) => {
	return (
		<div className="w-full flex justify-center py-4">
			<Carousel className="w-full max-w-6xl" plugins={[
				Autoplay({
					delay: 5000,
				}),
			]}>
				<CarouselContent className="-ml-2 md:-ml-4">
					{promotionImages.map(({ id, url }) => (
						<CarouselItem key={id} className="pl-2 md:pl-4 basis-1/3">
							<div className="flex justify-center">
								<Image
									src={url}
									alt="Promotion"
									width={400}
									height={300}
									className="w-full h-auto object-cover rounded-lg"
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}

const PromotionMarquee = ({ text }: { text: string }) => {
	return (
		<div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#ED26D9] via-[#ED26D9] to-[#ED26D9] text-white text-center py-3 z-50 text-sm font-semibold overflow-hidden shadow-lg">
			<style>{`
				@keyframes marquee {
					0% { transform: translateX(900px); }
					50% { transform: translateX(-400px); }
					100% { transform: translateX(-200px); }
				}
				.marquee-text {
					display: inline-block;
					animation: marquee 40s ease-in-out infinite;
				}
			`}</style>
			<div className="marquee-text">{text}</div>
		</div>
	)
}

export const TopMenuClient = ({ categories, promotion, promotionImages }: { categories: string[], promotion: string, promotionImages: PromotionImage[] }) => {
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
			<PromotionMarquee text={promotion} />
			<header className={`bg-white border-b  sticky top-[40px] flex justify-center z-50 w-full transition-all duration-300 ${isScrolled ? 'py-2 md:px-10' : 'p-5 md:px-10'}`} >


				<div className="flex justify-between md:w-[900px] w-max items-center gap-1">
					<Link href={'/'} className="flex items-center">
						<Image
							src="/favicon.ico"
							alt="Favicon"
							width={100}
							height={100}
							className={`hover:scale-105 mr-2 transition-transform duration-300 max-md:w-[60px] max-md:h-[60px] ${isScrolled ? 'md:scale-50' : 'md:scale-100'}`}
						/>
					</Link>
					{/* <Link href={'/'} className="flex items-center">
						<Image
							src="/logo-cruz-ceramica.png"
							alt="Favicon"
							width={100}
							height={100}
							className={`hover:scale-105 mr-2 transition-transform duration-300 max-md:w-[60px] max-md:h-[60px] ${isScrolled ? 'md:scale-50' : 'md:scale-100'}`}
						/>
					</Link> */}

					{/* <Link href={"/buscador"} className=""> */}
					<form onSubmit={handleSearch} className="bg-white w-3/5 only:flex gap-2 rounded-md border border-input px-2 flex">
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
								<AlignJustify className="text-4xl text-black" />
							</Button>
						</SheetTrigger>
						<SheetContent className="flex flex-col justify-between w-[215px]">
							<SheetClose asChild>
								<Link href={`/`} className={`hover:underline uppercase  border-black font-bold ${pathname === '/' && 'text-black bg-secondary '} rounded p-2`}>
									Inicio
								</Link>
							</SheetClose>
							{categories.map((item) => (
								<SheetClose asChild key={item}>
									<Link
										href={`/${item}`}
										className={`hover:underline uppercase   border-black font-bold ${pathname.slice(1) === item && 'text-black bg-secondary drop-shadow-2xl '} rounded p-2`}
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
			<ul className="mt-12 hidden gap-2 md:flex w-full justify-around max-w-[1000px]  ">
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
			<div className="border-t w-full mt-2" />
			<PromotionCarousel promotionImages={promotionImages} />
		</>
	)
}
