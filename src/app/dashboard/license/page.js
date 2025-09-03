export default function DashboardLicense() {
  // Simulando el rol que vendría del token/API
  const userRole = 'Administrador'; // "Administrador" | "Empleado"
  
  // Configuración de permisos según el rol
  const roleConfig = {
    Administrador: {
      bgColor: "bg-emerald-100",
      indicatorColor: "bg-emerald-500", 
      textColor: "text-emerald-600",
      badgeColor: "bg-emerald-100 text-emerald-700",
      dotColor: "bg-emerald-500",
      icon: "👑",
      permissions: [
        "Gestión completa de clientes",
        "Administración de productos",
        "Gestión completa de pedidos",
        "Acceso a reportes financieros",
        "Configuración del sistema", 
        "Control de permisos y roles"
      ],
      description: "Acceso total al sistema con privilegios administrativos"
    },
    Empleado: {
      bgColor: "bg-blue-100",
      indicatorColor: "bg-blue-500",
      textColor: "text-blue-600", 
      badgeColor: "bg-blue-100 text-blue-700",
      dotColor: "bg-blue-500",
      icon: "👤",
      permissions: [
        "Gestión básica de clientes",
        "Visualización de productos",
        "Gestión básica de pedidos",
        "Acceso al historial de ingresos",
        "Actualización de perfil personal"
      ],
      description: "Acceso limitado a funciones operativas básicas"
    }
  };

  const currentRole = roleConfig[userRole];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-4 lg:p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:p-8 min-w-[1200px] max-w-[1200px] w-full">
        
        {/* Header con estado de sesión */}
        <div className="flex items-center gap-8 mb-6">
          {/* Indicador de estado */}
          <div className="flex-shrink-0">
            <div className={`w-16 h-16 lg:w-18 lg:h-18 ${currentRole.bgColor} rounded-full flex items-center justify-center relative`}>
              <span className="text-2xl lg:text-3xl">{currentRole.icon}</span>
              {/* Indicador de sesión activa */}
              <div className={`absolute -top-1 -right-1 w-4 h-4 ${currentRole.indicatorColor} rounded-full border-2 border-white`}></div>
            </div>
          </div>

          {/* Información de sesión */}
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              Permisos de Sesión Activa
            </h1>
            <p className="text-base lg:text-lg text-gray-600 mb-1">
              La sesión actual otorga permisos de <strong className={`text-${currentRole.color}-600`}>{userRole}</strong>
            </p>
            <p className="text-sm lg:text-base text-gray-500">
              {currentRole.description}
            </p>
          </div>

          {/* Badge de estado */}
          <div className="flex-shrink-0">
            <div className={`px-4 py-2 ${currentRole.badgeColor} rounded-full text-sm font-medium`}>
              ● Sesión Activa
            </div>
          </div>
        </div>

        {/* Contenido en tres columnas con separadores */}
        <div className="flex gap-0">
          
          {/* Columna izquierda: Permisos actuales */}
          <div className="flex-1 pr-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Permisos Habilitados
            </h3>
            <ul className="space-y-2">
              {currentRole.permissions.map((permission, index) => (
                <li key={index} className="flex items-start">
                  <div className={`w-2 h-2 ${currentRole.dotColor} rounded-full mr-3 mt-2 flex-shrink-0`}></div>
                  <span className="text-gray-700 text-sm">{permission}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Separador 1 */}
          <div className="w-px bg-gray-200 mx-6"></div>

          {/* Columna central: Información de sesión */}
          <div className="flex-1 px-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Detalles de Sesión
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Rol activo:</span>
                <span className={`font-medium ${currentRole.textColor}`}>{userRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className="font-medium text-green-600">Conectado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Última actividad:</span>
                <span className="font-medium text-gray-700">Hace 2 minutos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sesión expira:</span>
                <span className="font-medium text-gray-700">En 6 horas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IP de acceso:</span>
                <span className="font-medium text-gray-700">192.168.1.100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dispositivo:</span>
                <span className="font-medium text-gray-700">Chrome/Windows</span>
              </div>
            </div>
          </div>

          {/* Separador 2 */}
          <div className="w-px bg-gray-200 mx-6"></div>

          {/* Columna derecha: Estadísticas */}
          <div className="flex-1 pl-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Actividad de Hoy
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Acciones realizadas:</span>
                <span className="font-medium text-gray-700">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Módulos visitados:</span>
                <span className="font-medium text-gray-700">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tiempo activo:</span>
                <span className="font-medium text-gray-700">2h 34m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Última autenticación:</span>
                <span className="font-medium text-gray-700">08:30 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seguridad:</span>
                <span className="font-medium text-green-600">✓ Verificado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Autenticación 2FA:</span>
                <span className="font-medium text-green-600">✓ Activa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Los permisos se verifican automáticamente en cada acción del sistema</span>
            <span>Última verificación: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
}