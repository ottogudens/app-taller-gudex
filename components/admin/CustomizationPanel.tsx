import React, { useState } from 'react';
import { ThemeSettings } from '../../types';
import { Icon } from '../common/Icons';

interface CustomizationPanelProps {
  currentSettings: ThemeSettings;
  onSave: (newSettings: ThemeSettings) => void;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ currentSettings, onSave }) => {
  const [settings, setSettings] = useState<ThemeSettings>(currentSettings);
  const [logoPreview, setLogoPreview] = useState<string>(currentSettings.logo);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSettings({ ...settings, logo: base64String });
        setLogoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (colorType: 'colorPrimary' | 'colorSecondary' | 'colorBackground', value: string) => {
    setSettings({ ...settings, [colorType]: value });
  };
  
  const handleSave = () => {
    onSave(settings);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Identidad Visual</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Personaliza el logo y los colores para que coincidan con tu marca.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo Section */}
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Logo de la Aplicación</label>
            <div className="mt-1 flex items-center space-x-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center rounded-md">
                {logoPreview ? (
                    <img className="h-full w-auto object-contain" src={logoPreview} alt="Logo Preview" />
                ) : (
                    <span className="text-xs text-gray-500">Sin logo</span>
                )}
                </div>
                <label htmlFor="logo-upload" className="relative cursor-pointer rounded-md font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[var(--color-primary)]">
                <span>Subir un archivo</span>
                <input id="logo-upload" name="logo-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoChange} />
                </label>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Recomendado: SVG o PNG transparente. Altura máx: 40px.</p>
        </div>

        {/* Color Section */}
        <div className="space-y-4">
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Esquema de Colores</label>
             <div className="flex flex-col space-y-4 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                <div className="flex items-center justify-between">
                    <label htmlFor="color-primary" className="text-sm text-gray-600 dark:text-gray-300">Color Primario (Acentos)</label>
                    <input 
                        type="color" 
                        id="color-primary"
                        value={settings.colorPrimary}
                        onChange={(e) => handleColorChange('colorPrimary', e.target.value)}
                        className="w-10 h-10 rounded-full border-none cursor-pointer"
                    />
                </div>
                 <div className="flex items-center justify-between">
                    <label htmlFor="color-secondary" className="text-sm text-gray-600 dark:text-gray-300">Color Secundario (Paneles)</label>
                    <input 
                        type="color" 
                        id="color-secondary"
                        value={settings.colorSecondary}
                        onChange={(e) => handleColorChange('colorSecondary', e.target.value)}
                        className="w-10 h-10 rounded-full border-none cursor-pointer"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="color-background" className="text-sm text-gray-600 dark:text-gray-300">Color de Fondo (App)</label>
                    <input 
                        type="color" 
                        id="color-background"
                        value={settings.colorBackground}
                        onChange={(e) => handleColorChange('colorBackground', e.target.value)}
                        className="w-10 h-10 rounded-full border-none cursor-pointer"
                    />
                </div>
             </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            style={{ 
                backgroundColor: saveStatus === 'saved' ? '#22c55e' : 'var(--color-primary)',
            }}
            onMouseOver={e => { if(saveStatus !== 'saved') e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}}
            onMouseOut={e => { if(saveStatus !== 'saved') e.currentTarget.style.backgroundColor = 'var(--color-primary)'}}
            onClick={handleSave}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white transition-colors"
          >
            {saveStatus === 'saved' ? '¡Guardado!' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;