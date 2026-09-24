// Analytics is intentionally off unless NEXT_PUBLIC_ANALYTICS_ID is configured.
export function Analytics(){const id=process.env.NEXT_PUBLIC_ANALYTICS_ID;if(!id)return null;return <script async data-domain={id} src="https://plausible.io/js/script.js"/>}
