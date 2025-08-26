// WMO Weather interpretation codes (https://open-meteo.com/en/docs)
const WEATHER_CODES = {
    0: "晴朗", 1: "大致晴朗", 2: "部分多雲", 3: "陰天",
    45: "霧", 48: "凍霧",
    51: "毛毛雨: 輕微", 53: "毛毛雨: 中等", 55: "毛毛雨: 強",
    56: "凍毛毛雨: 輕微", 57: "凍毛毛雨: 強",
    61: "雨: 輕微", 63: "雨: 中等", 65: "雨: 強",
    66: "凍雨: 輕微", 67: "凍雨: 強",
    71: "雪: 輕微", 73: "雪: 中等", 75: "雪: 強",
    77: "雪粒",
    80: "陣雨: 輕微", 81: "陣雨: 中等", 82: "陣雨: 猛烈",
    85: "陣雪: 輕微", 86: "陣雪: 強",
    95: "雷暴: 輕微或中等",
    96: "雷暴伴有輕微冰雹", 99: "雷暴伴有強冰雹"
};

document.getElementById('fetch-weather-btn').addEventListener('click', async () => {
    const tableBody = document.getElementById('weather-table').getElementsByTagName('tbody')[0];
    const button = document.getElementById('fetch-weather-btn');
    // API for Taipei from Open-Meteo
    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=25.0478&longitude=121.5319&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTaipei';

    tableBody.innerHTML = '<tr><td colspan="4">正在載入天氣資料...</td></tr>';
    button.disabled = true;
    button.textContent = '載入中...';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        tableBody.innerHTML = ''; // Clear loading message

        const daily = data.daily;
        for (let i = 0; i < daily.time.length; i++) {
            let row = tableBody.insertRow();
            row.insertCell(0).textContent = daily.time[i];
            row.insertCell(1).textContent = daily.temperature_2m_max[i];
            row.insertCell(2).textContent = daily.temperature_2m_min[i];
            const weatherDescription = WEATHER_CODES[daily.weathercode[i]] || "未知";
            row.insertCell(3).textContent = weatherDescription;
        }

    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        tableBody.innerHTML = `<tr><td colspan="4" class="text-danger">天氣資料載入失敗: ${error.message}</td></tr>`;
    } finally {
        button.disabled = false;
        button.textContent = '取得未來 7 天天氣';
    }
});