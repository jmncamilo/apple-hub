"use client";
import { useForm } from "@/hooks/useForm";
import { initialCustomerValues } from "@/app/dashboard/customers/initialValues";
import { handlerHttp } from "@/app/dashboard/customers/handlerHttp"; 

export function CustomerForm({ customer, registerForm = false, onClose, onSave, onRefresh }) {
  // Desestructurando lo que necesitamos del custom hook para manejar el form controlado
  const { form, handleChange } = useForm(customer ?? initialCustomerValues);

  // Manejando la lógica de inserción o actualización según corresponde si es form de registro o de actualización
  const clickSubmit = async () => {
    if (
      !form.nuip ||
      !form.names ||
      !form.lastnames ||
      !form.email ||
      !form.age ||
      !form.gender ||
      !form.address ||
      !form.phone_number
    ) {
      return alert("Todos los campos son obligatorios.");
    }

    if(registerForm) {
        // Lógica de inserción
      const data = await handlerHttp(form);
        // Verificando si la inserción fue válida
      if (!data?.success) {
        return alert(data?.error || '¡Error! Vuelve a intentarlo...');
      }
      alert('¡Usuario registrado!');
      onRefresh();
      onClose();

    } else {
      // Lógica de actualización
      const data = await handlerHttp(form, false);
        // Verificando si la actualización fue válida
      if (!data?.success) {
        return alert(data?.error || '¡Error! Vuelve a intentarlo...');
      }
      alert('¡Usuario actualizado!');
      onRefresh();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header del formulario */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{registerForm ? 'Registrar Cliente' : 'Editar Cliente'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors !w-8 !h-8 !min-w-8 !min-h-8 !max-w-8 !max-h-8 !flex !items-center !justify-center !border-0 !outline-none !p-0 !m-0 !rounded-full"
            style={{ 
              borderRadius: '50%',
              width: '32px',
              height: '32px'
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NUIP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Documento de Identidad
              </label>
              <input
                name="nuip"
                value={form.nuip}
                onChange={handleChange}
                type="number"
                // defaultValue={customer?.nuip ?? ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Nombres */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombres
              </label>
              <input
                name="names"
                value={form.names}
                onChange={handleChange}
                type="text"
                // defaultValue={customer?.names ?? ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Apellidos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellidos
              </label>
              <input
                name="lastnames"
                value={form.lastnames}
                onChange={handleChange}
                type="text"
                // defaultValue={customer?.lastnames ?? ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                // defaultValue={customer?.email ?? ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Edad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Edad
              </label>
              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                type="number"
                min={16}
                max={120}
                // defaultValue={customer?.age ?? ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Género */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Género
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                // defaultValue={customer?.gender ?? ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-12"
              >
                <option hidden value="">Seleccionar género</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            {/* Teléfono */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                type="tel"
                // defaultValue={customer?.phone_number ?? ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Dirección */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                // defaultValue={customer?.address ?? ''}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Botoncitos */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Cancelar
            </button>
            <button onClick={clickSubmit} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
              {registerForm ? 'Registrar Cliente' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}