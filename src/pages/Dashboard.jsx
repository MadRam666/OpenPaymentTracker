import React from 'react';
import useStore from '../store/useStore';
import { Plus, Clock, TrendingUp, ChevronRight, Settings } from 'lucide-react';
import PaymentItemForm from '../components/PaymentItemForm';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { paymentItems, isLoading, addPaymentItem, error: storeError } = useStore();
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const navigate = useNavigate();

    const totalOutstanding = paymentItems.reduce((acc, item) => acc + (parseFloat(item.openClaimAmount) || 0), 0);
    const overdueCount = paymentItems.filter(item => item.overdueSince).length;

    return (
        <div className="dashboard animate-fade-in" style={{ padding: '1rem' }}>
            {storeError && (
                <div className="glass" style={{
                    padding: '1rem',
                    borderRadius: '0.8rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid var(--danger)',
                    color: 'var(--danger)',
                    marginBottom: '1rem',
                    fontSize: '0.9rem'
                }}>
                    Datenbank-Fehler: {storeError}
                </div>
            )}
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Offene Posten</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Übersicht Ihrer Forderungen</p>
                </div>
                <button
                    onClick={() => navigate('/settings')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}
                >
                    <Settings size={24} />
                </button>
            </header>


            <section className="stats-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <div className="glass" style={{ padding: '1rem', borderRadius: '1rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gesamt Forderung</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        {totalOutstanding.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </p>
                </div>
                <div className="glass" style={{ padding: '1rem', borderRadius: '1rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Überfällig</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--danger)' }}>
                        {overdueCount} Posten
                    </p>
                </div>
            </section>

            <section className="payment-list">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2>Aktuelle Posten</h2>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="glass" style={{
                            padding: '0.5rem',
                            borderRadius: '50%',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}>
                        <Plus size={20} />
                    </button>
                </div>

                {isLoading ? (
                    <p>Lade Daten...</p>
                ) : paymentItems.length === 0 ? (
                    <div className="glass" style={{
                        padding: '2rem',
                        textAlign: 'center',
                        borderRadius: '1rem',
                        color: 'var(--text-muted)'
                    }}>
                        Keine offenen Posten gefunden. Tippen Sie auf das Plus, um einen neuen Fall zu erstellen.
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {paymentItems.map(item => (
                            <div
                                key={item.id}
                                onClick={() => navigate(`/item/${item.id}`)}
                                className="glass"
                                style={{ padding: '1rem', borderRadius: '1rem', cursor: 'pointer' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1rem' }}>{item.userStory || 'Unbenannter Fall'}</h3>
                                    <span style={{ fontWeight: 'bold' }}>
                                        {parseFloat(item.openClaimAmount).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        <Clock size={14} />
                                        <span>Status: {item.overdueSince ? 'Säumig' : 'Aktiv'}</span>
                                    </div>
                                    <ChevronRight size={16} color="var(--text-muted)" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {isFormOpen && (
                <PaymentItemForm
                    onClose={() => setIsFormOpen(false)}
                    onSave={async (data) => {
                        await addPaymentItem(data);
                        setIsFormOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;
