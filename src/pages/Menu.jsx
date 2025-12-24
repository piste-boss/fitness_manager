import React, { useState, useEffect } from 'react';
import { User, Ruler, Activity, Coffee } from 'lucide-react';

export default function MenuPage() {
    const [height, setHeight] = useState('');
    const [lifestyle, setLifestyle] = useState('desk_work');
    const [walking, setWalking] = useState(false);

    // Load saved data on mount
    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            const data = JSON.parse(savedProfile);
            setHeight(data.height || '');
            setLifestyle(data.lifestyle || 'desk_work');
            setWalking(data.walking || false);
        }
    }, []);

    const handleSave = () => {
        const profileData = { height, lifestyle, walking };
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        alert('設定を保存しました');
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="page-title">マイページ</h1>
            </div>

            <div className="card">
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '24px' }}>プロフィール設定</h2>

                {/* Height Input */}
                <div className="form-group">
                    <label className="form-label">身長</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="number"
                            className="form-input"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="160"
                        />
                        <span style={{
                            position: 'absolute',
                            right: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-sub)',
                            fontSize: '0.9rem'
                        }}>cm</span>
                    </div>
                </div>

                {/* Lifestyle Select */}
                <div className="form-group">
                    <label className="form-label">日常生活</label>
                    <select
                        className="form-select"
                        value={lifestyle}
                        onChange={(e) => setLifestyle(e.target.value)}
                    >
                        <option value="housework_childcare">家事・育児</option>
                        <option value="desk_work">デスクワーク中心</option>
                        <option value="standing_work">立ち仕事</option>
                    </select>
                </div>

                {/* Walking Toggle */}
                <div className="form-group">
                    <label className="form-label">運動習慣</label>
                    <div
                        onClick={() => setWalking(!walking)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px',
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>1日15分以上のウォーキング</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>通勤・買い物なども含みます</span>
                        </div>

                        <div style={{
                            position: 'relative',
                            width: '52px',
                            height: '32px',
                            backgroundColor: walking ? 'var(--primary)' : '#cbd5e1',
                            borderRadius: '999px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                            flexShrink: 0
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '4px',
                                left: walking ? '24px' : '4px',
                                width: '24px',
                                height: '24px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }} />
                        </div>
                    </div>
                </div>

                <button className="btn-primary" onClick={handleSave} style={{ marginTop: '32px' }}>
                    保存する
                </button>

            </div>
        </div>
    );
}
