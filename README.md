# Mandala-Wifi

Production-oriented marketing website for Mandala Broadband, a fiber internet provider in Surat.

## Run locally

```bash
npm install
npm run dev
```

## Before launch

- Replace all `.example` contact details and `https://mandalabroadband.example`.
- Replace placeholder metrics, testimonials and local coverage data with verified business data.
- Add a compressed H.264 hero video at `public/videos/hero.mp4` if desired; the generated poster is the intentional fallback.
- Review the privacy policy and terms with qualified legal counsel.
- Confirm plan prices, taxes, installation, router and static-IP terms.
- Configure `NEXT_PUBLIC_ANALYTICS_ID` only after consent/privacy review.
- Configure Nodemailer with `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_EMAIL`, and `ENQUIRY_TO_EMAIL`. The authenticated mailbox is the sender; a visitor-provided email is safely used as `Reply-To`, so replying from your inbox goes to the lead. The form reports success only after SMTP accepts the email.

## Generated visual

`public/images/hero-poster.png` was generated for this project using the built-in image generation tool. Prompt direction: premium wide Surat-inspired night cityscape, electric-blue fiber paths, deep navy palette, copy-safe space, no text or logos.

`public/videos/hero.mp4` is an optimized local background loop derived from [this free Pexels network clip](https://www.pexels.com/video/futuristic-glowing-blue-network-grid-visualization-34162507/) by Nicola Narracci. It is muted, lazy-loaded, paused off-screen and replaced by the poster when reduced motion or reduced data is requested.
