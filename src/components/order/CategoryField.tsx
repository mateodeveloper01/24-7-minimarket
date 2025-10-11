import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "../ui/button"
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { useEffect, useState } from "react"
import { getCategories } from "@/resources/category/api"
import { ControllerRenderProps } from "react-hook-form"
import { cn } from "@/lib/utils"

export const CategoryField = ({ field }: { field: ControllerRenderProps<any> }) => {
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)



  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error cargando categorías:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])
  return (
    <FormItem>
      <FormLabel>Categoría</FormLabel>
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-transparent"
              disabled={isLoading}
            >
              {field.value || (isLoading ? "Cargando..." : "Seleccione o escriba una categoría")}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Buscar o escribir nueva categoría..."
                onValueChange={(value) => {
                  field.onChange(value)
                }}
              />
              <CommandList>
                <CommandEmpty>
                  <div className="p-2 text-sm text-muted-foreground">
                    Presiona Enter para crear "{field.value}"
                  </div>
                </CommandEmpty>
                <CommandGroup className=" overflow-y-scroll w-[300px]">
                  {categories.map((category) => (
                    <CommandItem
                      key={category}
                      value={category}
                      onSelect={(currentValue) => {
                        field.onChange(currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", field.value === category ? "opacity-100" : "opacity-0")}
                      />
                      {category}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
