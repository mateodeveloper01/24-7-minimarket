'use client'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { Button } from '../ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { getBrand, getTipos } from '@/api'
import { useQuery } from '@tanstack/react-query'

interface Props {
	category: string
	brandState: string | undefined
	tipoState: string | undefined
	setBrand: Dispatch<SetStateAction<string | undefined>>
	setTipo: Dispatch<SetStateAction<string | undefined>>
}

export const ProductsFilters = ({ category, brandState, setBrand, setTipo, tipoState }: Props) => {
	const [open, setOpen] = useState({ tipos: false, brands: false })

	const { data: brands } = useQuery({
		queryKey: ['products', 'category', 'brand'],
		queryFn: async () => await getBrand(category),
		gcTime: 100000
	})
	const { data: tipos } = useQuery({
		queryKey: ['products', 'category', 'tipos'],
		queryFn: async () => await getTipos(category),
		gcTime: 24 * 60 * 60 * 1000
	})
	return (
		<>
			<div className="md:hidden flex flex-col gap-4">
				<h1>Filtrar por</h1>
				<div className="flex gap-4">
					<Popover open={open.tipos} onOpenChange={() => setOpen({ tipos: !open.tipos, brands: false })}>
						<PopoverTrigger asChild>
							<Button variant="outline" role="combobox" aria-expanded={open.tipos} className="w-[200px] justify-between">
								Tipo
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0">
							<Command>
								<CommandInput placeholder="Buscar tipo..." />
								<CommandList>
									<CommandEmpty>No framework found.</CommandEmpty>
									<CommandGroup>
										{tipos &&
											tipos.map(({ tipo }: { tipo: string }) => (
												<CommandItem
													key={tipo}
													value={tipo}
													onSelect={(currentValue) => {
														setTipo(currentValue === tipoState ? '' : currentValue)
														;() => setOpen({ tipos: false, brands: false })
													}}
													className="capitalize"
												>
													<Check className={cn('mr-2 h-4 w-4', tipoState === tipo ? 'opacity-100' : 'opacity-0')} />
													{tipo}
												</CommandItem>
											))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					<Popover open={open.brands} onOpenChange={() => setOpen({ tipos: false, brands: !open.brands })}>
						<PopoverTrigger asChild>
							<Button variant="outline" role="combobox" aria-expanded={open.brands} className="w-[200px] justify-between">
								Marca
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0">
							<Command>
								<CommandInput placeholder="Buscar marca..." />
								<CommandList>
									<CommandEmpty>No framework found.</CommandEmpty>
									<CommandGroup>
										{tipos &&
											tipos.map(({ tipo }: { tipo: string }) => (
												<CommandItem
													key={tipo}
													value={tipo}
													onSelect={(currentValue) => {
														setBrand(currentValue === brandState ? '' : currentValue)
														setOpen({ tipos: false, brands: false })
													}}
													className="capitalize"
												>
													<Check className={cn('mr-2 h-4 w-4', brandState === tipo ? 'opacity-100' : 'opacity-0')} />
													{tipo}
												</CommandItem>
											))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
			</div>
			<Accordion className="w-1/5 px-5 max-md:hidden" type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Tipo de producto</AccordionTrigger>
					<AccordionContent>
						{tipos &&
							tipos.map(({ tipo }: { tipo: string }) => (
								<div key={tipo} className="flex items-center gap-3">
									<Checkbox checked={tipoState === tipo} onCheckedChange={() => setTipo(tipoState === tipo ? undefined : tipo)} />
									<Label className="text-md capitalize">{tipo}</Label>
								</div>
							))}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Marca</AccordionTrigger>
					<AccordionContent>
						{brands &&
							brands.map(({ brand }: { brand: string }) => (
								<div key={brand} className="flex items-center gap-3">
									<Checkbox checked={brandState === brand} onCheckedChange={() => setBrand(brandState === brand ? undefined : brand)} />
									<Label className="text-md capitalize">{brand}</Label>
								</div>
							))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	)
}
