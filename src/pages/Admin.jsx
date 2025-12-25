import React, { useState, useEffect } from 'react';
import { Settings, Database, Key, Download, Trash2, Save, Server, Dumbbell, Plus, List, Calendar, User, Clock } from 'lucide-react';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('settings');

    return (
        <div className="container" style={{ paddingBottom: '40px' }}>
            <div className="page-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Settings size={28} color="var(--text-main)" />
                    <h1 className="page-title" style={{ marginBottom: 0 }}>管理画面</h1>
                </div>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                backgroundColor: 'var(--surface)',
                padding: '4px',
                borderRadius: '8px',
                marginBottom: '24px',
                border: '1px solid var(--border)'
            }}>
                <button
                    onClick={() => setActiveTab('settings')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '6px',
                        backgroundColor: activeTab === 'settings' ? 'white' : 'transparent',
                        color: activeTab === 'settings' ? 'var(--primary-dark)' : 'var(--text-sub)',
                        fontWeight: activeTab === 'settings' ? '700' : '500',
                        boxShadow: activeTab === 'settings' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <Settings size={18} />
                    システム設定
                </button>
                <button
                    onClick={() => setActiveTab('training')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '6px',
                        backgroundColor: activeTab === 'training' ? 'white' : 'transparent',
                        color: activeTab === 'training' ? 'var(--primary-dark)' : 'var(--text-sub)',
                        fontWeight: activeTab === 'training' ? '700' : '500',
                        boxShadow: activeTab === 'training' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <Dumbbell size={18} />
                    トレーニング管理
                </button>
            </div>

            {activeTab === 'settings' ? <SettingsTab /> : <TrainingTab />}
        </div>
    );
}

// --- Settings Component ---
const SettingsTab = () => {
    const [apiKey, setApiKey] = useState('');
    const [gasAppUrl, setGasAppUrl] = useState('');
    const [spreadsheetUrl, setSpreadsheetUrl] = useState('');
    const [storageType, setStorageType] = useState('local');
    const [showKey, setShowKey] = useState(false);

    useEffect(() => {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) setApiKey(savedKey);

        const savedGasUrl = localStorage.getItem('gas_app_url');
        if (savedGasUrl) setGasAppUrl(savedGasUrl);

        const savedSheetUrl = localStorage.getItem('spreadsheet_url');
        if (savedSheetUrl) setSpreadsheetUrl(savedSheetUrl);

        const savedStorage = localStorage.getItem('storage_type');
        if (savedStorage) setStorageType(savedStorage);
    }, []);

    const handleSaveKey = () => {
        localStorage.setItem('gemini_api_key', apiKey);
        alert('APIキーを保存しました');
    };

    const handleSaveStorage = () => {
        localStorage.setItem('storage_type', storageType);
        localStorage.setItem('gas_app_url', gasAppUrl);
        localStorage.setItem('spreadsheet_url', spreadsheetUrl);
        alert('ストレージ・GAS設定を保存しました');
    };

    const handleExportData = () => {
        const data = {
            userProfile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
            userGoal: JSON.parse(localStorage.getItem('userGoal') || '{}'),
            weightRecords: JSON.parse(localStorage.getItem('weightRecords') || '{}'),
            dailyCalories: JSON.parse(localStorage.getItem('dailyCalories') || '{}'),
            exerciseRecords: JSON.parse(localStorage.getItem('exerciseRecords') || '{}'),
            trainerRecords: JSON.parse(localStorage.getItem('trainerRecords') || '[]'),
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
            const key = localStorage.getItem('gemini_api_key');
            localStorage.clear();
            if (key) localStorage.setItem('gemini_api_key', key);

            alert('データを初期化しました');
            window.location.reload();
        }
    };

    return (
        <>
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
                        <button className="btn-primary" style={{ width: 'auto', padding: '0 16px' }} onClick={handleSaveKey}>
                            <Save size={20} />
                        </button>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                            <input type="checkbox" checked={showKey} onChange={(e) => setShowKey(e.target.checked)} />
                            キーを表示する
                        </label>
                    </div>
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
                        <select className="form-select" value={storageType} onChange={(e) => setStorageType(e.target.value)}>
                            <option value="local">Browser LocalStorage (ブラウザ保存)</option>
                            <option value="gas">Google Sheets via GAS (クラウド保存)</option>
                        </select>
                        <button className="btn-primary" style={{ width: 'auto', padding: '0 16px' }} onClick={handleSaveStorage}>
                            <Save size={20} />
                        </button>
                    </div>
                    {storageType === 'gas' && (
                        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                                <label className="form-label">GAS Web App URL</label>
                                <input type="text" className="form-input" placeholder="https://script.google.com/..." value={gasAppUrl} onChange={(e) => setGasAppUrl(e.target.value)} />
                            </div>
                            <div>
                                <label className="form-label">スプレッドシート URL (閲覧用)</label>
                                <input type="text" className="form-input" placeholder="https://docs.google.com/..." value={spreadsheetUrl} onChange={(e) => setSpreadsheetUrl(e.target.value)} />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Data Management */}
            <section className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Database size={20} color="#FF8BA7" />
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>データ管理</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <button onClick={handleExportData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: '600' }}>
                        <Download size={20} /> データのバックアップ (JSON)
                    </button>
                    <button onClick={handleClearData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', backgroundColor: '#fee2e2', border: '1px solid #ef4444', borderRadius: 'var(--radius-sm)', color: '#ef4444', cursor: 'pointer', fontWeight: '600' }}>
                        <Trash2 size={20} /> 全データを削除 (初期化)
                    </button>
                </div>
            </section>
        </>
    );
};

