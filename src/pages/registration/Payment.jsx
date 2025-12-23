import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ChevronLeft, CreditCard } from 'lucide-react';

// Replace with your actual publishable key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
            alert("決済エラー: " + error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            // Process subscription on backend here
            navigate('/register/complete');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{
                padding: '16px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '24px',
                backgroundColor: '#fff'
            }}>
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} />
            </div>
            <button type="submit" className="btn-primary" disabled={!stripe}>
                ¥9,800/月 で登録する
            </button>
        </form>
    );
};

export default function Payment() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '8px' }}>
                <button onClick={() => navigate('/register/signature')}><ChevronLeft size={24} /></button>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '700' }}>お支払い情報の登録</h1>
            </header>

            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <CreditCard size={32} color="var(--primary)" />
                    <div>
                        <div style={{ fontWeight: '700' }}>クレジットカード決済</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Stripeによる安全な決済</div>
                    </div>
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
}
