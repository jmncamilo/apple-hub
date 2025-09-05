export function WarrantyCard({ warrantyItem }) {
  // Función para formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Función para obtener color del estado
  const getStatusColor = (status) => {
    const colors = {
      "En Proceso": "bg-blue-500",
      Aprobada: "bg-green-500",
      Rechazada: "bg-red-500",
      Completada: "bg-purple-500",
    };
    return colors[status] || "bg-gray-500";
  };

  // Función para obtener ícono del estado
  const getStatusIcon = (status) => {
    const icons = {
      "En Proceso": "⏳",
      Aprobada: "✅",
      Rechazada: "❌",
      Completada: "🎉",
    };
    return icons[status] || "📋";
  };

  return (
    <div className="relative flex items-start mb-8 last:mb-0">
      {/* Círculo del timeline */}
      <div
        className={`flex-shrink-0 w-16 h-16 ${getStatusColor(
          warrantyItem.warranty_status
        )} rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg z-10`}
      >
        {getStatusIcon(warrantyItem.warranty_status)}
      </div>

      {/* Card de contenido */}
      <div className="ml-6 flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
        {/* Header de la card */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Garantía #{warrantyItem.id}
              </h3>
              <p className="text-sm text-gray-600">
                {warrantyItem.product_name} • Ref:{" "}
                {warrantyItem.product_reference}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(
                  warrantyItem.warranty_status
                )}`}
              >
                {warrantyItem.warranty_status}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(warrantyItem.warranty_date)}
              </p>
            </div>
          </div>
        </div>

        {/* Contenido de la card */}
        <div className="p-6">
          {/* Info en columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Cliente */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                👤 Cliente
              </h4>
              <p className="text-sm text-blue-700 font-medium">
                {warrantyItem.customer_names} {warrantyItem.customer_lastnames}
              </p>
              <p className="text-xs text-blue-600">
                {warrantyItem.customer_email}
              </p>
            </div>

            {/* Pedido */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-purple-800 mb-2 flex items-center">
                📦 Pedido
              </h4>
              <p className="text-sm text-purple-700 font-medium">
                Pedido #{warrantyItem.order_id}
              </p>
              <p className="text-xs text-purple-600">
                Item #{warrantyItem.order_item_id}
              </p>
            </div>

            {/* Valor */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center">
                💰 Valor
              </h4>
              <p className="text-sm text-green-700 font-medium">
                {formatPrice(warrantyItem.subtotal)}
              </p>
              <p className="text-xs text-green-600">
                Cant: {warrantyItem.quantity}
              </p>
            </div>
          </div>

          {/* Motivo y notas en filas */}
          <div className="space-y-4">
            {/* Motivo */}
            <div className="border-l-4 border-orange-400 bg-orange-50 pl-4 py-3 rounded-r-md">
              <h4 className="text-sm font-semibold text-orange-800 mb-1">
                🔧 Motivo de la Garantía
              </h4>
              <p className="text-sm text-orange-700">
                {warrantyItem.warranty_reason}
              </p>
            </div>

            {/* Notas */}
            <div className="border-l-4 border-indigo-400 bg-indigo-50 pl-4 py-3 rounded-r-md">
              <h4 className="text-sm font-semibold text-indigo-800 mb-1">
                📝 Notas del Proceso
              </h4>
              <p className="text-sm text-indigo-700">{warrantyItem.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}