import React, { useState, useEffect } from 'react';
import { Save, Mail, Download, Upload, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { runChecker, sendEmailReport } from '../utils/checker';

const Settings = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(localStorage.getItem('report_email') || '');
    const [lastCheck, setLastCheck] = useState(localStorage.getItem('last_check') || 'Nie');

    const handleSaveEmail = () => {
        localStorage.setItem('report_email', email);
        alert('Email gespeichert!');
    };

    const handleManualCheck = async () => {
        const report = await runChecker();
        if (report) {
            if (confirm('Überfällige Posten gefunden. Bericht jetzt per Mail senden?')) {
                sendEmailReport(email, report);
            }
        } else {
            alert('Keine überfälligen Posten gefunden.');
        }
        const now = new Date().toLocaleString();
        localStorage.setItem('last_check', now);
        setLastCheck(now);
    };

    return (
        <div className="settings animate-fade-in" style={{ padding: '1rem' }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'white' }}>
                    <ArrowLeft />
                </button>
                <h1>Einstellungen</h1>
            </header>

            <section className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={18} /> Berichts-Empfänger
                </h2>
                <input
                    type="email"
                    placeholder="beispiel@mail.de"
                    className="glass"
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)', marginBottom: '1rem' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSaveEmail} style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '0.8rem',
                    border: 'none',
                    background: 'var(--primary)',
                    color: 'white',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}>
                    <Save size={18} /> Speichern
                </button>
            </section>

            <section className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Automatischer Checker</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Letzter Check: {lastCheck}
                </p>
                <button onClick={handleManualCheck} style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '0.8rem',
                    border: '1px solid var(--primary)',
                    background: 'transparent',
                    color: 'var(--primary)',
                    fontWeight: 'bold'
                }}>
                    Jetzt prüfen & Bericht senden
                </button>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button className="glass" style={{
                    padding: '1rem',
                    borderRadius: '1rem',
                    border: 'none',
                    color: 'var(--text-main)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Download size={24} />
                    <span style={{ fontSize: '0.8rem' }}>Export</span>
                </button>
                <button className="glass" style={{
                    padding: '1rem',
                    borderRadius: '1rem',
                    border: 'none',
                    color: 'var(--text-main)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Upload size={24} />
                    <span style={{ fontSize: '0.8rem' }}>Import</span>
                </button>
            </section>
        </div>
    );
};

export default Settings;
