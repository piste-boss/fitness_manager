import React, { useState, useEffect } from 'react';
import { Settings, Database, Key, Download, Trash2, Save, Server } from 'lucide-react';

export default function AdminPage() {
    const [apiKey, setApiKey] = useState('');
    const [storageType, setStorageType] = useState('local');
    const [showKey, setShowKey] = useState(false);

    useEffect(() => {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) setApiKey(savedKey);

        const savedStorage = localStorage.getItem('storage_type');
        if (savedStorage) setStorageType(savedStorage);
    }, []);

    const handleSaveKey = () => {
        localStorage.setItem('gemini_api_key', apiKey);
        alert('APIキーを保存しました');
    };

    const handleSaveStorage = () => {
        localStorage.setItem('storage_type', storageType);
        alert('ストレージ設定を保存しました');
    };

    const handleExportData = () => {
        const data = {
            userProfile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
            userGoal: JSON.parse(localStorage.getItem('userGoal') || '{}'),
            weightRecords: JSON.parse(localStorage.getItem('weightRecords') || '{}'),
            dailyCalories: JSON.parse(localStorage.getItem('dailyCalories') || '{}'),
            exerciseRecords: JSON.parse(localStorage.getItem('exerciseRecords') || '{}'),
            gemini_api_key: localStorage.getItem('gemini_api_key')
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fitness_manager_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleClearData = () => {
        if (window.confirm('本当にすべてのデータを削除しますか？この操作は取り消せません。')) {
            // Keep the API key if desired, but here we clear everything relevant
            const key = localStorage.getItem('gemini_api_key');
            localStorage.clear();
            if (key) localStorage.setItem('gemini_api_key', key);

            alert('データを初期化しました');
            window.location.reload();
        }
    };

    return (
        <div className="container" style={{ paddingBottom: '40px' }}>
            <div className="page-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Settings size={28} color="var(--text-main)" />
                    <h1 className="page-title" style={{ marginBottom: 0 }}>管理画面</h1>
                </div>
            </div>

            {/* API Key Settings */}
            <section className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Key size={20} color="var(--primary)" />
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>AI API 設定</h2>
                </div>

                <div className="form-group">
                    <label className="form-label">Google Gemini API Key</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type={showKey ? "text" : "password"}
                            className="form-input"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="AIzaSy..."
                        />
                        <button
                            className="btn-primary"
                            style={{ width: 'auto', padding: '0 16px' }}
                            onClick={handleSaveKey}
                        >
                            <Save size={20} />
                        </button>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                            <input
                                type="checkbox"
                                checked={showKey}
                                onChange={(e) => setShowKey(e.target.checked)}
                            />
                            キーを表示する
                        </label>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginTop: '8px' }}>
                        ※キーはブラウザのLocalStorageに保存されます。サーバーには送信されません。
                    </p>
                </div>
            </section>

            {/* Storage Settings */}
            <section className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Server size={20} color="var(--accent)" />
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>データ保存先</h2>
                </div>

                <div className="form-group">
                    <label className="form-label">ストレージタイプ</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <select
                            className="form-select"
                            value={storageType}
                            onChange={(e) => setStorageType(e.target.value)}
                        >
                            <option value="local">Browser LocalStorage (ブラウザ保存)</option>
                            <option value="firebase" disabled>Firebase (Cloud保存) [準備中]</option>
                            <option value="supabase" disabled>Supabase (Cloud保存) [準備中]</option>
                        </select>
                        <button
                            className="btn-primary"
                            style={{ width: 'auto', padding: '0 16px' }}
                            onClick={handleSaveStorage}
                        >
                            <Save size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Data Management */}
            <section className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Database size={20} color="#FF8BA7" />
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>データ管理</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <button
                        onClick={handleExportData}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '16px',
                            backgroundColor: 'white',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            color: 'var(--text-main)',
                            cursor: 'pointer'
                        }}
                    >
                        <Download size={20} />
                        データのバックアップ (JSON)
                    </button>

                    <button
                        onClick={handleClearData}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '16px',
                            backgroundColor: '#fee2e2',
                            border: '1px solid #ef4444',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            color: '#ef4444',
                            cursor: 'pointer'
                        }}
                    >
                        <Trash2 size={20} />
                        全データを削除 (初期化)
                    </button>
                </div>
            </section>
        </div>
    );
}
