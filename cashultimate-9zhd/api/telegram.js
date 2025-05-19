<script>
    // Удалить ВСЕ предыдущие скрипты и вставить этот
    document.addEventListener('DOMContentLoaded', () => {
        // Инициализация фильтров
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Логика фильтрации
                if (this.classList.contains('age-btn')) {
                    document.querySelectorAll('.age-btn').forEach(b => b.classList.remove('active'));
                } else {
                    document.querySelectorAll('.section-btn').forEach(b => b.classList.remove('active'));
                }
                this.classList.add('active');

                const age = document.querySelector('.age-btn.active')?.dataset.age || '18';
                const section = document.querySelector('.section-btn.active')?.dataset.section || 'debit';

                document.querySelectorAll('.products-container').forEach(el => {
                    el.classList.remove('active');
                });
                
                const activeContainer = document.getElementById(`${section}-${age}`);
                if (activeContainer) activeContainer.classList.add('active');
            });
        });

        // Обработчик для кнопок
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const product = this.dataset.product || 'Unknown';
                const url = this.href;

                // Отправка в Telegram
                fetch(`https://api.telegram.org/bot7450440430:AAF2YaabBn8HXVCNhfNxP3d0zxkEVDVRmNk/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: "1105067674",
                        text: `Новая заявка: ${product}`
                    })
                }).catch(() => {});

                // Открытие ссылки
                window.open(url, '_blank');
            });
        });
    });
</script>