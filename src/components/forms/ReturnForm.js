"use client";
import { useState } from 'react';

// Componente para editar solo return_reason y notes (solo maquetación)
export function EditReturnForm({ returnItem, onSave, onCancel, onRefresh }) {
  const [formData, setFormData] = useState({
    return_reason: returnItem.return_reason || "",
    notes: returnItem.notes || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/returns", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: returnItem.id,
          return_reason: formData.return_reason,
          notes: formData.notes,
        }),
      });
      const result = await response.json();

      if (result.success) {
        alert("Devolución actualizada correctamente");
        onRefresh();
        onSave();
      } else {
        alert(result.error || "No se pudo actualizar la devolución");
      }
    } catch (error) {
      alert("Error de red al actualizar la devolución");
    }
    setIsSaving(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border border-blue-200 bg-blue-50 p-4 rounded-md"
    >
      <div>
        <label className="block text-sm font-medium !text-black mb-2" htmlFor="return-motive">
          Motivo de la Devolución
        </label>
        <textarea
          value={formData.return_reason}
          onChange={(e) =>
            setFormData({ ...formData, return_reason: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          rows="3"
          placeholder="Describe el motivo de la devolución..."
          id="return-motive"
        />
      </div>

      <div>
        <label className="block text-sm font-medium !text-black mb-2" htmlFor="notes-textarea">
          Notas Adicionales
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          rows="2"
          placeholder="Notas del personal, observaciones, etc..."
          id="notes-textarea"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
        >
          {isSaving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}