const data = [
    { id: 1, name: "Janu", English: 50, Maths: 86, Science: 77, SocialScience: 89 },
    { id: 2, name: "Thanu", English: 75, Maths: 96, Science: 67, SocialScience: 91 },
    { id: 3, name: "Tara", English: 90, Maths: 35, Science: 86, SocialScience: 100 },
    { id: 4, name: "Glen", English: 79, Maths: 68, Science: 77, SocialScience: 68 },
    { id: 5, name: "Zara", English: 80, Maths: 85, Science: 96, SocialScience: 68 },
];

function renderTable(data) {
    const tbody = document.querySelector('#student-table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    data.forEach((student, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.English}</td>
                <td>${student.Maths}</td>
                <td>${student.Science}</td>
                <td>${student.SocialScience}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

renderTable(data);

document.getElementById('filter-btn').addEventListener('click', () => {
    const subject = document.getElementById('subject').value;
    const filterType = document.querySelector('input[name="filter"]:checked')?.value;
    const value1 = parseInt(document.getElementById('filter-value-1').value);
    const value2 = parseInt(document.getElementById('filter-value-2').value);

    if (!filterType || isNaN(value1)) {
        alert('Please select a filter type and enter at least one value.');
        return;
    }

    let filteredData = data;

    if (filterType === 'Above') {
        filteredData = data.filter(student => student[subject] > value1);
    } else if (filterType === 'Below') {
        filteredData = data.filter(student => student[subject] < value1);
    } else if (filterType === 'Between') {
        if (isNaN(value2)) {
            alert('Please enter both values for "Between".');
            return;
        }
        filteredData = data.filter(student => student[subject] >= value1 && student[subject] <= value2);
    }

    renderTable(filteredData);
});

document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('filter-value-1').value = '';
    document.getElementById('filter-value-2').value = '';
    const checkedFilter = document.querySelector('input[name="filter"]:checked');
if (checkedFilter) {
    checkedFilter.checked = false;
}

    renderTable(data);
});

document.getElementById('between').addEventListener('change', () => {
    document.getElementById('filter-value-2').style.display = 'inline-block';
});

document.querySelectorAll('input[name="filter"]').forEach(radio => {
    if (radio.id !== 'between') {
        radio.addEventListener('change', () => {
            document.getElementById('filter-value-2').style.display = 'none';
        });
    }
});

document.querySelectorAll('th').forEach(header => {
    header.addEventListener('click', () => {
        const key = header.id.replace('sort-', '');
        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        renderTable(sortedData);
    });
});
