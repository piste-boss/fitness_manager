import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Terms() {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ paddingBottom: '100px' }}>
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '8px' }}>
                <button onClick={() => navigate('/register/form')}><ChevronLeft size={24} /></button>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '700' }}>利用規約の確認</h1>
            </header>

            <div className="card" style={{ height: '60vh', overflowY: 'auto', padding: '16px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <h2 style={{ fontSize: '1rem', marginBottom: '16px' }}>利用規約</h2>
                <div style={{ marginBottom: '24px' }}>
                    <ol style={{ paddingLeft: '20px', margin: 0 }}>
                        <li style={{ marginBottom: '8px' }}>利用者は自己の責任負担に置いて、他利用者と協調して当施設を利用するものとする</li>
                        <li style={{ marginBottom: '8px' }}>
                            当施設は当施設利用中に生じた、怪我、盗難、その他の事故について当施設の責めに帰すべき事由がない限り責任は負いません。<br />
                            利用者、同伴者同士の施設内外でのトラブルも同様とします。
                        </li>
                        <li style={{ marginBottom: '8px' }}>当施設内は全て禁煙とします。</li>
                        <li style={{ marginBottom: '8px' }}>
                            禁止行為
                            <ul style={{ paddingLeft: '20px', marginTop: '4px', listStyleType: 'disc' }}>
                                <li>会員証の第三者への貸与、第三者の会員証の使用</li>
                                <li>スマートキー等を使って非月額会員を故意に入場させる行為、第三者とのスマートキーの貸借り</li>
                                <li>非会員を入場させる、第三者の会員証を利用した事が発覚した場合、会員と同等の金額をお支払いいただきます。</li>
                                <li>故意に設備を破壊する行為</li>
                                <li>当施設の物品を許可なく持ち帰ること</li>
                            </ul>
                        </li>
                        <li style={{ marginBottom: '8px' }}>前月の12日に月額会費を引き落としします。（12日が土日祝日の場合は銀行の翌営業日）</li>
                        <li style={{ marginBottom: '8px' }}>当店の定める退会休会規約に同意していただく必要があります。</li>
                        <li style={{ marginBottom: '8px' }}>会費の滞納、支払い催促にも応じない場合は会員資格を剥奪する場合があります。</li>
                        <li style={{ marginBottom: '8px' }}>当施設は保育、託児施設ではありません。見守りスタッフは配置しますがお客様の責任の範囲内で利用をお願いします。</li>
                        <li style={{ marginBottom: '8px' }}>当店定休日等のスタッフ不在時におけるキッズエリアの利用はお客様の責任の範囲内でお願いします。</li>
                        <li style={{ marginBottom: '8px' }}>上記規約に違反が見られた場合、会員資格を剥奪する場合があります。</li>
                        <li style={{ marginBottom: '8px' }}>一度入金頂いた会費は如何なる場合も返金しません。</li>
                        <li style={{ marginBottom: '8px' }}>防犯上の都合で店内と裏口を常時録画しております。</li>
                        <li style={{ marginBottom: '8px' }}>本規約はお客様の同意なしに変更できるものとします。</li>
                        <li style={{ marginBottom: '8px' }}>お客様より退会の申し出がない限り、契約は自動更新されます。</li>
                        <li style={{ marginBottom: '8px' }}>妊娠中も当店を利用いただけますが無理のない範囲でのご利用をお願いいたします。</li>
                    </ol>
                </div>

                <h2 style={{ fontSize: '1rem', marginBottom: '16px', marginTop: '32px' }}>注意事項</h2>
                <div style={{ marginBottom: '24px' }}>
                    <p style={{ marginBottom: '8px' }}>以下の項目に該当する方のご入会・ご利用をお断りすることがあります。</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li>（1）暴力団関係者</li>
                        <li>（2）本クラブの諸規則を遵守しない方</li>
                        <li>（3）医師等により運動を禁じられている方</li>
                        <li>（4）伝染病、その他、他人に伝染又は感染する恐れのある疾病を有する方</li>
                        <li>（5）酒気を帯びている方</li>
                        <li>（6）当施設が不適当と認めた方</li>
                        <li>（8）その他施設を利用することが困難であると当施設が認めた方</li>
                    </ul>
                </div>

                <h2 style={{ fontSize: '1rem', marginBottom: '16px', marginTop: '32px' }}>退会規約</h2>
                <div style={{ marginBottom: '24px' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '4px' }}>（1）退会後1年間は各種割引キャンペーンはご利用いただけません。</li>
                        <li style={{ marginBottom: '4px' }}>（2）各種割引キャンペーンをご利用された場合、当店の定める利用条件を満たさずに退会された場合、違約金（割引金額+税）を請求させていただきます。</li>
                    </ul>
                </div>

                <h2 style={{ fontSize: '1rem', marginBottom: '16px', marginTop: '32px' }}>休会規約</h2>
                <div style={{ marginBottom: '24px' }}>
                    <p style={{ marginBottom: '12px' }}>
                        お子様の妊娠、病気、家庭の事情、長期出張等の理由で止むを得ず一時的に当店利用ができなくなる場合、
                        当店の休会制度をご利用いただけます。
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                        休会いただくと、月額会費の引き落としがない代わりに休会費用1000円+税を引き落としさせて頂きます。<br />
                        休会し、復帰いただく際は入会金の費用は不要となります。
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                        休会中のスマートキーのご利用が発覚した際は、
                        休会解除と判断し、月額会費を引き落としさせていただきます。<br />
                        休会中はイベント等のオプションサービスをご利用いただけますが、非会員様と同等の料金となります。
                    </p>
                </div>

                <h2 style={{ fontSize: '1rem', marginBottom: '16px', marginTop: '32px' }}>入会キャンペーンご利用条件</h2>
                <div style={{ marginBottom: '24px' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '4px' }}>（1）特典1のご利用のみのご利用は4ヶ月間のご利用をお願いします。</li>
                        <li style={{ marginBottom: '4px' }}>（2）特典1、2をご利用の際は最低6ヶ月間のご利用をお願いします。</li>
                        <li style={{ marginBottom: '4px' }}>（3）上記項目のご利用とはご契約いただいたプランの月数の支払いを指し、休会は対象外です。</li>
                    </ul>
                </div>
            </div>

            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '24px', backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', maxWidth: '600px', margin: '0 auto' }}>
                <button className="btn-primary" onClick={() => navigate('/register/signature')}>
                    同意して次へ
                </button>
            </div>
        </div>
    );
}
