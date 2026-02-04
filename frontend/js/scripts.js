async function sendOrder() {
    const nameField = document.getElementById('name');
    const cakeField = document.getElementById('cake');
    const weightField = document.getElementById('weight');

    const data = {
        customer_name: nameField.value,
        cake_type: cakeField.value,
        weight: parseFloat(weightField.value)
    };

    try {
        const response = await fetch('http://localhost:8000/submit_order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            // Очищуємо форму після успіху
            nameField.value = '';
            weightField.value = '';
        } else {
            alert("Помилка при відправці замовлення");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Не вдалося з'єднатися з сервером");
    }
}