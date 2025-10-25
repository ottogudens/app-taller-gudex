// FIX: Replaced placeholder content with a functional Vehicle Detail component. It uses react-router's `useParams` hook to fetch and display the full service history for a selected vehicle.
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Vehicle } from '../../types';

interface VehicleDetailProps {
  vehicles: Vehicle[];
}

const VehicleInfoDetail: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => (
    <div className="mt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Patente</p>
                <p className="text-md font-semibold text-gray-900 dark:text-white">{vehicle.licensePlate}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Año</p>
                <p className="text-md font-semibold text-gray-900 dark:text-white">{vehicle.year}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cilindrada</p>
                <p className="text-md font-semibold text-gray-900 dark:text-white">{vehicle.engineDisplacement}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Transmisión</p>
                <p className="text-md font-semibold text-gray-900 dark:text-white">{vehicle.transmission}</p>
            </div>
             <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md col-span-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">VIN</p>
                <p className="text-md font-semibold text-gray-900 dark:text-white">{vehicle.vin}</p>
            </div>
        </div>
        <h3 className="text-xl font-semibold mt-8 mb-4">Repuestos y Filtros</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-md">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Filtro de Aceite</p>
                <p className="text-md font-semibold text-blue-900 dark:text-blue-100">{vehicle.oilFilter}</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-md">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Filtro de Aire</p>
                <p className="text-md font-semibold text-blue-900 dark:text-blue-100">{vehicle.airFilter}</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-md">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Filtro de Combustible</p>
                <p className="text-md font-semibold text-blue-900 dark:text-blue-100">{vehicle.fuelFilter}</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-md">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Filtro de Polen (Cabina)</p>
                <p className="text-md font-semibold text-blue-900 dark:text-blue-100">{vehicle.cabinFilter}</p>
            </div>
        </div>
    </div>
);

const ServiceHistory: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => (
    <div className="space-y-6 mt-6">
        {vehicle.serviceHistory.length > 0 ? (
        [...vehicle.serviceHistory].reverse().map(record => (
            <div key={record.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-bold text-lg">{record.date}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">Kilometraje: {record.mileage.toLocaleString()}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{record.summary}</p>
            {record.cost > 0 && <p className="text-right font-semibold mt-2">${record.cost.toFixed(2)}</p>}
            </div>
        ))
        ) : (
        <p>No hay historial de servicio disponible para este vehículo.</p>
        )}
    </div>
);

const VehicleDetail: React.FC<VehicleDetailProps> = ({ vehicles }) => {
  const { id } = useParams<{ id: string }>();
  const vehicle = vehicles.find(v => v.id === id);
  const [activeTab, setActiveTab] = useState<'history' | 'info'>('history');

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <h1 className="text-xl font-bold">Vehículo no encontrado</h1>
        <Link to="/client" className="text-blue-500 hover:underline mt-4 inline-block">Volver a Mis Vehículos</Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/client" className="text-sm text-blue-500 hover:underline mb-4 inline-block">&larr; Volver al Panel</Link>
        <h1 className="text-3xl font-bold">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
        <p className="text-md text-gray-500 dark:text-gray-400">Patente: {vehicle.licensePlate}</p>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
                onClick={() => setActiveTab('history')}
                className={`${activeTab === 'history' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
                Historial de Servicio
            </button>
            <button
                onClick={() => setActiveTab('info')}
                className={`${activeTab === 'info' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
                Información del Vehículo
            </button>
        </nav>
      </div>

      {activeTab === 'history' && <ServiceHistory vehicle={vehicle} />}
      {activeTab === 'info' && <VehicleInfoDetail vehicle={vehicle} />}

    </div>
  );
};

export default VehicleDetail;