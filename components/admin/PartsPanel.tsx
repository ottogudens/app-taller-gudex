import React, { useState } from 'react';
import { Part } from '../../types';
import { Icon } from '../common/Icons';

interface PartsPanelProps {
    parts: Part[];
    onCreatePart: (part: Omit<Part, 'id'>) => void;
    onUpdatePart: (part: Part) => void;
    onDeletePart: (partId: string) => void;
}

const emptyPart: Omit<Part, 'id'> = { name: '', partNumber: '', brand: '', stock: 0, description: '' };

const PartsPanel: React.FC<PartsPanelProps> = ({ parts, onCreatePart, onUpdatePart, onDeletePart }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPart, setCurrentPart] = useState<Omit<Part, 'id'> | Part>(emptyPart);
    const isEditing = 'id' in currentPart;

    const openModal = (part?: Part) => {
        setCurrentPart(part || emptyPart);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setCurrentPart({ 
            ...currentPart, 
            [name]: type === 'number' ? parseInt(value, 10) || 0 : value 
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPart.name || !currentPart.partNumber) return;

        if (isEditing) {
            onUpdatePart(currentPart as Part);
        } else {
            onCreatePart(currentPart);
        }
        closeModal();
    };
    
    const handleDelete = (partId: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este repuesto? Esta acción no se puede deshacer.')) {
            onDeletePart(partId);
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Catálogo de Repuestos</h2>
                <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors">
                    <Icon name="plus" className="w-5 h-5"/>
                    Añadir Repuesto
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">N° de Parte</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Marca</th>
                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cantidad</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {parts.map(part => (
                            <tr key={part.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{part.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{part.partNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{part.brand}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{part.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                    <button onClick={() => openModal(part)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Editar</button>
                                    <button onClick={() => handleDelete(part.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
                        <h3 className="text-lg font-bold mb-4">{isEditing ? 'Editar Repuesto' : 'Añadir Nuevo Repuesto'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Repuesto</label>
                                    <input type="text" name="name" id="name" value={currentPart.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm dark:bg-gray-700"/>
                                </div>
                                <div>
                                    <label htmlFor="partNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Número de Parte (SKU)</label>
                                    <input type="text" name="partNumber" id="partNumber" value={currentPart.partNumber} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm dark:bg-gray-700"/>
                                </div>
                                <div>
                                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Marca</label>
                                    <input type="text" name="brand" id="brand" value={currentPart.brand} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm dark:bg-gray-700"/>
                                </div>
                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad en Stock</label>
                                    <input type="number" name="stock" id="stock" value={currentPart.stock} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm dark:bg-gray-700"/>
                                </div>
                           </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                                <textarea name="description" id="description" value={currentPart.description} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm dark:bg-gray-700" />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)]">
                                    {isEditing ? 'Guardar Cambios' : 'Crear Repuesto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartsPanel;