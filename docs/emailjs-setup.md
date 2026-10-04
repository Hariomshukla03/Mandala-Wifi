# EmailJS enquiry setup

1. Connect the business mailbox in your EmailJS dashboard and copy its Service ID.
2. Create an email template with the settings below and copy its Template ID.
3. Copy the Public Key from your EmailJS account settings. Do not use a private key or Gmail password.
4. Set these public values in `.env.local` (this file must stay out of Git):

```dotenv
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Restart `npm run dev`. For deployment, configure these build-time environment variables and rebuild.

## Template settings

- To Email: `mandalabroadband@gmail.com` (fixed in the dashboard, not a browser-controlled parameter).
- From Name: `Mandala Broadband Website`.
- From Email: use the connected service's default sender address.
- Reply To: `{{reply_to}}` (visitor email, or the business email when omitted).
- Subject: `New Mandala Broadband enquiry — {{name}} — {{pincode}}`.
- Content: paste the contents of `emailjs-template.html` in the template's HTML editor.

The frontend supplies `name`, `mobile`, `email`, `area`, `pincode`, `service`, `plan`, `message`, `reply_to` and `submitted_at`. Restrict allowed website origins to your production domain and localhost where your EmailJS account supports it. Enable provider anti-abuse protections before public launch; browser validation and a honeypot are not server-side security.

## Delivery test

Submit a clearly labelled test enquiry through the website. Check EmailJS history and the business mailbox, including spam. A green confirmation means EmailJS accepted the request; only mailbox receipt confirms delivery. Missing configuration or rejected requests display an error and keep the entered details. Do not publish until a real delivery test passes.
