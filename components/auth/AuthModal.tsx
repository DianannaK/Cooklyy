'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';
import styles from './Auth.module.css';

export default function AuthModal() {
    const { isModalOpen, closeModal, modalView } = useAuth();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isModalOpen]);

    if (!isVisible) return null;

    return (
        <div
            className={`${styles.overlay} ${isModalOpen ? styles.open : ''}`}
            onClick={closeModal}
        >
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeBtn} onClick={closeModal}>×</button>

                {modalView === 'login' && <LoginForm />}
                {modalView === 'register' && <RegisterForm />}
                {modalView === 'reset' && <ResetPasswordForm />}
            </div>
        </div>
    );
}
