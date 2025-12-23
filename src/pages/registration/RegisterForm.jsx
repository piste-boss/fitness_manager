import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const InputGroup = ({ label, type = "text", name, value, onChange, placeholder, required = true }) => (
    <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-sub)' }}>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        />
    </div>
);

export default function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        birthdate: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, save to context or local storage here
        navigate('/register/signature');
    };

    return (
        <div className="container">
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '8px' }}>
                <button onClick={() => navigate('/register/terms')}><ChevronLeft size={24} /></button>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '700' }}>会員情報の入力</h1>
            </header>

            <form onSubmit={handleSubmit} className="card">
                <InputGroup
                    label="お名前"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="山田 花子"
                />
                <InputGroup
                    label="メールアドレス"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                />
                <InputGroup
                    label="電話番号"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="090-1234-5678"
                />
                <InputGroup
                    label="生年月日"
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                />

                <button type="submit" className="btn-primary" style={{ marginTop: '24px' }}>
                    次へ（署名）
                </button>
            </form>
        </div>
    );
}
