import useStore from '../store/useStore';
import { ArrowLeft, Edit2, Trash2, ExternalLink, Calendar, User, Phone, Mail, Clock, Activity } from 'lucide-react';
import TimeTracker from '../components/TimeTracker';


const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { paymentItems, updatePaymentItem, deletePaymentItem } = useStore();

    const item = paymentItems.find(i => i.id === parseInt(id));

    if (!item) return <div style={{ padding: '2rem', textAlign: 'center' }}>Fall nicht gefunden</div>;

    const toggleStatus = (key) => {
        updatePaymentItem(item.id, {
            status: { ...item.status, [key]: !item.status[key] }
        });
    };

    return (
        <div className="detail-view animate-fade-in" style={{ padding: '1rem' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'white' }}>
                    <ArrowLeft />
                </button>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}><Edit2 size={20} /></button>
                    <button
                        onClick={() => { if (confirm('Sicher löschen?')) { deletePaymentItem(item.id); navigate('/'); } }}
                        style={{ background: 'none', border: 'none', color: 'var(--danger)' }}
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </header>

            <div className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.userStory}</h1>
                <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {parseFloat(item.openClaimAmount).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </p>
            </div>

            <h2 style={{ fontSize: '1rem', marginBottom: '0.8rem' }}>Zeitstrahl & Tracking</h2>
            <TimeTracker itemId={item.id} />

            <section style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Activity size={18} />
                    <h2 style={{ fontSize: '1rem', margin: 0 }}>Case Status</h2>
                </div>

                <div style={{ display: 'grid', gap: '0.8rem' }}>
                    {[
                        { id: 'collectionInvolved', label: 'Inkasso eingeschaltet' },
                        { id: 'paymentOrderInitiated', label: 'Mahnbescheid eingeleitet' },
                        { id: 'objectionInitiated', label: 'Widerspruch eingeleitet' },
                        { id: 'vbBescheid', label: 'VB Bescheid' },
                        { id: 'garnishment', label: 'Pfändung eingeleitet' }
                    ].map(step => (
                        <div
                            key={step.id}
                            onClick={() => toggleStatus(step.id)}
                            className="glass"
                            style={{
                                padding: '1rem',
                                borderRadius: '0.8rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                borderLeft: item.status?.[step.id] ? '4px solid var(--success)' : '4px solid var(--glass-border)'
                            }}
                        >
                            <span>{step.label}</span>
                            <div style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: item.status?.[step.id] ? 'var(--success)' : 'transparent',
                                border: '2px solid var(--glass-border)'
                            }} />
                        </div>
                    ))}
                </div>
            </section>

            <section className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Kontaktdaten</h2>
                <div style={{ display: 'grid', gap: '0.8rem', opacity: 0.8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> {item.contactName || 'N/A'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> {item.contactEmail || 'N/A'}</div>
                </div>
            </section>

            {item.googleDriveLinks?.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Dokumente</h2>
                    <div style={{ display: 'grid', gap: '0.8rem' }}>
                        {item.googleDriveLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                className="glass"
                                style={{
                                    padding: '1rem',
                                    borderRadius: '0.8rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    textDecoration: 'none',
                                    color: 'white'
                                }}
                            >
                                <span>Google Drive Link {idx + 1}</span>
                                <ExternalLink size={16} />
                            </a>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ItemDetail;
