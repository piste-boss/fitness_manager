import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Eraser } from 'lucide-react';
import { useRegistration } from '../../context/RegistrationContext';

export default function Signature() {
    const navigate = useNavigate();
    const { saveSignature } = useRegistration();
    const sigCanvas = useRef({});

    const clear = () => sigCanvas.current.clear();

    const save = () => {
        if (sigCanvas.current.isEmpty()) {
            alert("署名をお願いします");
            return;
        }
        const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        saveSignature(dataUrl);
        navigate('/register/payment');
    };

    return (
        <div className="container">
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '8px' }}>
                <button onClick={() => navigate('/register/form')}><ChevronLeft size={24} /></button>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '700' }}>同意・署名</h1>
            </header>

            <div className="card">
                <p style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
                    私は、利用規約に同意し、Pisteに入会を申し込みます。
                </p>

                <div style={{ border: '1px dashed var(--text-sub)', borderRadius: 'var(--radius-sm)', marginBottom: '16px', backgroundColor: '#fff', position: 'relative' }}>
                    <SignatureCanvas
                        ref={sigCanvas}
                        penColor="black"
                        canvasProps={{ width: 500, height: 200, className: 'sigCanvas', style: { width: '100%', height: '200px' } }}
                    />
                    <div style={{ position: 'absolute', bottom: '8px', right: '8px', fontSize: '0.7rem', color: 'var(--text-sub)', pointerEvents: 'none' }}>ご署名欄</div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <button
                        type="button"
                        onClick={clear}
                        style={{
                            padding: '12px',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.9rem',
                            color: 'var(--text-sub)'
                        }}>
                        <Eraser size={18} />
                        クリア
                    </button>
                    <button className="btn-primary" onClick={save}>
                        次へ（決済）
                    </button>
                </div>
            </div>
        </div>
    );
}
