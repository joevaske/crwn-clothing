import React  from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HwSWLGvSFafqQhlzia9xYAOy0Xr6kRJnUUDE3sPZ8l8wtv9uQbKDcRNkZKHYfBXEPHi8DTzMhLqt9YX21mXiL7w00AayeJj77';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }
    
    return (
        <StripeCheckout 
            label='Pay Now'
            name = 'CRWN Clothing Ltd. '
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel = 'Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
} 

export default StripeCheckoutButton;