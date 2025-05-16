export default async (req, res) => {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  // Обрабатываем OPTIONS-запрос
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Основная логика
  try {
    const { product } = req.body;
    
    const response = await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TG_CHAT_ID,
        text: `🤑 Новый клик: ${product}\nВремя: ${new Date().toLocaleString()}`
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.description);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
