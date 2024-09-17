// src/components/TurnstileWidget.tsx
import React, { useEffect } from 'react';

interface TurnstileWidgetProps {
  onToken: (token: string) => void;
}

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ onToken }) => {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    document.body.appendChild(script);

    const handleToken = (event: any) => {
      onToken(event.detail.token);
    };

    window.addEventListener('cf-turnstile-token', handleToken);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('cf-turnstile-token', handleToken);
    };
  }, [onToken]);

  return (
    <div
      className="cf-turnstile"
      data-sitekey={siteKey}
      data-callback="onSuccess"
    ></div>
  );
};

export default TurnstileWidget;