import React, { useState, useEffect, useRef } from 'react';
import { Send, Camera, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';

export default function MealPage() {
    // Stats & Goals
    const [stats, setStats] = useState({
        targetCalories: 2000,
        consumedCalories: 0,
        remainingCalories: 2000
    });

    // Chat State
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'ai',
            content: 'こんにちは！AI栄養士です。毎日の食事をサポートします。\n今の食事の写真を送ってください。カロリーと栄養バランスを分析します。'
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // Initialize - Load User Data & Calculate Goal
    useEffect(() => {
        const userGoal = JSON.parse(localStorage.getItem('userGoal') || '{}');
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

        if (userGoal.weight && userProfile.height) {
            // Calculate BMR (Harris-Benedict Equation for Women - simplified assumption)
            // BMR = 655 + (9.6 × weight in kg) + (1.8 × height in cm) - (4.7 × age in years)
            // Assuming age 35 if not provided (Target: "Mama")
            const imgWeight = parseFloat(userGoal.weight);
            const imgHeight = parseFloat(userProfile.height);
            const age = 35;

            let bmr = 655 + (9.6 * imgWeight) + (1.8 * imgHeight) - (4.7 * age);

            // Activity Factor
            // Sedentary (desk work): 1.2
            // Lightly active (housework): 1.375
            // Moderately active (standing/walking): 1.55 or more
            let activityFactor = 1.2;
            if (userProfile.lifestyle === 'housework_childcare') activityFactor = 1.35;
            if (userProfile.lifestyle === 'standing_work') activityFactor = 1.5;

            // Add walking bonus
            if (userProfile.walking) activityFactor += 0.1;

            const tdee = Math.round(bmr * activityFactor);

            // Adjust for Deadline (Weight Loss Goal)
            // Simple logic: If we have a deadline, assume we need a moderate deficit if current > target
            // Since we don't have current weight, we'll set the maintenance of TARGET weight as the goal (safe bet)

            setStats({
                targetCalories: tdee,
                consumedCalories: 0,
                remainingCalories: tdee
            });
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (text, image = null) => {
        if (!text && !image) return;

        // User Message
        const tempId = Date.now();
        const userMessage = {
            id: tempId,
            role: 'user',
            content: text,
            image: image
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Mock AI Response Delay
        setTimeout(() => {
            let aiContent = '';
            let newCalories = 0;

            if (image) {
                // Mock Image Analysis
                newCalories = 450;
                aiContent = `写真ありがとうございます！美味しそうですね。\n
**分析結果**:
- チキンソテー: 250kcal
- サラダ: 50kcal
- ご飯（小盛）: 150kcal
合計: **約450kcal** です。

タンパク質がしっかり摂れていて素晴らしいです！夕食は少し軽めにすると目標達成に近づきますよ。`;

                // Recommendation based on remaining calories (mock logic)
                const remaining = stats.remainingCalories - 450;
                if (remaining < 500) {
                    aiContent += `\n\n【おすすめの食材】\n残りカロリーが少なめなので、**豆腐**、**鶏むね肉**、**きのこ類**などを使ったボリュームがありつつ低カロリーな食材がおすすめです。`;
                } else {
                    aiContent += `\n\n【おすすめの食材】\nまだ余裕がありますね。**青魚**や**アボカド**など、良質な脂質を含む食材を取り入れてみましょう！`;
                }

            } else {
                aiContent = '承知しました。他には何か食べましたか？\n不明な点があれば「写真」を送っていただけるとより正確に計算できます。';
            }

            const aiMessage = {
                id: Date.now() + 1,
                role: 'ai',
                content: aiContent
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);

            if (newCalories > 0) {
                setStats(prev => ({
                    ...prev,
                    consumedCalories: prev.consumedCalories + newCalories,
                    remainingCalories: prev.remainingCalories - newCalories
                }));
            }
        }, 1500); // 1.5s delay
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleSendMessage('食事を記録しました', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container" style={{ paddingBottom: '90px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Header / Stats Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                zIndex: 50,
                padding: '16px',
                borderBottom: '1px solid var(--border)',
                maxWidth: '600px', // Match main layout
                margin: '0 auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>食事管理 AI</h1>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                        目標: {stats.targetCalories}kcal
                    </div>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{
                        width: `${Math.min((stats.consumedCalories / stats.targetCalories) * 100, 100)}%`,
                        height: '100%',
                        backgroundColor: stats.remainingCalories < 0 ? 'var(--error)' : 'var(--primary)',
                        transition: 'width 0.5s ease'
                    }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span>摂取: <strong>{stats.consumedCalories}</strong> kcal</span>
                    <span style={{ color: stats.remainingCalories < 0 ? 'var(--error)' : 'var(--primary)' }}>
                        残り: <strong>{stats.remainingCalories}</strong> kcal
                    </span>
                </div>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, overflowY: 'auto', paddingTop: '110px', paddingBottom: '16px', paddingLeft: '4px', paddingRight: '4px' }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{
                        display: 'flex',
                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: '16px',
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        {msg.role === 'ai' && (
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary-light)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '8px',
                                flexShrink: 0
                            }}>
                                <Sparkles size={20} color="var(--primary)" />
                            </div>
                        )}

                        <div style={{ maxWidth: '80%' }}>
                            <div style={{
                                backgroundColor: msg.role === 'user' ? 'var(--primary)' : 'white',
                                color: msg.role === 'user' ? 'white' : 'var(--text-main)',
                                padding: '12px 16px',
                                borderRadius: msg.role === 'user' ? '16px 16px 0 16px' : '0 16px 16px 16px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                whiteSpace: 'pre-wrap',
                                lineHeight: '1.5'
                            }}>
                                {msg.image && (
                                    <img
                                        src={msg.image}
                                        alt="Uploaded meal"
                                        style={{
                                            width: '100%',
                                            borderRadius: '8px',
                                            marginBottom: '8px',
                                            maxHeight: '200px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                )}
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary-light)',
                            marginRight: '8px',
                            flexShrink: 0
                        }} />
                        <div style={{
                            backgroundColor: 'white',
                            padding: '12px',
                            borderRadius: '0 16px 16px 16px',
                            color: 'var(--text-sub)',
                            fontSize: '0.9rem'
                        }}>
                            入力中...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
                position: 'fixed',
                bottom: 'calc(var(--nav-height) + var(--safe-area-bottom))',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                padding: '12px',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                maxWidth: '600px',
                margin: '0 auto',
                zIndex: 40
            }}>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                        padding: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-sub)',
                        transition: 'all 0.2s'
                    }}
                >
                    <Camera size={24} />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />

                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="メッセージを入力..."
                    style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: '24px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--input-bg)',
                        outline: 'none',
                        fontSize: '1rem'
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                />

                <button
                    onClick={() => handleSendMessage(inputText)}
                    disabled={!inputText.trim()}
                    style={{
                        padding: '10px',
                        borderRadius: '50%',
                        backgroundColor: inputText.trim() ? 'var(--primary)' : 'var(--input-bg)',
                        color: inputText.trim() ? 'white' : 'var(--text-sub)',
                        transition: 'all 0.2s',
                        cursor: inputText.trim() ? 'pointer' : 'default'
                    }}
                >
                    <Send size={20} />
                </button>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
