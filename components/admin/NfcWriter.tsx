import React, { useState } from 'react';
import { Vehicle } from '../../types';
import { Icon } from '../common/Icons';

interface NfcWriterProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const NfcWriter: React.FC<NfcWriterProps> = ({ vehicle, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'writing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('Listo para escribir en la etiqueta NFC.');

  const isNfcSupported = 'NDEFReader' in window;

  const writeToNfc = async () => {
    if (!isNfcSupported) {
      setMessage('Web NFC no es compatible en este dispositivo.');
      setStatus('error');
      return;
    }

    setStatus('writing');
    setMessage('Acerque una etiqueta NFC para escribir los datos del vehículo...');

    try {
      const ndef = new (window as any).NDEFReader();
      const vehicleUrl = `${window.location.origin}/#/vehicle/${vehicle.id}`;
      
      await ndef.write({
        records: [{ recordType: 'url', data: vehicleUrl }],
      });
      
      setStatus('success');
      setMessage(`¡URL para ${vehicle.make} ${vehicle.model} escrita exitosamente!`);
      
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      console.error("Error de escritura NFC:", error);
      setStatus('error');
      setMessage(`Fallo al escribir en la etiqueta. Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
        <div className="flex justify-center items-center mx-auto bg-blue-100 dark:bg-blue-900 rounded-full h-16 w-16 mb-4">
          <Icon name="nfc" className="w-8 h-8 text-blue-600 dark:text-blue-300" />
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Escritor de Etiquetas NFC</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Escribiendo datos para el vehículo: <span className="font-semibold">{vehicle.make} {vehicle.model} ({vehicle.licensePlate})</span>
        </p>
        
        <div className="my-6">
          {status === 'writing' && <div className="animate-pulse text-blue-500 font-semibold">Buscando etiqueta...</div>}
          <p className={`text-sm ${
            status === 'success' ? 'text-green-600 dark:text-green-400' :
            status === 'error' ? 'text-red-600 dark:text-red-400' :
            'text-gray-500 dark:text-gray-400'
          }`}>{message}</p>
        </div>

        {!isNfcSupported && (
             <p className="text-sm text-yellow-600 dark:text-yellow-400 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-md">
                Tu navegador o dispositivo no es compatible con Web NFC. Esta función está disponible actualmente en Chrome para Android.
            </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={writeToNfc}
            disabled={status === 'writing' || !isNfcSupported}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {status === 'writing' ? 'Escribiendo...' : 'Iniciar Escritura'}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NfcWriter;