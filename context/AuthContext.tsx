'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

type ModalView = 'login' | 'register' | 'reset';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isModalOpen: boolean;
    modalView: ModalView;
    openModal: (view?: ModalView) => void;
    closeModal: () => void;
    setModalView: (view: ModalView) => void;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalView, setModalView] = useState<ModalView>('login');

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const openModal = (view: ModalView = 'login') => {
        setModalView(view);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalView('login'); // Reset to login view on close
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        // Optional: Redirect or show toast
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isModalOpen,
            modalView,
            openModal,
            closeModal,
            setModalView,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
