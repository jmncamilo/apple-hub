import Image from 'next/image';
import { useState } from 'react';
import { ProductForm } from '@/components/forms/ProductForm';

export function ProductCard({ product }) {
  // Manejando el modal para borrar el producto
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Manejando el modal para editar el producto y la función que cierra este modal
  const [showProductForm, setShowProductForm] = useState(false);
  const closeModalForm = () => {
    setShowProductForm(false);
  };
  

  // Función para formatear el precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Función para determinar el estado del stock
  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: 'Agotado', color: 'bg-red-100 text-red-700' };
    if (quantity <= 10) return { text: 'Poco stock', color: 'bg-yellow-100 text-yellow-700' };
    return { text: 'Disponible', color: 'bg-green-100 text-green-700' };
  };

  // Función para obtener imagen por categoría
  const getCategoryImage = (category) => {
    // Mapeando categorías a imágenes de public (placeholder)
    const imageMap = {
      'iPhone': '/products/iPhone.png',
      'Mac': '/products/mac.png',
      'iPad': '/products/iPad.png',
      'Accesorios': '/products/accesories.png',
      'AirPods': '/products/airpods.png',
      'Apple Home': '/products/apple-home.png',
      'Watch': '/products/watch.png'
    };
    return imageMap[category] || '/products/default-logo.png';
  };

  // Función para manejar eliminación
  const handleDeleteProduct = () => {
    // Aquí iría la lógica de eliminación
    console.log('Eliminando producto:', product.id);
    setShowDeleteModal(false);
    // Llamar API de eliminación
  };

  const stockStatus = getStockStatus(product.stock_quantity);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
        {/* Imagen del producto */}
        <div className="relative h-56 bg-gray-100">
          <Image 
            src={getCategoryImage(product.category)}
            alt={product.product_name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            quality={95}
          />
          {/* Badge de stock superpuesto */}
          <div className="absolute top-2 right-2 z-10">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
              {stockStatus.text}
            </span>
          </div>
        </div>

        {/* Header de la card */}
        <div className="p-4 border-b border-gray-100">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {product.product_name}
            </h3>
          </div>
          <p className="text-sm text-gray-500 mb-1">
            <span className="font-medium">Ref:</span> {product.reference_code}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Categoría:</span> {product.category}
          </p>
        </div>

        {/* Contenido principal */}
        <div className="p-4">
          {/* Descripción */}
          <div className="mb-4">
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Información de precio y stock */}
          <div className="space-y-3">
            {/* Precio */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Precio:</span>
              <span className="text-lg font-bold text-gray-800">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Stock */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Stock:</span>
              <span className="font-semibold text-gray-800">
                {product.stock_quantity} unidades
              </span>
            </div>
          </div>
        </div>

        {/* Footer con acciones */}
        <div className="px-4 py-2 pb-3 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-col gap-1">
            <button 
              onClick={() => setShowProductForm(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white !py-1 !px-2 rounded-md !text-xs font-medium transition-colors duration-200"
            >
              Editar
            </button>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="w-full !bg-red-400 hover:!bg-red-500 text-white !py-1 !px-2 rounded-md !text-xs font-medium transition-colors duration-200 !border-0 !outline-none focus:!outline-none"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación eliminar estilo Apple */}
      {showDeleteModal && (
        <div className="!fixed !inset-0 !z-50 !flex !items-center !justify-center">
          {/* Backdrop con blur y saturación */}
          <div 
            className="!absolute !inset-0 bg-black/20 backdrop-blur-md backdrop-saturate-150"
            onClick={() => setShowDeleteModal(false)}
          ></div>
          
          {/* Modal para eliminar */}
          <div className="!relative !bg-white/95 !backdrop-blur-xl !rounded-2xl !shadow-2xl !border !border-white/20 !p-8 !mx-4 !max-w-lg !w-full !transform !transition-all !duration-300 !ease-out !min-h-fit !h-auto">
            {/* Icono de advertencia */}
            <div className="!flex !justify-center !mb-6">
              <div className="!w-20 !h-20 !bg-red-100 !rounded-full !flex !items-center !justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Título */}
            <h3 className="!text-2xl !font-semibold !text-gray-900 !text-center !mb-4">
              Eliminar Producto
            </h3>

            {/* Mensaje */}
            <p className="!text-gray-600 !text-center !mb-8 !leading-relaxed !text-base !px-2">
              ¿Estás seguro de que deseas eliminar <strong>{product.product_name}</strong>? Esta acción no se puede deshacer.
            </p>

            {/* Botones */}
            <div className="!flex !flex-col sm:!flex-row !gap-4 !w-full">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 !bg-gray-200 hover:!bg-gray-100 !text-gray-800 !font-medium !py-4 !px-6 !rounded-xl !transition-all !duration-200 !text-base !border-0 !outline-none !min-w-0 !w-full focus:!bg-gray-200 active:!bg-gray-400 !cursor-pointer !select-none"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteProduct}
                className="!flex-1 !bg-red-500 hover:!bg-red-600 !text-white !font-medium !py-4 !px-6 !rounded-xl !transition-all !duration-200 !text-base !border-0 !outline-none !min-w-0 !w-full focus:!bg-red-600 active:!bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de formulario para editar producto */}
      <ProductForm 
        isOpen={showProductForm} 
        onClose={closeModalForm} 
        product={product}
      />
    </>
  );
}