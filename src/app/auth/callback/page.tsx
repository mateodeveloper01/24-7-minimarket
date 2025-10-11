'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Callback() {
    const router = useRouter();
    
    useEffect(() => {
        // Esperar un momento para que Auth0 termine de establecer la sesión
        const timer = setTimeout(() => {
            router.push('/gestor');
        }, 100);
        
        return () => clearTimeout(timer);
    }, [router]);
    
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>Redirigiendo a gestor...</div>
        </div>
    );
}