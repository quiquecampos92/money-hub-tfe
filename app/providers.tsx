// app/providers.tsx
'use client'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrimeReactProvider>
        {children}
    </PrimeReactProvider>
    );
}