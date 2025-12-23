import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const InputGroup = ({ label, type = "text", name, value, onChange, placeholder, required = true }) => (
    <div className="form-group">
        <label className="form-label">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="form-input"
        />
    </div>
);

const CheckboxGroup = ({ label, options, selected, onChange, otherValue, onOtherChange }) => (
    <div className="checkbox-group">
        <label className="form-label">{label}</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {options.map(option => (
                <label key={option} className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        onChange={(e) => onChange(option, e.target.checked)}
                        className="checkbox-input"
                    />
                    {option}
                </label>
            ))}
            {onOtherChange && (
                <div style={{ marginTop: '8px' }}>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={selected.includes('その他')}
                            onChange={(e) => onChange('その他', e.target.checked)}
                            className="checkbox-input"
                        />
                        その他
                    </label>
                    {selected.includes('その他') && (
                        <input
                            type="text"
                            value={otherValue}
                            onChange={(e) => onOtherChange(e.target.value)}
                            placeholder="具体的にお書きください"
                            className="form-input"
                            style={{ marginTop: '8px' }}
                        />
                    )}
                </div>
            )}
        </div>
    </div>
);

const SelectGroup = ({ label, name, value, onChange, options, placeholder, required = true }) => (
    <div className="form-group">
        <label className="form-label">{label}</label>
        <div style={{ position: 'relative' }}>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="form-select"
            >
                <option value="" disabled>{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    </div>
);

import { useRegistration } from '../../context/RegistrationContext';

export default function RegisterForm() {
    const navigate = useNavigate();
    const { registrationData, updateUserInfo } = useRegistration();
    const [formData, setFormData] = useState({
        name: registrationData.userInfo.name || '',
        email: registrationData.userInfo.email || '',
        password: '',
        passwordConfirm: '',
        phone: registrationData.userInfo.phone || '',
        birthdate: registrationData.userInfo.birthdate || '',
        address: registrationData.userInfo.address || '',
        campaign: registrationData.userInfo.campaign || '',
        plan: registrationData.userInfo.plan || '',
        options: registrationData.userInfo.options || [],
        surveySource: registrationData.userInfo.surveySource || [],
        surveySourceOther: registrationData.userInfo.surveySourceOther || '',
        surveyPurpose: registrationData.userInfo.surveyPurpose || []
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const toggleSelection = (key, option, checked) => {
        setFormData(prev => {
            const next = new Set(prev[key] || []);
            if (checked) {
                next.add(option);
            } else {
                next.delete(option);
            }
            return { ...prev, [key]: Array.from(next) };
        });
    };

    const handleOptionChange = (option, checked) => {
        toggleSelection('options', option, checked);
    };

    const handleSourceChange = (option, checked) => {
        toggleSelection('surveySource', option, checked);
        if (option === 'その他' && !checked) {
            setFormData(prev => ({ ...prev, surveySourceOther: '' }));
        }
    };

    const handlePurposeChange = (option, checked) => {
        toggleSelection('surveyPurpose', option, checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            alert('パスワードが一致しません');
            return;
        }
        if (formData.password.length < 8) {
            alert('パスワードは8文字以上で入力してください');
            return;
        }
        updateUserInfo(formData);
        navigate('/register/terms');
    };

    return (
        <div className="container">
            <header className="page-header">
                <button onClick={() => navigate('/')} className="btn-back"><ChevronLeft size={24} /></button>
                <h1 className="page-title">会員情報の入力</h1>
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
                    label="パスワード"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="8文字以上の半角英数字"
                />
                <InputGroup
                    label="パスワード（確認）"
                    type="password"
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    placeholder="パスワードを再入力"
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
                    label="住所"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="東京都渋谷区..."
                />
                <InputGroup
                    label="生年月日"
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                />

                <hr className="divider" />

                <SelectGroup
                    label="キャンペーンご利用について"
                    name="campaign"
                    value={formData.campaign}
                    onChange={handleChange}
                    placeholder="選択してください"
                    options={[
                        { value: 'benefit1', label: '特典1のみ利用' },
                        { value: 'benefit2', label: '特典2のみ利用' }
                    ]}
                />

                <SelectGroup
                    label="ご利用プラン"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    placeholder="プランを選択してください"
                    options={[
                        { value: 'light', label: 'ライト（¥9,980）' },
                        { value: 'standard', label: 'スタンダード（¥13,000）' },
                        { value: 'platinum', label: 'プラチナ（¥18,000）' },
                        { value: 'afternoon', label: 'アフタヌーン（¥9,980）' },
                        { value: 'afternoon_plus', label: 'アフタヌーン＋（¥15,000）' },
                        { value: 'family', label: 'ファミリー（¥15,000）' },
                        { value: 'mr_stretch', label: 'Mr.ストレッチ（¥9,980）' }
                    ]}
                />

                <CheckboxGroup
                    label="オプション（複数回答可）"
                    options={['種目追加', '水素', 'プロテイン飲み放題＆貸ロッカー', 'ストレッチ']}
                    selected={formData.options}
                    onChange={handleOptionChange}
                />

                <hr className="divider" />

                <CheckboxGroup
                    label="当店をお知りになったきっかけを教えてください（複数回答可）"
                    options={['インスタグラム', 'チラシ', '通りがかり', 'ご紹介', '口コミ', 'ネット検索']}
                    selected={formData.surveySource}
                    onChange={handleSourceChange}
                    otherValue={formData.surveySourceOther}
                    onOtherChange={(val) => setFormData(prev => ({ ...prev, surveySourceOther: val }))}
                />

                <CheckboxGroup
                    label="ご利用目的を教えてください"
                    options={['ダイエット', '育児の息抜き', 'ストレス解消', 'スポーツのパフォーマンスアップ', '子供の遊び場として', '運動不足解消']}
                    selected={formData.surveyPurpose}
                    onChange={handlePurposeChange}
                />

                <button type="submit" className="btn-primary" style={{ marginTop: '24px' }}>
                    次へ
                </button>
            </form>
        </div>
    );
}
