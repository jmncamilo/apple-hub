"use client";
import Image from 'next/image';
import { WarrantyCard } from '../cards/WarrantyCard';
import warranties from '@/lib/random/mockApiWarranties';

export function WarrantiesView({ onClose }) {

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      {/* Header simplificado igual que devoluciones */}
      <div className="flex-shrink-0 px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Logo de Apple Hub */}
          <div className="flex items-center">
            <Image 
              src="/applehub-logo.png" 
              alt="Apple Hub" 
              width={110}
              height={110}
              className="w-auto h-11"
              quality={85}
            />
          </div>

          {/* Botón de Volver */}
          <button
            onClick={onClose}
            className="!px-4 !py-2 !bg-gray-600 hover:!bg-gray-700 !text-white !rounded-md !transition-colors !duration-200 !flex !items-center !gap-2 !w-auto !min-w-0 !border !border-gray-600 hover:!border-gray-700 !outline-none focus:!ring-2 focus:!ring-gray-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver
          </button>
        </div>
      </div>

      {/* Contenido principal - DISEÑO TIPO TIMELINE */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* Título de la sección */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🛡️ Garantías Activas</h2>
            <p className="text-gray-600">Gestión y seguimiento de las garantías en Apple Hub</p>
          </div>

          {/* Timeline de garantías */}
          <div className="relative">
            {/* Línea vertical del timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

            {warranties.map(warrantyItem => <WarrantyCard key={warrantyItem.id} warrantyItem={warrantyItem}/>)}

            {warranties.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay garantías registradas</h3>
                <p className="text-gray-500">Las garantías aparecerán aquí cuando se procesen desde el módulo de pedidos</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}