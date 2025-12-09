export default function KontaktPage() {
    return (
        <div style={{ minHeight: 'calc(100vh - 70px)', padding: '4rem 2rem', background: 'var(--background-cream)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Kontakt</h1>

                <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>📧 E-post</h3>
                        <p style={{ color: 'var(--text-gray)' }}>info@eestimaitsed.ee</p>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>📞 Telefon</h3>
                        <p style={{ color: 'var(--text-gray)' }}>+372 123 4567</p>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>📍 Aadress</h3>
                        <p style={{ color: 'var(--text-gray)' }}>Tallinn, Eesti</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
