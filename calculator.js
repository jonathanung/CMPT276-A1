document.getElementById('add-row').addEventListener('click', addRow);
document.querySelector('.buttons button:nth-child(1)').addEventListener('click', calculateWeighted);
document.querySelector('.buttons button:nth-child(2)').addEventListener('click', calculateMean);
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updatePercent);
});

function addRow() {
    let table = document.querySelector('table tbody');
    let row = document.createElement('tr');
    row.innerHTML = `
        <td>Activity ${table.rows.length + 1}</td>
        <td>A${table.rows.length + 1}</td>
        <td><input type="text" size="1" class="weight"></td>
        <td><input type="text" size="1" class="score"> / <input type="text" size="1" class="max-score"></td>
        <td class="percent"></td>
    `;
    table.appendChild(row);
    let inputs = row.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', updatePercent);
    });
}

function updatePercent() {
    let rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        let grade = row.querySelector('.score').value;
        let maxGrade = row.querySelector('.max-score').value;
        let percentCell = row.querySelector('.percent');
        if (grade && maxGrade) {
            let percent = (parseFloat(grade) / parseFloat(maxGrade)) * 100;
            percentCell.textContent = `${percent.toFixed(2)}%`;
        } else {
            percentCell.textContent = '';
        }
    });
}

function calculateMean() {
    let rows = document.querySelectorAll('table tbody tr');
    let total = 0;
    let count = 0;
    rows.forEach(row => {
        let grade = row.querySelector('.score').value;
        let maxGrade = row.querySelector('.max-score').value;
        if (grade && maxGrade) {
            let percent = (parseFloat(grade) / parseFloat(maxGrade)) * 100;
            total += percent;
            count++;
        }
    });
    let mean = total / count;
    document.getElementById('result-text').innerHTML = `Mean of grades: ${mean.toFixed(2)}%`;
}
function calculateWeighted() {
    let rows = document.querySelectorAll('table tbody tr');
    let total = 0;
    let weight = 0;
    rows.forEach(row => {
        let grade = row.querySelector('.score').value;
        let maxGrade = row.querySelector('.max-score').value;
        let weightInput = row.querySelector('.weight').value;
        if (grade && maxGrade && weightInput) {
            let percent = (parseFloat(grade) / parseFloat(maxGrade)) * 100;
            total += percent * parseFloat(weightInput);
            weight += parseFloat(weightInput);
        }
    });
    let weightedMean = total / weight;
    document.getElementById('result-text').innerHTML = `Weighted grade: ${weightedMean.toFixed(2)}%`;
}