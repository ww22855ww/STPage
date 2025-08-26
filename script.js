document.getElementById('fetch-data-btn').addEventListener('click', async () => {
    const tableBody = document.getElementById('vendor-table').getElementsByTagName('tbody')[0];
    const button = document.getElementById('fetch-data-btn');
    const apiUrl = 'http://srm.ecs.com.tw:8012/api/reports/new-vendor-list';

    // Reset table and show loading state
    tableBody.innerHTML = '<tr><td colspan="6" class="text-center">正在載入資料...</td></tr>';
    button.disabled = true;
    button.textContent = '載入中...';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP 錯誤! 狀態: ${response.status}`);
        }

        const vendorData = await response.json();

        // Clear loading message
        tableBody.innerHTML = '';

        // Populate the table
        vendorData.forEach(vendor => {
            let row = tableBody.insertRow();
            row.insertCell(0).textContent = vendor.BU;
            row.insertCell(1).textContent = vendor.VENDOR_CODE;
            row.insertCell(2).textContent = vendor.VENDOR_NAME;
            row.insertCell(3).textContent = new Date(vendor.CREATION_DATE).toLocaleDateString();
            row.insertCell(4).textContent = vendor.VENDOR_TYPE_NAME;
            row.insertCell(5).textContent = vendor.CREATED_BY;
        });

    } catch (error) {
        console.error('無法獲取資料:', error);
        // Display error message in the table
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">資料載入失敗。請檢查瀏覽器開發人員工具(F12)的 Console 以了解詳細的錯誤資訊(可能是 CORS 問題)。</td></tr>`;
    } finally {
        // Re-enable the button
        button.disabled = false;
        button.textContent = '取得資料';
    }
});