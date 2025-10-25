// FIX: Replaced placeholder content with a fully functional App component. It sets up hash-based routing, manages application state (auth, theme, data), and renders the correct dashboard based on user role. This resolves the "not a module" error in index.tsx.
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User, Vehicle, ThemeSettings, Part } from './types';
import AdminDashboard from './components/admin/AdminDashboard';
import MechanicDashboard from './components/mechanic/MechanicDashboard';
import ClientDashboard from './components/client/ClientDashboard';
import VehicleDetail from './components/client/VehicleDetail';
import { Icon } from './components/common/Icons';

const initialUsers: User[] = [
    { id: 'user-1', name: 'Admin User', email: 'admin@taller.pro', role: 'admin' },
    { id: 'user-2', name: 'Mechanic User', email: 'mecanico@taller.pro', role: 'mechanic' },
    { id: 'user-3', name: 'Client User', email: 'cliente@taller.pro', role: 'client' },
];

const initialVehicles: Vehicle[] = [
    { 
      id: 'vehicle-1', make: 'Toyota', model: 'Corolla', year: 2021, vin: '123ABC456DEF789', licensePlate: 'AB-123-CD', ownerId: 'user-3',
      engineDisplacement: '1.8L', transmission: 'Automática', oilFilter: 'TY-90915', airFilter: 'TY-17801', fuelFilter: 'TY-23390', cabinFilter: 'TY-87139',
      serviceHistory: [
        { id: 's1', date: '2023-01-15', mileage: 15000, notes: 'Oil change and tire rotation.', summary: 'Se realizó el cambio de aceite y la rotación de neumáticos para un desgaste uniforme.', cost: 120.50 },
        { id: 's2', date: '2023-07-20', mileage: 30000, notes: 'Brake pad replacement, front.', summary: 'Se reemplazaron las pastillas de freno delanteras para garantizar la seguridad de frenado.', cost: 250.00 },
      ] 
    },
    { 
      id: 'vehicle-2', make: 'Honda', model: 'Civic', year: 2022, vin: '987ZYX654WVU321', licensePlate: 'EF-456-GH', ownerId: 'user-3',
      engineDisplacement: '1.5L Turbo', transmission: 'Automática', oilFilter: 'HO-15400', airFilter: 'HO-17220', fuelFilter: 'HO-16010', cabinFilter: 'HO-80292',
      serviceHistory: [
        { id: 's3', date: '2023-05-10', mileage: 12000, notes: 'First service, oil and filter change.', summary: 'Se realizó el primer servicio de mantenimiento con cambio de aceite y filtro.', cost: 95.00 },
      ] 
    },
];

const initialParts: Part[] = [
    { id: 'part-1', name: 'Filtro de Aceite TY-90915', partNumber: 'TY-90915', brand: 'Toyota OEM', stock: 15, description: 'Filtro de aceite para Toyota Corolla 2020+' },
    { id: 'part-2', name: 'Pastillas de Freno Delanteras', partNumber: 'BR-PAD-123', brand: 'Brembo', stock: 8, description: 'Juego de pastillas de freno cerámicas para alto rendimiento.' },
    { id: 'part-3', name: 'Batería 12V 550CCA', partNumber: 'BAT-550-LN', brand: 'Interstate', stock: 5, description: 'Batería estándar para la mayoría de vehículos de pasajeros.' },
];

