import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

const PaymentItemForm = ({ onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        userStory: '',
        openClaimAmount: '',
        nextSteps: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        overdueSince: '',
        googleDriveLinks: ''
    });

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        const amount = parseFloat(formData.openClaimAmount);
        if (isNaN(amount)) {
            setError('Bitte geben Sie einen gültigen Betrag ein.');
            setIsSaving(false);
            return;
        }

        try {
            console.log('Saving item:', formData);
            await onSave({
                ...formData,
                openClaimAmount: amount,
                googleDriveLinks: typeof formData.googleDriveLinks === 'string'
                    ? formData.googleDriveLinks.split('\n').filter(l => l.trim())
                    : []
            });
        } catch (err) {
            console.error('Save error details:', err);
            setError(err.message || 'Speichern fehlgeschlagen. Bitte prüfen Sie Ihre Eingaben.');
        } finally {
            setIsSaving(false);
        }
    };



    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div className="glass animate-fade-in" style={{
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                borderRadius: '1.5rem',
                padding: '2rem',
                position: 'relative'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)'
                }}>
                    <X size={24} />
                </button>

                <h2 style={{ marginBottom: '1.5rem' }}>{initialData ? 'Posten bearbeiten' : 'Neuer Posten'}</h2>

                {error && (
                    <div className="glass" style={{
                        padding: '1rem',
                        borderRadius: '0.8rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid var(--danger)',
                        color: 'var(--danger)',
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Betreff / User Story</label>
                        <input
                            required
                            type="text"
                            className="glass"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)' }}
                            value={formData.userStory}
                            onChange={(e) => setFormData({ ...formData, userStory: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Betrag (€)</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                className="glass"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)' }}
                                value={formData.openClaimAmount}
                                onChange={(e) => setFormData({ ...formData, openClaimAmount: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Säumig seit</label>
                            <input
                                type="date"
                                className="glass"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)' }}
                                value={formData.overdueSince}
                                onChange={(e) => setFormData({ ...formData, overdueSince: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Nächste Schritte</label>
                        <textarea
                            className="glass"
                            rows="3"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)', resize: 'none' }}
                            value={formData.nextSteps}
                            onChange={(e) => setFormData({ ...formData, nextSteps: e.target.value })}
                        />
                    </div>

                    <h3 style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Ansprechpartner</h3>
                    <div style={{ display: 'grid', gap: '0.8rem' }}>
                        <input
                            placeholder="Name"
                            type="text"
                            className="glass"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)' }}
                            value={formData.contactName}
                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        />
                        <input
                            placeholder="Email"
                            type="email"
                            className="glass"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)' }}
                            value={formData.contactEmail}
                            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Google Drive Links (einer pro Zeile)</label>
                        <textarea
                            className="glass"
                            rows="2"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)', resize: 'none' }}
                            value={formData.googleDriveLinks}
                            onChange={(e) => setFormData({ ...formData, googleDriveLinks: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            borderRadius: '0.8rem',
                            border: 'none',
                            background: isSaving ? 'var(--text-muted)' : 'var(--primary)',
                            color: 'white',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: isSaving ? 'not-allowed' : 'pointer',
                            opacity: isSaving ? 0.7 : 1
                        }}>
                        <Save size={20} />
                        {isSaving ? 'Speichere...' : 'Speichern'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default PaymentItemForm;
