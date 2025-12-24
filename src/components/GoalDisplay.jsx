import React from 'react';
import { Target, Calendar, Edit2 } from 'lucide-react';

export default function GoalDisplay({ goal, onEdit }) {
    if (!goal) return null;

    return (
        <div
            onClick={onEdit}
            style={{
                background: 'white',
                borderRadius: '0', // Square
                padding: '16px',
                marginBottom: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderLeft: '4px solid #0ea5e9' // Accent
            }}
        >
            <div style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: 'var(--text-main)',
                textAlign: 'center',
                width: '100%'
            }}>
                {goal.vision}
            </div>
            {/* Hidden edit hint or icon could be added, but user wants simple */}
        </div>
    );
}
