'use client'
import { useRef, useMemo } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import Image from 'next/image'

export const CarouselContainer = () => {
	const plugin = useMemo(() => Autoplay({ delay: 2000, stopOnInteraction: true }), [])
	const pluginRef = useRef(plugin)

	const handleMouseEnter = () => {
		pluginRef.current?.stop()
	}

	const handleMouseLeave = () => {
		pluginRef.current?.reset()
	}

	return (
		<Carousel plugins={[plugin]} className=" flex justify-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<CarouselContent>
				{Array.from({ length: 4 }).map((_, index) => (
					<CarouselItem key={index}>
						<div className="p-1">
							<Image src={`/carousel/${index + 1}.jpg`} alt="" width={1200} height={1200} />
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}
