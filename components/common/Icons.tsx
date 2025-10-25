import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
  // FIX: Replaced JSX.Element with React.ReactElement to resolve namespace issue.
  const icons: { [key: string]: React.ReactElement } = {
    car: <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V9.618a1 1 0 01.553-.894L9 6m0 14V6m0 14h6m-6 0H6.343A1 1 0 015 19V7a1 1 0 011.343-.943L15 4l5.657 2.057A1 1 0 0122 7v12a1 1 0 01-1.343.943L15 16m-6 4v-5h6v5h-6z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    wrench: <path strokeLinecap="round" strokeLinejoin="round" d="M11.07 2.593A.75.75 0 0010.5 2h-1a.75.75 0 00-.57.24L3.24 8.76a.75.75 0 000 1.06l3.89 3.89a.75.75 0 001.06 0l6.52-6.52a.75.75 0 00.24-.57v-1a.75.75 0 00-.24-.57L11.07 2.593zM14.25 6a.75.75 0 00-1.06 0l-1.06 1.06a.75.75 0 000 1.06l4.24 4.24a.75.75 0 001.06 0l1.06-1.06a.75.75 0 000-1.06l-4.24-4.24zM19.5 13.5a.75.75 0 00-1.06 0l-1.06 1.06a.75.75 0 000 1.06l2.12 2.12c.56.56 1.57.24 1.88-.31.31-.55 0-1.32-.31-1.88l-1.57-1.57z" />,
    logout: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12" />,
    nfc: <path strokeLinecap="round" strokeLinejoin="round" d="M4.03 3.97a.75.75 0 011.06 0l2.858 2.858a.75.75 0 010 1.06l-2.858 2.858a.75.75 0 11-1.06-1.06L6.31 7.42 4.03 5.03a.75.75 0 010-1.06zM9.97 3.97a.75.75 0 011.06 0l2.858 2.858a.75.75 0 010 1.06L11.03 10.7a.75.75 0 11-1.06-1.06l2.32-2.32-2.32-2.32a.75.75 0 010-1.06zM15.97 3.97a.75.75 0 011.06 0l2.858 2.858a.75.75 0 010 1.06L17.03 10.7a.75.75 0 11-1.06-1.06l2.32-2.32-2.32-2.32a.75.75 0 010-1.06zM3.75 14.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" />,
    qr: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5A.75.75 0 014.5 3.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5zM3.75 15A.75.75 0 014.5 14.25h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5zM15 3.75A.75.75 0 0014.25 3h-4.5a.75.75 0 00-.75.75v4.5a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75v-4.5zM15 15.75a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 010-1.5h1.5v-1.5a.75.75 0 01.75-.75z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    chevronDown: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
    camera: <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316zM12 15a3.75 3.75 0 110-7.5 3.75 3.75 0 010 7.5z" />,
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      {icons[name] || <path />}
    </svg>
  );
};
