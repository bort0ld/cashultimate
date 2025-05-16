export default async (req, res) => {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { product } = JSON.parse(req.body);
    
    console.log('[LOG] Trying to send:', product);
    console.log('[LOG] Using token:', process.env.TG_TOKEN?.slice(0, 6) + '...'); // Логируем часть токена

    const tgResponse = await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TG_CHAT_ID,
        text: `🆕 Новая заявка: ${product}\nВремя: ${new Date().toLocaleString()}`
      })
    });

    const tgData = await tgResponse.json();
    console.log('[LOG] Telegram response:', tgData);

    if (!tgResponse.ok) throw new Error(tgData.description || 'Unknown error');
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
