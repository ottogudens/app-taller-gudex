
import React, { useEffect, useRef } from 'react';

declare const Html5Qrcode: any;

interface QrScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanFailure: (error: string) => void;
  onClose: () => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess, onScanFailure, onClose }) => {
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    const qrboxFunction = (viewfinderWidth: number, viewfinderHeight: number) => {
        const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
        const qrboxSize = Math.floor(minEdge * 0.7);
        return {
            width: qrboxSize,
            height: qrboxSize,
        };
    }

    if (typeof Html5Qrcode !== 'undefined') {
      const html5QrcodeScanner = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrcodeScanner;
      
      const config = { fps: 10, qrbox: qrboxFunction };

      html5QrcodeScanner.start(
        { facingMode: "environment" }, 
        config,
        (decodedText: string, decodedResult: any) => {
            onScanSuccess(decodedText);
            html5QrcodeScanner.stop();
        },
        (errorMessage: string) => {
           // This callback is called frequently, so we can ignore parse errors.
        }
      ).catch((err: any) => {
        onScanFailure(`Error al iniciar el escáner QR: ${err.message}`);
      });
    } else {
        onScanFailure("La librería del escáner QR no se ha cargado.");
    }
    
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch((err: any) => console.error("Fallo al detener el escáner", err));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">Escanear Código QR</h2>
        <div id="qr-reader" className="w-full"></div>
        <button 
          onClick={onClose}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default QrScanner;