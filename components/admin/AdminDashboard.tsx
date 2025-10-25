// FIX: Replaced placeholder content with a functional Admin Dashboard component. It includes tab-based navigation for managing vehicles, users, and settings, and integrates the existing NfcWriter, QrScanner, and CustomizationPanel components.
import React, { useState } from 'react';
import { ThemeSettings, Vehicle, User, Part } from '../../types';
import QrScanner from '../common/QrScanner';
import NfcWriter from './NfcWriter';
import CustomizationPanel from './CustomizationPanel';
import { Icon } from '../common/Icons';
import UsersPanel from './UsersPanel';
import PartsPanel from './PartsPanel';

interface AdminDashboardProps {
  themeSettings: ThemeSettings;
  onThemeChange: (settings: ThemeSettings) => void;
  vehicles: Vehicle[];
  users: User[];
  parts: Part[];
  onCreateUser: (user: Omit<User, 'id'>) => void;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onCreatePart: (part: Omit<Part, 'id'>) => void;
  onUpdatePart: (part: Part) => void;
  onDeletePart: (partId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    themeSettings, 
    onThemeChange, 
    vehicles,
    users,
    parts,
    onCreateUser,
    onUpdateUser,
    onDeleteUser,
    onCreatePart,
    onUpdatePart,
    onDeletePart,
}) => {
  const [activeTab, setActiveTab] = useState('vehicles');
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [nfcVehicle, setNfcVehicle] = useState<Vehicle | null>(null);

  const handleScanSuccess = (decodedText: string) => {
    alert(`QR Scanned: ${decodedText}`);
    setScannerOpen(false);
  };

  const handleScanFailure = (error: string) => {
    console.error(error);
    alert(`Scan Error: ${error}`);
    setScannerOpen(false);
  };

  return (
    <div>
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab('vehicles')} className={`${activeTab === 'vehicles' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Vehículos</button>
          <button onClick={() => setActiveTab('users')} className={`${activeTab === 'users' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Usuarios</button>
          <button onClick={() => setActiveTab('parts')} className={`${activeTab === 'parts' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Catálogo de Repuestos</button>
          <button onClick={() => setActiveTab('customization')} className={`${activeTab === 'customization' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Personalización</button>
        </nav>
      </div>

      <div style={{ backgroundColor: themeSettings.colorSecondary }} className="rounded-lg shadow">
        {activeTab === 'vehicles' && (
           <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Gestión de Vehículos</h2>
                    <button onClick={() => setScannerOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                        <Icon name="qr" className="w-5 h-5"/>
                        Escanear QR
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Vehículo</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Patente</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Propietario</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {vehicles.map(vehicle => (
                                <tr key={vehicle.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{vehicle.make} {vehicle.model}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{vehicle.licensePlate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{users.find(u => u.id === vehicle.ownerId)?.name || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => setNfcVehicle(vehicle)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">
                                            Escribir NFC
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
           </div>
        )}
        {activeTab === 'users' && (
           <UsersPanel
                users={users}
                onCreateUser={onCreateUser}
                onUpdateUser={onUpdateUser}
                onDeleteUser={onDeleteUser}
            />
        )}
        {activeTab === 'parts' && (
            <PartsPanel 
                parts={parts}
                onCreatePart={onCreatePart}
                onUpdatePart={onUpdatePart}
                onDeletePart={onDeletePart}
            />
        )}
        {activeTab === 'customization' && <CustomizationPanel currentSettings={themeSettings} onSave={onThemeChange} />}
      </div>

      {isScannerOpen && (
        <QrScanner 
          onScanSuccess={handleScanSuccess} 
          onScanFailure={handleScanFailure}
          onClose={() => setScannerOpen(false)} 
        />
      )}
      {nfcVehicle && (
        <NfcWriter 
          vehicle={nfcVehicle} 
          onClose={() => setNfcVehicle(null)} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;