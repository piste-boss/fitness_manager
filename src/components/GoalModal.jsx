import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function GoalModal({ isOpen, onClose, onSave }) {
    const [weight, setWeight] = useState('');
    const [vision, setVision] = useState('');
    const [deadline, setDeadline] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ weight, vision, deadline });
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0)', // Remove overlay dim
            pointerEvents: 'none', // Allow clicking through outside the modal
            display: 'flex',
            alignItems: 'flex-start', // Top alignment
            justifyContent: 'flex-end', // Right alignment (Changed from flex-start)
            zIndex: 1000,
            padding: '24px' // Spacing from edge
        }}>
            <div style={{
                backgroundColor: '#0ea5e9', // Darker Blue (Sky 500) - Changed from #7CD6FD
                borderRadius: '0', // Removed rounded corners
                padding: '16px', // Reduced padding
                width: '100%',
                maxWidth: '280px', // Roughly 1/4 area of previous 400px width/layout
                position: 'relative',
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                pointerEvents: 'auto', // Re-enable clicks
                color: 'white' // White font
            }}>
                {/* Close button removed since it's always displayed */}

                <h2 style={{
                    fontSize: '1rem', // Reduced font size
                    fontWeight: '800',
                    marginBottom: '4px',
                    textAlign: 'center',
                    color: 'white'
                }}>目標設定</h2>

                <p style={{
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.9)', // Slightly transparent white
                    fontSize: '0.75rem', // Reduced font size
                    marginBottom: '16px'
                }}>あなたの理想の姿を設定しましょう</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '700', fontSize: '0.8rem' }}>
                            目標体重 (kg)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="60.0"
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '0', // Square inputs
                                border: '1px solid rgba(255,255,255,0.5)',
                                fontSize: '0.9rem',
                                background: 'rgba(255,255,255,0.2)', // Semi-transparent input
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '700', fontSize: '0.8rem' }}>
                            いつまでに達成したいですか？
                        </label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '0', // Square inputs
                                border: '1px solid rgba(255,255,255,0.5)',
                                fontSize: '0.9rem',
                                background: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '700', fontSize: '0.8rem' }}>
                            具体的にどうなりたいですか？
                        </label>
                        <input
                            type="text" // Changed to input
                            value={vision}
                            onChange={(e) => setVision(e.target.value)}
                            placeholder="夏までに水着を着こなしたい！"
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '0',
                                border: '1px solid rgba(255,255,255,0.5)',
                                fontSize: '0.9rem',
                                background: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: 'white', // High contrast button
                            color: '#0ea5e9', // Matching text color
                            border: 'none',
                            borderRadius: '0', // Square button
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            marginTop: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        目標を設定する
                    </button>
                </form>
            </div>
        </div>
    );
}
