export default async (req, res) => {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { product } = JSON.parse(req.body);
    console.log('Продукт:', product);

    const response = await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TG_CHAT_ID,
        text: `🆕 Новый клик: ${product}\nВремя: ${new Date().toLocaleString()}`
      })
    });

    const data = await response.json();
    console.log('Ответ Telegram:', data);

    if (!response.ok) throw new Error(data.description || 'Ошибка API Telegram');
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: error.message });
  }
};