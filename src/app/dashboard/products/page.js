import { ProductsContainer } from "@/components/views/ProductsView";

export default function DashboardProducts() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Título principal */}
      <div className="flex-shrink-0 px-8 py-6 bg-white border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
        <p className="text-gray-600 mt-1">Gestión del inventario y catálogo</p>
      </div>

      {/* Contenedor con toda la interactividad */}
      <div className="flex-1 overflow-hidden">
        <ProductsContainer />
      </div>
    </div>
  );
}