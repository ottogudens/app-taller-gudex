import React, { useState } from 'react';
import { User } from '../../types';
import { Icon } from '../common/Icons';

interface UsersPanelProps {
    users: User[];
    onCreateUser: (user: Omit<User, 'id'>) => void;
    onUpdateUser: (user: User) => void;
    onDeleteUser: (userId: string) => void;
}

const emptyUser: Omit<User, 'id'> = { name: '', email: '', role: 'client' };

const UsersPanel: React.FC<UsersPanelProps> = ({ users, onCreateUser, onUpdateUser, onDeleteUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<Omit<User, 'id'> | User>(emptyUser);
    const isEditing = 'id' in currentUser;

    const openModal = (user?: User) => {
        setCurrentUser(user || emptyUser);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser.name || !currentUser.email) return;

        if (isEditing) {
            onUpdateUser(currentUser as User);
        } else {
            onCreateUser(currentUser);
        }
        closeModal();
    };
    
    const handleDelete = (userId: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.')) {
            onDeleteUser(userId);
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestión de Usuarios</h2>
                <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors">
                    <Icon name="plus" className="w-5 h-5"/>
                    Añadir Usuario
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Correo Electrónico</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rol</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 capitalize">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                    <button onClick={() => openModal(user)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Editar</button>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">{isEditing ? 'Editar Usuario' : 'Añadir Nuevo Usuario'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre Completo</label>
                                <input type="text" name="name" id="name" value={currentUser.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm dark:bg-gray-700"/>
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
                                <input type="email" name="email" id="email" value={currentUser.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm dark:bg-gray-700"/>
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rol</label>
                                <select id="role" name="role" value={currentUser.role} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm rounded-md dark:bg-gray-700">
                                    <option value="admin">Admin</option>
                                    <option value="mechanic">Mecánico</option>
                                    <option value="client">Cliente</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)]">
                                    {isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPanel;
