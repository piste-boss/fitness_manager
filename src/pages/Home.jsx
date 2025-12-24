import React, { useState, useEffect } from 'react';
import { Bell, Calendar, MessageCircle, ChevronRight, User } from 'lucide-react';
import GoalModal from '../components/GoalModal';
// import GoalDisplay from '../components/GoalDisplay';

const NEWS_DATA = [
    { id: 1, date: '2025.12.20', title: '年末年始の営業について', category: '重要' },
    { id: 2, date: '2025.12.15', title: '新しいヨガクラスが始まります！', category: 'News' },
    { id: 3, date: '2025.12.10', title: 'お友達紹介キャンペーン実施中', category: 'Campaign' },
];

const ActionButton = ({ icon: Icon, title, subtitle, color, href, external }) => (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} style={{
        backgroundColor: color,
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        marginBottom: '16px',
        textDecoration: 'none'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '12px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon size={24} />
            </div>
            <div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{title}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{subtitle}</div>
            </div>
        </div>
        <ChevronRight size={20} />
    </a>
);

export default function Home() {
    const [goal, setGoal] = useState(null);
    // const [isModalOpen, setIsModalOpen] = useState(false); // No longer needed

    useEffect(() => {
        const savedGoal = localStorage.getItem('userGoal');
        if (savedGoal) {
            setGoal(JSON.parse(savedGoal));
        }
    }, []);

    const handleSaveGoal = (newGoal) => {
        setGoal(newGoal);
        localStorage.setItem('userGoal', JSON.stringify(newGoal));
    };

    return (
        <div className="container">
            {/* Header */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                paddingTop: '12px'
            }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>
                    <span style={{ color: 'var(--primary)' }}>Piste</span> Fitness
                </h1>
                <div style={{ position: 'relative' }}>
                    <Bell size={24} color="var(--text-main)" />
                    <span style={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'var(--error)',
                        borderRadius: '50%',
                        border: '2px solid white'
                    }} />
                </div>
            </header>

            {/* Removed GoalDisplay as requested */}
            {/* <GoalDisplay goal={goal} onEdit={() => setIsModalOpen(true)} /> */}

            {/* GoalModal is now always displayed */}
            <GoalModal
                isOpen={true} // Always open
                onClose={() => { }} // No-op
                onSave={handleSaveGoal}
            />

            {/* Quick Actions */}
            <section style={{ marginBottom: '32px' }}>
                <div className="section-title">クイックアクション</div>
                <ActionButton
                    icon={User}
                    title="新規入会手続き"
                    subtitle="オンラインで完結"
                    color="#a29bfe"
                    href="/register"
                />
                <ActionButton
                    icon={Calendar}
                    title="オンライン予約"
                    subtitle="Reservaで簡単予約"
                    color="#FF8BA7"
                    href="https://reserva.be/" // Placeholder
                    external
                />
                <ActionButton
                    icon={MessageCircle}
                    title="LINEでお問合せ"
                    subtitle="気軽にご質問ください"
                    color="#33D9B2"
                    href="https://line.me/" // Placeholder
                    external
                />
            </section>

            {/* News */}
            <section>
                <div className="section-title">お知らせ</div>
                <div className="card" style={{ padding: '0' }}>
                    {NEWS_DATA.map((item, index) => (
                        <div key={item.id} style={{
                            padding: '16px',
                            borderBottom: index < NEWS_DATA.length - 1 ? '1px solid var(--border)' : 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                                <span style={{
                                    backgroundColor: item.category === '重要' ? 'var(--error)' : 'var(--primary-light)',
                                    color: item.category === '重要' ? 'white' : 'var(--primary-dark)',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontWeight: '700',
                                    fontSize: '0.7rem'
                                }}>{item.category}</span>
                                {item.date}
                            </div>
                            <div style={{ fontWeight: '500' }}>{item.title}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
