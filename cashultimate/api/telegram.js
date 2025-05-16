export default async (req, res) => {
  const { product } = req.body;
  
  try {
    await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TG_CHAT_ID,
        text: `🤑 Новый клик: ${product}\nВремя: ${new Date().toLocaleString()}`
      })
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};