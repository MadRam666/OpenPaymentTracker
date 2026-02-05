import React, { useState, useEffect } from 'react';
import { Play, Square, Clock } from 'lucide-react';
import useStore from '../store/useStore';

const TimeTracker = ({ itemId }) => {
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setElapsed(Date.now() - startTime);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, startTime]);

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const startTracking = () => {
        setIsActive(true);
        setStartTime(Date.now());
    };

    const stopTracking = () => {
        setIsActive(false);
        // Here we would save the entry to DB
        console.log(`Saved ${elapsed}ms for item ${itemId}`);
        setElapsed(0);
    };

    return (
        <div className="glass" style={{
            padding: '1rem',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)' }}>
                <Clock size={20} />
                <span style={{ fontFamily: 'monospace', fontSize: '1.2rem', color: isActive ? 'var(--primary)' : 'inherit' }}>
                    {formatTime(elapsed)}
                </span>
            </div>

            {!isActive ? (
                <button
                    onClick={startTracking}
                    style={{
                        background: 'var(--success)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}
                >
                    <Play size={20} fill="white" />
                </button>
            ) : (
                <button
                    onClick={stopTracking}
                    style={{
                        background: 'var(--danger)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}
                >
                    <Square size={20} fill="white" />
                </button>
            )}
        </div>
    );
};

export default TimeTracker;
