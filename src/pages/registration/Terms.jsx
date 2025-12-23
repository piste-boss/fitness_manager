import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Terms() {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ paddingBottom: '100px' }}>
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '8px' }}>
                <button onClick={() => navigate('/')}><ChevronLeft size={24} /></button>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '700' }}>利用規約の確認</h1>
            </header>

            <div className="card" style={{ height: '60vh', overflowY: 'auto', padding: '16px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <h2 style={{ fontSize: '1rem', marginBottom: '8px' }}>Piste ジム利用規約</h2>
                <p style={{ marginBottom: '12px' }}>
                    第1条（目的）<br />
                    本規約は、Piste（以下「当ジム」）の利用に関する条件を定めるものです。
                </p>
                <p style={{ marginBottom: '12px' }}>
                    第2条（会員資格）<br />
                    当ジムの会員は、本規約に同意し、所定の入会手続きを完了した方とします。
                </p>
                <p style={{ marginBottom: '12px' }}>
                    第3条（諸規則の遵守）<br />
                    会員は、当ジムの施設利用にあたり、本規約および施設内の諸規則、スタッフの指示を遵守するものとします。
                </p>
                <p>
                    （以下略... 実際の運用時には詳細な規約が入ります）
                </p>
            </div>

            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '24px', backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', maxWidth: '600px', margin: '0 auto' }}>
                <button className="btn-primary" onClick={() => navigate('/register/form')}>
                    同意して次へ
                </button>
            </div>
        </div>
    );
}
