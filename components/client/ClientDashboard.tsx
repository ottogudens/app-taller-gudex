// FIX: Replaced placeholder content with a functional Client Dashboard. This component displays a list of the client's vehicles, which link to a detailed view of their service history.
import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '../../types';
import { Icon } from '../common/Icons';

interface ClientDashboardProps {
  vehicles: Vehicle[];
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ vehicles }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mis Vehículos</h1>
      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(vehicle => (
            <Link to={`/vehicle/${vehicle.id}`} key={vehicle.id} className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                     <Icon name="car" className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                 </div>
                 <div>
                    <h2 className="text-lg font-semibold">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{vehicle.licensePlate}</p>
                 </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Último Servicio</h3>
                {vehicle.serviceHistory.length > 0 ? (
                    <p className="text-sm text-gray-800 dark:text-gray-100">{vehicle.serviceHistory[vehicle.serviceHistory.length - 1].date}: {vehicle.serviceHistory[vehicle.serviceHistory.length - 1].summary}</p>
                ) : (
                    <p className="text-sm text-gray-500">Aún sin historial de servicio.</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p>No tienes vehículos registrados con nosotros.</p>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;