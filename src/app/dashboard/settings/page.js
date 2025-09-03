export default function DashboardSettings() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-4 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:p-8 min-w-[900px] max-w-5xl w-full">
        {/* Acá pongo el título con ícono en movimiento */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10 mb-6">
          {/* Ícono de construcción */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-18 h-18 lg:w-22 lg:h-22 bg-orange-100 rounded-full flex items-center justify-center">
                <svg width="36" height="36" className="lg:w-12 lg:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {/* Elementos random decorativos flotantes */}
              <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 lg:w-3 lg:h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-0 left-1 w-2 h-2 lg:w-2 lg:h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          {/* Más títulos y mensajes */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-3">
              Módulo en Construcción
            </h1>
            <h2 className="text-base lg:text-xl text-gray-600 mb-4">
              Configuración del Sistema
            </h2>
            <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
              Estamos trabajando para traerte las mejores opciones de configuración. 
              <strong className="text-orange-600"> ¡Muy pronto estará disponible! </strong> 
              Este módulo incluirá todas las herramientas necesarias para personalizar tu experiencia.
            </p>
          </div>
        </div>

        {/* Contenido inferior en dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Columna izquierda: Barra de progreso */}
          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-4">Progreso de desarrollo</h3>
            <div className="mb-3">
              <div className="flex justify-between text-base text-gray-500 mb-3">
                <span>Completado</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 lg:h-4">
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 lg:h-4 rounded-full transition-all duration-1000 ease-out" style={{width: '75%'}}></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Estimamos que estará listo en las próximas actualizaciones del sistema.
            </p>
          </div>

          {/* Columna derecha: Características */}
          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-4">Próximas funcionalidades:</h3>
            <ul className="space-y-3 text-base text-gray-600">
              <li className="flex items-center">
                <div className="w-2.5 h-2.5 bg-orange-400 rounded-full mr-4"></div>
                Configuración de perfil de usuario
              </li>
              <li className="flex items-center">
                <div className="w-2.5 h-2.5 bg-orange-400 rounded-full mr-4"></div>
                Preferencias del sistema
              </li>
              <li className="flex items-center">
                <div className="w-2.5 h-2.5 bg-orange-400 rounded-full mr-4"></div>
                Configuración de notificaciones
              </li>
              <li className="flex items-center">
                <div className="w-2.5 h-2.5 bg-orange-400 rounded-full mr-4"></div>
                Temas y personalización
              </li>
              <li className="flex items-center">
                <div className="w-2.5 h-2.5 bg-orange-400 rounded-full mr-4"></div>
                Gestión de seguridad y privacidad
              </li>
            </ul>
          </div>
        </div>

        {/* Último pedazo de la card, mensaje random */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm lg:text-base text-gray-500 text-center">
            Mientras tanto, puedes explorar los demás módulos del dashboard y aprovechar todas sus funcionalidades
          </p>
        </div>
      </div>
    </div>
  );
}