export function ProductForm({ isOpen, onClose, product = null }) {
  // Categorías predefinidas
  const categories = [
    'iPhone',
    'Mac', 
    'iPad',
    'Watch',
    'AirPods',
    'Accesorios',
    'Apple Home'
  ];

  if (!isOpen) return null;

  return (
    <div className="!fixed !inset-0 !z-50 !flex !items-center !justify-center !p-4">
      {/* Backdrop */}
      <div 
        className="!absolute !inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal - Optimizado para 768px */}
      <div className="!relative !bg-white !rounded-2xl !shadow-2xl !w-full !max-w-2xl !max-h-[85vh] !overflow-hidden !flex !flex-col">
        {/* Header - Más compacto */}
        <div className="!flex !items-center !justify-between !px-6 !py-6 !border-b !border-gray-200 !flex-shrink-0">
          <h2 className="text-2xl !font-bold !text-gray-800">
            {product ? 'Editar Producto' : 'Añadir Nuevo Producto'}
          </h2>
          <button
            onClick={onClose}
            className="!w-8 !h-8 !min-w-8 !min-h-8 !max-w-8 !max-h-8 !flex !items-center !justify-center !text-white !rounded-full !transition-colors !flex-shrink-0 !border-0 !outline-none !p-0 !m-0"
            style={{ 
              borderRadius: '50% !important',
              width: '32px !important',
              height: '32px !important'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Form - Scrolleable */}
        <div className="!flex-1 !overflow-y-auto !p-6 !space-y-5">
          {/* Nombre del producto */}
          <div>
            <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
              Nombre del Producto
            </label>
            <input
              type="text"
              defaultValue={product?.product_name || ''}
              className="!w-full !px-4 !py-2.5 !border !border-gray-300 !rounded-lg focus:!border-blue-500 focus:!outline-none focus:!ring-2 focus:!ring-blue-500/20 !transition-colors !text-gray-900"
              placeholder="Ej: iPhone 14 Pro"
            />
          </div>

          {/* Código de referencia */}
          <div>
            <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
              Código de Referencia
            </label>
            <input
              type="text"
              defaultValue={product?.reference_code || ''}
              className="!w-full !px-4 !py-2.5 !border !border-gray-300 !rounded-lg focus:!border-blue-500 focus:!outline-none focus:!ring-2 focus:!ring-blue-500/20 !transition-colors !text-gray-900"
              placeholder="Ej: AAPL-0023"
            />
          </div>

          {/* Grid para Categoría y Precio */}
          <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-5">
            {/* Categoría */}
            <div>
              <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                Categoría
              </label>
              <select
                defaultValue={product?.category || ''}
                className="!w-full !px-4 !py-2.5 !border !border-gray-300 !rounded-lg focus:!border-blue-500 focus:!outline-none focus:!ring-2 focus:!ring-blue-500/20 !transition-colors !text-gray-900"
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Precio */}
            <div>
              <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                Precio (COP)
              </label>
              <input
                type="number"
                defaultValue={product?.price || ''}
                min="0"
                step="0.01"
                className="!w-full !px-4 !py-2.5 !border !border-gray-300 !rounded-lg focus:!border-blue-500 focus:!outline-none focus:!ring-2 focus:!ring-blue-500/20 !transition-colors !text-gray-900"
                placeholder="Ej: 4599000"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
              Stock Disponible
            </label>
            <input
              type="number"
              defaultValue={product?.stock_quantity || ''}
              min="0"
              className="!w-full !px-4 !py-2.5 !border !border-gray-300 !rounded-lg focus:!border-blue-500 focus:!outline-none focus:!ring-2 focus:!ring-blue-500/20 !transition-colors !text-gray-900"
              placeholder="Ej: 15"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
              Descripción
            </label>
            <textarea
              defaultValue={product?.description || ''}
              rows={3}
              className="!w-full !px-4 !py-2.5 !border !border-gray-300 !rounded-lg focus:!border-blue-500 focus:!outline-none focus:!ring-2 focus:!ring-blue-500/20 !transition-colors !text-gray-900 !resize-none"
              placeholder="Describe el producto detalladamente..."
            />
          </div>
        </div>

        {/* Footer - Fijo en la parte inferior */}
        <div className="!flex !justify-end !gap-3 !px-6 !py-4 !border-t !border-gray-200 !bg-gray-50 !flex-shrink-0">
          <button
            onClick={onClose}
            className="!px-5 !py-2.5 !text-gray-700 !bg-white !border !border-gray-300 !rounded-lg hover:!bg-gray-50 !transition-colors !font-medium !text-sm"
          >
            Cancelar
          </button>
          <button
            className="!px-5 !py-2.5 !text-white !rounded-lg !transition-colors !font-medium !text-sm"
          >
            {product ? 'Actualizar' : 'Crear'} Producto
          </button>
        </div>
      </div>
    </div>
  );
}