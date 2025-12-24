import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, Clock, Flame, MapPin } from 'lucide-react';

export default function ExercisePage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [records, setRecords] = useState({});

    // Form State
    const [menu, setMenu] = useState('');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState('');

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('exerciseRecords') || '{}');
        setRecords(saved);
    }, []);

    const saveRecords = (newRecords) => {
        setRecords(newRecords);
        localStorage.setItem('exerciseRecords', JSON.stringify(newRecords));
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const changeMonth = (offset) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
        setCurrentDate(new Date(newDate));
    };

    const handleAdd = () => {
        if (!menu || !duration) return;

        const newRecord = {
            id: Date.now(),
            menu,
            duration: parseInt(duration),
            calories: calories ? parseInt(calories) : 0
        };

        const newRecords = { ...records };
        if (!newRecords[selectedDate]) newRecords[selectedDate] = [];
        newRecords[selectedDate].push(newRecord);

        saveRecords(newRecords);
        setMenu('');
        setDuration('');
        setCalories('');
    };

    const handleDelete = (id) => {
        const newRecords = { ...records };
        newRecords[selectedDate] = newRecords[selectedDate].filter(r => r.id !== id);
        saveRecords(newRecords);
    };

    const handleCheckIn = () => {
        const checkInRecord = {
            id: Date.now(),
            menu: 'チェックイン',
            duration: 60, // Default to 60mins? or 0. Let's say 60 as a placeholder for a session
            calories: 0
        };

        const newRecords = { ...records };
        if (!newRecords[selectedDate]) newRecords[selectedDate] = [];
        newRecords[selectedDate].push(checkInRecord);

        saveRecords(newRecords);
        alert(`${selectedDate}にチェックインしました！`);
    };

    const { days, firstDay } = getDaysInMonth(currentDate);
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

    // Calendar Grid Generation
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(<div key={`empty-${i}`} style={{ height: '40px' }} />);
    }
    for (let i = 1; i <= days; i++) {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const isSelected = selectedDate === dateStr;
        const hasRecord = records[dateStr] && records[dateStr].length > 0;

        calendarDays.push(
            <div
                key={i}
                onClick={() => setSelectedDate(dateStr)}
                style={{
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                    color: isSelected ? 'white' : 'var(--text-main)',
                    fontWeight: isSelected ? '700' : 'normal',
                    position: 'relative',
                    fontSize: '0.9rem'
                }}
            >
                {i}
                {hasRecord && !isSelected && (
                    <div style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary)',
                        position: 'absolute',
                        bottom: '4px'
                    }} />
                )}
            </div>
        );
    }

    const selectedRecords = records[selectedDate] || [];

    return (
        <div className="container" style={{ paddingBottom: '90px' }}>
            <div className="page-header">
                <h1 className="page-title">運動記録</h1>
            </div>

            {/* Calendar Card */}
            <div className="card">
                {/* Month Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <button onClick={() => changeMonth(-1)} className="btn-back"><ChevronLeft size={20} /></button>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                        {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
                    </span>
                    <button onClick={() => changeMonth(1)} className="btn-back"><ChevronRight size={20} /></button>
                </div>

                {/* Days Header */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                    <div style={{ color: 'var(--error)' }}>日</div>
                    <div>月</div>
                    <div>火</div>
                    <div>水</div>
                    <div>木</div>
                    <div>金</div>
                    <div style={{ color: '#3b82f6' }}>土</div>
                </div>

                {/* Calendar Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: '8px' }}>
                    {calendarDays}
                </div>
            </div>

            {/* Check-in Button */}
            <button
                className="btn-primary"
                onClick={handleCheckIn}
                style={{
                    marginTop: '24px',
                    backgroundColor: 'var(--accent)', // Distinct color
                    boxShadow: '0 4px 12px rgba(51, 217, 178, 0.4)'
                }}
            >
                <MapPin size={24} style={{ marginRight: '8px' }} />
                チェックイン
            </button>

            {/* Daily Records */}
            <div style={{ marginTop: '24px' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {selectedDate.replace('-', '年 ').replace('-', '月 ')}日 の記録
                    <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-sub)', backgroundColor: 'var(--background)', padding: '2px 8px', borderRadius: '12px' }}>
                        合計 {selectedRecords.reduce((acc, curr) => acc + curr.duration, 0)}分
                    </span>
                </h2>

                {selectedRecords.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-sub)', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border)' }}>
                        記録はありません
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {selectedRecords.map((record) => (
                            <div key={record.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px',
                                backgroundColor: 'white',
                                borderRadius: 'var(--radius-sm)',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <div>
                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{record.menu}</div>
                                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-sub)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={14} /> {record.duration}分
                                        </span>
                                        {record.calories > 0 && (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f97316' }}>
                                                <Flame size={14} /> {record.calories}kcal
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(record.id)}
                                    style={{ color: 'var(--text-sub)', padding: '8px' }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add Form */}
                <div style={{ marginTop: '24px', backgroundColor: 'var(--surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px' }}>記録を追加</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="メニュー名 (例: ランニング)"
                            value={menu}
                            onChange={(e) => setMenu(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="時間 (分)"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="カロリー (任意)"
                                    value={calories}
                                    onChange={(e) => setCalories(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            className="btn-primary"
                            onClick={handleAdd}
                            disabled={!menu || !duration}
                            style={{
                                opacity: (!menu || !duration) ? 0.5 : 1,
                                marginTop: '8px'
                            }}
                        >
                            <Plus size={20} style={{ marginRight: '8px' }} />
                            追加する
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