const defaultTheme: ThemeSettings = {
    logo: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    colorPrimary: '#4f46e5',
    colorSecondary: '#ffffff',
    colorBackground: '#f3f4f6', // gray-100
    appName: 'Taller Pro'
};

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Manage all data in state
    const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [parts, setParts] = useState<Part[]>(initialParts);

    const [theme, setTheme] = useState<ThemeSettings>(() => {
        const savedTheme = localStorage.getItem('themeSettings');
        return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
    });

    useEffect(() => {
        document.documentElement.style.setProperty('--color-primary', theme.colorPrimary);
        document.documentElement.style.setProperty('--color-primary-hover', theme.colorPrimary); // Simple hover for now
        document.documentElement.style.setProperty('--color-secondary', theme.colorSecondary);
        document.body.style.backgroundColor = theme.colorBackground;
        localStorage.setItem('themeSettings', JSON.stringify(theme));
    }, [theme]);
    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const user = users.find(u => u.email === email);
        const expectedPassword = `${user?.email.split('@')[0]}123`;

        if (user && password === expectedPassword) {
            setCurrentUser(user);
            setError('');
        } else {
            setError('Credenciales incorrectas. Inténtalo de nuevo.');
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setEmail('');
        setPassword('');
    };

    const handleUpdateVehicle = (updatedVehicle: Vehicle) => {
        setVehicles(vehicles.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
    };

    // User CRUD
    const handleCreateUser = (newUser: Omit<User, 'id'>) => {
        const userWithId = { ...newUser, id: `user-${Date.now()}`};
        setUsers([...users, userWithId]);
    };
    
    const handleUpdateUser = (updatedUser: User) => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    };

    const handleDeleteUser = (userId: string) => {
        if (currentUser?.id === userId) {
            alert("No puedes eliminar al usuario con el que has iniciado sesión.");
            return;
        }
        setUsers(users.filter(u => u.id !== userId));
    };

    // Part CRUD
    const handleCreatePart = (newPart: Omit<Part, 'id'>) => {
        const partWithId = { ...newPart, id: `part-${Date.now()}`};
        setParts([...parts, partWithId]);
    };

    const handleUpdatePart = (updatedPart: Part) => {
        setParts(parts.map(p => p.id === updatedPart.id ? updatedPart : p));
    };

    const handleDeletePart = (partId: string) => {
        setParts(parts.filter(p => p.id !== partId));
    };


    if (!currentUser) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <div className="text-center">
                        <img className="mx-auto h-12 w-auto" src={theme.logo} alt="Logo" />
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">{theme.appName}</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Inicia sesión para acceder a tu panel</p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input id="email-address" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:z-10 sm:text-sm" placeholder="Correo electrónico" />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:z-10 sm:text-sm" placeholder="Contraseña" />
                            </div>
                        </div>
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] transition-colors">
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    
    const renderDashboard = () => {
        switch (currentUser.role) {
            case 'admin':
                return <AdminDashboard 
                            themeSettings={theme} 
                            onThemeChange={setTheme} 
                            vehicles={vehicles}
                            users={users}
                            parts={parts}
                            onCreateUser={handleCreateUser}
                            onUpdateUser={handleUpdateUser}
                            onDeleteUser={handleDeleteUser}
                            onCreatePart={handleCreatePart}
                            onUpdatePart={handleUpdatePart}
                            onDeletePart={handleDeletePart}
                        />;
            case 'mechanic':
                return <MechanicDashboard vehicles={vehicles} onUpdateVehicle={handleUpdateVehicle} />;
            case 'client':
                return <ClientDashboard vehicles={vehicles.filter(v => v.ownerId === currentUser.id)} />;
            default:
                return <p>Rol no reconocido.</p>;
        }
    };

    return (
        <Router>
             <div className="min-h-screen text-gray-900 dark:text-gray-100">
                <header style={{ backgroundColor: theme.colorSecondary }} className="shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                               <img className="h-8 w-auto" src={theme.logo} alt="Logo" />
                               <span className="font-bold text-xl">{theme.appName}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span>{currentUser.name} ({currentUser.role})</span>
                                <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                    <Icon name="logout" className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                     <Routes>
                        <Route path="/" element={renderDashboard()} />
                        <Route path="/client" element={<ClientDashboard vehicles={vehicles.filter(v => v.ownerId === currentUser.id)} />} />
                        <Route path="/vehicle/:id" element={<VehicleDetail vehicles={vehicles} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                     </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;