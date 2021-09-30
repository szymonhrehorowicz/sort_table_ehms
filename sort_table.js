let table = document.querySelector('.table');
let tableBody = table.querySelector('tbody');

// Get data out of table
function table2data(tableBody) {
    const tableData = [];
    tableBody.querySelectorAll('tr').forEach(row => {
        const rowData = [row.attributes.onclick.nodeValue];
        row.querySelectorAll('td').forEach(cell => {
            rowData.push(cell.innerText);
        })
        tableData.push(rowData);
    })

    tableData.forEach(el => {
        let temp = el[7]
        el[7] = parseInt(temp.slice(0,2))
        el[8] = parseInt(temp.slice(3,5))
        el[9] = parseInt(temp.slice(6,10))
    })
    return tableData;
}

// Sort table by date and fix numbers to be in order
function sortTable(tableData) {
    tableData.sort((a, b) => {
        if(a[7] < b[7]) {
            return 1;
        }
        return -1;
    })
    
    tableData.sort((a, b) => {
        if(a[8] < b[8]) {
            return 1;
        }
        return -1;
    })
    
    tableData.sort((a, b) => {
        if(a[9] < b[9]) {
            return 1;
        }
        return -1;
    })

    i = 1;
    tableData.forEach(el => {
        el[1] = i;
        i++;
    })
    return tableData;
}
let tableData = table2data(tableBody);
tableData = sortTable(tableData);


// Create new table body with sorted data
let tbody = document.createElement('tbody');
tableData.forEach(el => {
    let row = tbody.insertRow();
    console.log(el[0]);
    row.setAttribute('onclick', el[0])
    let number = row.insertCell();
    number.innerText = el[1];
    let header = row.insertCell();
    header.innerText = el[2];
    let content = row.insertCell();
    content.innerText = el[3];
    let attachment = row.insertCell();
    attachment.innerText = el[4];
    let priority = row.insertCell();
    priority.innerText = el[5];
    let author = row.insertCell();
    author.innerText = el[6];
    let data = row.insertCell();
    data.innerText = `${el[7]}-${el[8]}-${el[9]}`
    row.setAttribute("style", "cursor: pointer; color: #000; transition: 0.8s;")
    row.onmouseover = function() {
        this.style.backgroundColor = "#1c508c";
        this.style.color = "#fff";
    }
    row.onmouseout = function() {
        this.style.backgroundColor = "#fff";
        this.style.color = "#000"
    }
})

// Replace old table with new one
table.replaceChild(tbody, table.childNodes[2])
table.childNodes[3].setAttribute("style", "display: none")