// --- Training Management Component ---
const TrainingTab = () => {
    // Mock Members List
    const MEMBERS = ['山田 太郎', '鈴木 花子', '佐藤 健', '高橋 未来', '田中 一郎'];

    // Predefined Menus
    const PREDEFINED_MENUS = [
        { id: 'squat', label: 'スクワット' },
        { id: 'deadlift', label: 'デッドリフト' },
        { id: 'bent_over_row', label: 'ベントオーバーロー' },
        { id: 'bench_press', label: 'ベンチプレス' },
        { id: 'incline_bench_press', label: 'インクラインベンチプレス' },
        { id: 'hip_thrust', label: 'ヒップスラスト' },
        { id: 'abdominal', label: '腹筋' },
        { id: 'one_hand_row', label: 'ワンハンドロウ' },
        { id: 'other', label: 'その他' },
    ];

    const [selectedMember, setSelectedMember] = useState(MEMBERS[0]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // State: { [menuId]: { enabled: boolean, customName: string, sets: [{ weight: string, reps: string }] } }
    const [inputState, setInputState] = useState({});
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('trainerRecords') || '[]');
        setLogs(saved);

        // Initialize input state
        const initial = {};
        const defaultSets = Array(3).fill({ weight: '', reps: '10' });
        PREDEFINED_MENUS.forEach(m => {
            initial[m.id] = {
                enabled: false,
                customName: '',
                sets: JSON.parse(JSON.stringify(defaultSets)) // Deep copy
            };
        });
        setInputState(initial);
    }, []);

    // Generate Weight Options (2, 3, 5, 8, 10, 15, 20...)
    const weightOptions = [2, 3, 5, 8, 10];
    for (let i = 15; i <= 200; i += 5) {
        weightOptions.push(i);
    }

    const toggleMenu = (id) => {
        setInputState(prev => ({
            ...prev,
            [id]: { ...prev[id], enabled: !prev[id].enabled }
        }));
    };

    const handleSetChange = (menuId, setIndex, field, value) => {
        setInputState(prev => {
            const menuState = { ...prev[menuId] };
            const newSets = [...menuState.sets];
            newSets[setIndex] = { ...newSets[setIndex], [field]: value };
            menuState.sets = newSets;
            return { ...prev, [menuId]: menuState };
        });
    };

    const addSet = (menuId) => {
        setInputState(prev => {
            const menuState = { ...prev[menuId] };
            // Copy previous set values for convenience, or default
            const lastSet = menuState.sets[menuState.sets.length - 1];
            menuState.sets = [...menuState.sets, { weight: lastSet.weight, reps: lastSet.reps }];
            return { ...prev, [menuId]: menuState };
        });
    };

    const removeSet = (menuId, setIndex) => {
        setInputState(prev => {
            const menuState = { ...prev[menuId] };
            if (menuState.sets.length <= 1) return prev; // Don't remove last set
            menuState.sets = menuState.sets.filter((_, i) => i !== setIndex);
            return { ...prev, [menuId]: menuState };
        });
    };

    const handleCustomNameChange = (menuId, value) => {
        setInputState(prev => ({
            ...prev,
            [menuId]: { ...prev[menuId], customName: value }
        }));
    };

    const handleAddLogs = () => {
        const newLogs = [];
        const timestamp = new Date().toISOString();

        Object.entries(inputState).forEach(([id, state]) => {
            if (state.enabled) {
                const menuLabel = id === 'other' ? (state.customName || 'その他') : PREDEFINED_MENUS.find(m => m.id === id).label;

                // Filter out empty sets if needed, but for now take all
                const validSets = state.sets.map(s => ({
                    weight: s.weight ? parseFloat(s.weight) : 0,
                    reps: parseInt(s.reps) || 0
                }));

                newLogs.push({
                    id: Date.now() + Math.random(),
                    member: selectedMember,
                    date,
                    menu: menuLabel,
                    sets: validSets, // Saving array of sets
                    createdAt: timestamp
                });
            }
        });

        if (newLogs.length === 0) {
            alert('記録する種目を選択してください');
            return;
        }

        const updatedLogs = [...newLogs, ...logs];
        setLogs(updatedLogs);
        localStorage.setItem('trainerRecords', JSON.stringify(updatedLogs));

        // Reset enabled states
        setInputState(prev => {
            const next = {};
            const defaultSets = Array(3).fill({ weight: '', reps: '10' });
            PREDEFINED_MENUS.forEach(m => {
                // Keep values from previous entry if possible, or reset to 3 sets
                // For simplified UX, let's reset to 3 sets but maybe keep the weight of the last set?
                // The user request was "default is 3 sets". 
                // Let's reset to standard 3 sets default for now to be safe.
                next[m.id] = {
                    enabled: false,
                    customName: '',
                    sets: JSON.parse(JSON.stringify(defaultSets))
                };
            });
            return next;
        });

        alert(`${newLogs.length}件の記録を追加しました`);
    };

    const handleDeleteLog = (id) => {
        const updatedLogs = logs.filter(l => l.id !== id);
        setLogs(updatedLogs);
        localStorage.setItem('trainerRecords', JSON.stringify(updatedLogs));
    };

    // Filter logs for display
    const filteredLogs = logs.filter(l => l.member === selectedMember && l.date === date);

    return (
        <>
            <section className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <User size={20} color="var(--primary)" />
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>会員・日付選択</h2>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <label className="form-label">会員名</label>
                        <select
                            className="form-select"
                            value={selectedMember}
                            onChange={(e) => setSelectedMember(e.target.value)}
                        >
                            {MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className="form-label">日付</label>
                        <input
                            type="date"
                            className="form-input"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <section className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Dumbbell size={20} color="var(--accent)" />
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>トレーニング記録入力</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {PREDEFINED_MENUS.map(menu => {
                        const state = inputState[menu.id] || { enabled: false, sets: [] };

                        return (
                            <div key={menu.id} style={{
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                padding: '12px',
                                backgroundColor: state.enabled ? 'rgba(51, 217, 178, 0.05)' : 'white',
                                transition: 'all 0.2s'
                            }}>
                                {/* Header Row */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: state.enabled ? '12px' : 0 }}>
                                    <input
                                        type="checkbox"
                                        checked={state.enabled}
                                        onChange={() => toggleMenu(menu.id)}
                                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                    />
                                    <div style={{ fontWeight: state.enabled ? '700' : '500', flex: 1 }}>
                                        {menu.label}
                                        {menu.id === 'other' && state.enabled && (
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="種目名を入力"
                                                style={{ marginLeft: '12px', fontSize: '0.9rem', padding: '4px 8px', width: '200px', display: 'inline-block' }}
                                                value={state.customName}
                                                onChange={(e) => handleCustomNameChange(menu.id, e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Sets Rows */}
                                {state.enabled && (
                                    <div style={{ paddingLeft: '32px' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '60px 120px 80px 40px', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-sub)' }}>
                                            <div>セット</div>
                                            <div>重量</div>
                                            <div>回数</div>
                                            <div></div>
                                        </div>

                                        {state.sets.map((set, idx) => (
                                            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '60px 120px 80px 40px', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                                                <div style={{ fontWeight: 'bold', color: 'var(--text-sub)' }}>{idx + 1}</div>
                                                <div>
                                                    {menu.id === 'abdominal' ? (
                                                        <input type="text" className="form-input" value="-" disabled style={{ padding: '6px' }} />
                                                    ) : (
                                                        <select
                                                            className="form-select"
                                                            style={{ padding: '6px' }}
                                                            value={set.weight}
                                                            onChange={(e) => handleSetChange(menu.id, idx, 'weight', e.target.value)}
                                                        >
                                                            <option value="">-</option>
                                                            {weightOptions.map(w => (
                                                                <option key={w} value={w}>{w}kg</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>
                                                <div>
                                                    <input
                                                        type="number"
                                                        className="form-input"
                                                        style={{ padding: '6px' }}
                                                        value={set.reps}
                                                        onChange={(e) => handleSetChange(menu.id, idx, 'reps', e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    {state.sets.length > 1 && (
                                                        <button
                                                            onClick={() => removeSet(menu.id, idx)}
                                                            style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            onClick={() => addSet(menu.id)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                color: 'var(--primary)',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                marginTop: '4px',
                                                padding: '4px 0'
                                            }}
                                        >
                                            <Plus size={16} /> セットを追加
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        className="btn-primary"
                        onClick={handleAddLogs}
                        style={{ width: 'auto', padding: '12px 32px' }}
                    >
                        <Save size={20} style={{ marginRight: '8px' }} />
                        選択した項目を記録
                    </button>
                </div>
            </section>

            {/* Log List */}
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginTop: '24px', marginBottom: '12px', color: 'var(--text-sub)' }}>
                {selectedMember} 様 - {date} の記録
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredLogs.length === 0 ? (
                    <div style={{ padding: '16px', backgroundColor: 'var(--surface)', borderRadius: '8px', textAlign: 'center', color: 'var(--text-sub)' }}>
                        記録はまだありません
                    </div>
                ) : (
                    filteredLogs.map(log => (
                        <div key={log.id} style={{
                            backgroundColor: 'white',
                            padding: '16px',
                            borderRadius: '8px',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>{log.menu}</div>
                                <button onClick={() => handleDeleteLog(log.id)} style={{ padding: '4px', color: '#ef4444' }}>
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {/* Render sets */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {log.sets ? (
                                    log.sets.map((set, idx) => (
                                        <div key={idx} style={{
                                            backgroundColor: 'var(--surface)',
                                            padding: '4px 10px',
                                            borderRadius: '4px',
                                            fontSize: '0.9rem',
                                            border: '1px solid var(--border)'
                                        }}>
                                            <span style={{ color: 'var(--text-sub)', marginRight: '4px' }}>{idx + 1}:</span>
                                            <span style={{ fontWeight: '600' }}>{set.weight > 0 ? `${set.weight}kg` : '-'}</span>
                                            <span style={{ margin: '0 4px', color: 'var(--text-sub)' }}>x</span>
                                            <span style={{ fontWeight: '600' }}>{set.reps}回</span>
                                        </div>
                                    ))
                                ) : (
                                    // Compatibility for old format
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                                        {log.weight > 0 ? `${log.weight}kg × ` : ''}{log.reps > 0 ? `${log.reps}回 × ` : ''}{log.sets}セット
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};
