import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Complete() {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <CheckCircle size={80} color="var(--secondary)" style={{ marginBottom: '24px' }} />
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>入会手続き完了</h1>
            <p style={{ textAlign: 'center', color: 'var(--text-sub)', marginBottom: '32px' }}>
                Pisteへようこそ！<br />
                入会手続きが完了しました。<br />
                さっそくジムをご利用いただけます。
            </p>

            <button className="btn-primary" onClick={() => navigate('/')}>
                ホームへ戻る
            </button>
        </div>
    );
}
