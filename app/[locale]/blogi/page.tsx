export default function BlogPage() {
    return (
        <div style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Blogi</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-gray)' }}>
                    Blogi tuleb peagi! Siin jagame retsepte, kokanõuandeid ja palju muud.
                </p>
            </div>
        </div>
    );
}
