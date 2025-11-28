import { Button } from "@/components/ui/button";
import { ProductForm } from "../_components/ProductForm";
import Link from "next/link";

export default function AddProduct() {
    return (
        <div className="flex flex-col gap-4 pt-4 w-1/3">
            <Link href="/gestor">
                <Button>Volver</Button>
            </Link>
            <h1 className="text-2xl font-bold">Agregar Producto</h1>
            <ProductForm />
        </div>
    )
}