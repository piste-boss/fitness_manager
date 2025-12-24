import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Dumbbell, Utensils, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function CoachPage() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [trendSummary, setTrendSummary] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        analyzeDataAndInit();
    }, []);

    const analyzeDataAndInit = () => {
        // 1. Load Data
        const weights = JSON.parse(localStorage.getItem('weightRecords') || '{}');
        const calories = JSON.parse(localStorage.getItem('dailyCalories') || '{}');
        const userGoal = JSON.parse(localStorage.getItem('userGoal') || '{}');
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

        // 2. Analyze Trends (Last 7 days)
        const today = new Date();
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            dates.push(d.toISOString().split('T')[0]);
        }

        // Weight Trend
        // Find latest and oldest recorded weight in range
        const weightValues = Object.entries(weights)
            .sort((a, b) => new Date(a[0]) - new Date(b[0])) // Ascending date
            .filter(([date]) => dates.includes(date) || true) // Use all data for trend context if sparse
            .map(([_, val]) => val);

        let weightTrend = 'stable';
        let weightDiff = 0;

        if (weightValues.length >= 2) {
            const first = weightValues[0];
            const last = weightValues[weightValues.length - 1];
            weightDiff = last - first;
            if (weightDiff > 0.5) weightTrend = 'increase';
            if (weightDiff < -0.5) weightTrend = 'decrease';
        }

        // Calorie Avg
        const calorieValues = Object.values(calories);
        const avgCalories = calorieValues.length ? Math.round(calorieValues.reduce((a, b) => a + b, 0) / calorieValues.length) : 0;

        const summary = {
            weightTrend,
            weightDiff: weightDiff.toFixed(1),
            avgCalories,
            currentWeight: weightValues.length ? weightValues[weightValues.length - 1] : null
        };

        setTrendSummary(summary);

        // 3. Generate Initial Greeting based on trend
        let initialMessage = 'こんにちは！AIコーチです。\n';

        if (weightValues.length === 0) {
            initialMessage += 'まずは「体重記録」画面で現在の体重を記録しましょう！そうすれば、より的確なアドバイスができます。';
        } else {
            if (weightTrend === 'increase') {
                initialMessage += `最近、体重が **${summary.weightDiff}kg** 増加傾向にありますね💦\n今の摂取カロリーのペースだと少し多いかもしれません。`;
                if (avgCalories > 2000) {
                    initialMessage += `\n平均摂取カロリーが **${avgCalories}kcal** と高めです。おやつや夕食の炭水化物を少し見直してみましょう。`;
                }
            } else if (weightTrend === 'decrease') {
                initialMessage += `素晴らしいです！体重が **${Math.abs(summary.weightDiff)}kg** 減っていますね🎉\nこの調子で継続しましょう。無理はしすぎないでくださいね。`;
            } else {
                initialMessage += '体重は安定していますね。健康維持には素晴らしい状態です👍\nさらなる引き締めを目指すなら、運動強度を少し上げてみましょうか？';
            }

            initialMessage += '\n\n食事、運動、プロテインの選び方など、気になることがあれば何でも聞いてください！';
        }

        setMessages([{
            id: 1,
            role: 'ai',
            content: initialMessage
        }]);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (text) => {
        if (!text.trim()) return;

        // User Message
        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: text
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            let aiContent = '';

            // Simple keyword matching for mock response
            if (text.includes('食事') || text.includes('食材') || text.includes('レシピ')) {
                aiContent = `【おすすめの食事アドバイス】
体重管理には**高タンパク・低脂質**が基本です！

🥦 **おすすめ食材**:
- **鶏むね肉**: 皮なしで調理すると低カロリー。蒸し鶏やバンバンジーがおすすめ。
- **ブロッコリー**: ビタミンC豊富でボリュームもあります。
- **納豆・豆腐**: 手軽に植物性タンパク質が摂れます。

夜遅い食事は控えめにし、野菜から先に食べる「ベジファースト」を意識するだけでも効果がありますよ！`;
            } else if (text.includes('トレーニング') || text.includes('運動') || text.includes('筋トレ')) {
                aiContent = `【自宅でできるおすすめトレーニング】
隙間時間にできるメニューを提案します💪

1. **スクワット (15回 × 3セット)**
   - 下半身の大きな筋肉を鍛えることで代謝アップ！
2. **プランク (30秒 × 2セット)**
   - 体幹を鍛えてお腹周りを引き締めます。
3. **ヒップリフト (20回 × 2セット)**
   - 寝転がって腰を持ち上げる運動。お尻に効きます。

まずは「1日1種目」からでも続けてみましょう！`;
            } else if (text.includes('プロテイン')) {
                aiContent = `【プロテインの選び方】
目的に合わせて選びましょう🥤

- **ホエイプロテイン**: 吸収が早い。運動後におすすめ。
- **ソイプロテイン**: 吸収がゆっくりで腹持ちが良い。ダイエットや置き換えにおすすめ。
- **カゼインプロテイン**: 就寝前の補給に。

女性のダイエットなら、イソフラボンも摂れる**ソイプロテイン**が特におすすめです！フレーバーを変えて楽しむと飽きませんよ。`;
            } else {
                aiContent = `ご質問ありがとうございます！
その件については、詳しい情報を分析してトータルでサポートしますね。

他にも、
- 「太りにくいおやつは？」
- 「コンビニで選ぶなら？」
- 「モチベーションが続かない」
など、気軽に相談してください😊`;
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'ai',
                content: aiContent
            }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', paddingBottom: '90px' }}>
            <div className="page-header">
                <h1 className="page-title">AI コーチ</h1>
            </div>

            {/* Trend Summary Card */}
            {trendSummary && (
                <div className="card" style={{ padding: '16px', backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary)', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <TrendingUp size={20} color="var(--primary-dark)" />
                        <span style={{ fontWeight: '700', color: 'var(--primary-dark)' }}>Trend Analysis</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        現在の傾向: <strong>
                            {trendSummary.weightTrend === 'increase' ? '⚠️ 増加気味' :
                                trendSummary.weightTrend === 'decrease' ? '✨ 順調に減少中' : '🔵 キープ中'}
                        </strong>
                    </div>
                </div>
            )}

            {/* Chat Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 4px' }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{
                        display: 'flex',
                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: '16px',
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        {msg.role === 'ai' && (
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--accent)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '8px',
                                flexShrink: 0,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                <Bot size={24} color="white" />
                            </div>
                        )}

                        <div style={{ maxWidth: '85%' }}>
                            <div style={{
                                backgroundColor: msg.role === 'user' ? 'var(--primary)' : 'white',
                                color: msg.role === 'user' ? 'white' : 'var(--text-main)',
                                padding: '16px',
                                borderRadius: msg.role === 'user' ? '16px 16px 0 16px' : '0 16px 16px 16px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                whiteSpace: 'pre-wrap',
                                lineHeight: '1.6'
                            }}>
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent)', opacity: 0.5 }} />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>入力中...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions (if empty input) */}
            {!inputText && (
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    padding: '8px 0',
                    marginBottom: '8px',
                    scrollbarWidth: 'none'
                }}>
                    {[
                        { label: 'おすすめ食材', icon: Utensils },
                        { label: '自宅トレーニング', icon: Dumbbell },
                        { label: 'プロテインについて', icon: CheckCircle }
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSendMessage(item.label + 'を教えて')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 16px',
                                backgroundColor: 'white',
                                border: '1px solid var(--border)',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                whiteSpace: 'nowrap',
                                color: 'var(--text-main)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}
                        >
                            <item.icon size={16} />
                            {item.label}
                        </button>
                    ))}
                </div>
            )}

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
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="ダイエットの悩みを相談..."
                    style={{
                        flex: 1,
                        padding: '12px 16px',
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
                        padding: '12px',
                        borderRadius: '50%',
                        backgroundColor: inputText.trim() ? 'var(--accent)' : 'var(--input-bg)',
                        color: inputText.trim() ? 'white' : 'var(--text-sub)',
                        transition: 'all 0.2s',
                        cursor: inputText.trim() ? 'pointer' : 'default',
                        boxShadow: inputText.trim() ? '0 4px 12px rgba(51, 217, 178, 0.4)' : 'none'
                    }}
                >
                    <Send size={20} />
                </button>
            </div>

        </div>
    );
}
