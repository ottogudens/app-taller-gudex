// FIX: Replaced placeholder content with a functional Mechanic Dashboard. This component allows mechanics to view assigned vehicles, add technical service notes, and use the Gemini API via `geminiService` to generate client-friendly summaries.
import React, { useState } from 'react';
import { Vehicle, ServiceRecord } from '../../types';
import { generateServiceSummary } from '../../services/geminiService';

interface MechanicDashboardProps {
  vehicles: Vehicle[];
  onUpdateVehicle: (vehicle: Vehicle) => void;
}

const MechanicDashboard: React.FC<MechanicDashboardProps> = ({ vehicles, onUpdateVehicle }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [newNotes, setNewNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setNewNotes('');
    setGeneratedSummary('');
  };

  const handleGenerateSummary = async () => {
    if (!newNotes.trim()) return;
    setIsGenerating(true);
    setGeneratedSummary('');
    try {
      const summary = await generateServiceSummary(newNotes);
      setGeneratedSummary(summary);
    } catch (error) {
      console.error(error);
      setGeneratedSummary('Fallo al generar el resumen.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSaveServiceRecord = () => {
      if (!selectedVehicle || !newNotes.trim()) return;
      const lastMileage = selectedVehicle.serviceHistory.length > 0 ? selectedVehicle.serviceHistory[selectedVehicle.serviceHistory.length - 1].mileage : 0;
      const newRecord: ServiceRecord = {
          id: `s${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          mileage: lastMileage + 5000, // mock mileage
          notes: newNotes,
          summary: generatedSummary,
          cost: Math.floor(Math.random() * 500) + 50, // mock cost
      };

      const updatedVehicle = {
          ...selectedVehicle,
          serviceHistory: [...selectedVehicle.serviceHistory, newRecord]
      };
      
      onUpdateVehicle(updatedVehicle);
      handleSelectVehicle(updatedVehicle);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-4">Vehículos para Servicio</h2>
        <ul className="space-y-2">
          {vehicles.map(v => (
            <li key={v.id}>
              <button
                onClick={() => handleSelectVehicle(v)}
                className={`w-full text-left p-3 rounded-md transition-colors ${selectedVehicle?.id === v.id ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <p className="font-semibold">{v.make} {v.model}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{v.licensePlate}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {selectedVehicle ? (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Servicio para {selectedVehicle.make} {selectedVehicle.model}</h2>
            
            <div>
                <h3 className="font-semibold mb-2">Historial de Servicio</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {[...selectedVehicle.serviceHistory].reverse().map(r => (
                        <div key={r.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                            <p className="text-sm font-semibold">{r.date}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{r.summary || r.notes}</p>
                        </div>
                    ))}
                    {selectedVehicle.serviceHistory.length === 0 && <p className="text-sm text-gray-500">Sin historial de servicio.</p>}
                </div>
            </div>

            <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="font-semibold">Nuevo Registro de Servicio</h3>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notas del Mecánico</label>
                <textarea
                  id="notes"
                  rows={5}
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  placeholder="Ej: Se reemplazó el alternador. Se revisó el voltaje de la batería..."
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <button onClick={handleGenerateSummary} disabled={isGenerating || !newNotes.trim()} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">
                  {isGenerating ? 'Generando...' : 'Generar Resumen para Cliente'}
                </button>
              </div>

              {generatedSummary && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resumen Generado (para Cliente)</label>
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">{generatedSummary}</div>
                </div>
              )}
              
              <div className="flex justify-end">
                <button onClick={handleSaveServiceRecord} disabled={!newNotes.trim() || !generatedSummary} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300">
                    Guardar Registro
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Seleccione un vehículo para ver y agregar registros de servicio.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MechanicDashboard;