// from data.js
var tableData = data;

// YOUR CODE HERE!
// setup table body
var tbody = d3.select("tbody");

// identify the user from the datime form
var dateSelect = d3.select("#datetime");

// utilize a filterbutton
var filterButton = d3.select("#filter-btn");

// setup the 'Reset Table' function
var resetButton = d3.select("#reset-btn");

//Clear the table for new data
function clearTable() {
    tbody.html(""); };

// create a function for a reset
function resetTable() {

    // clear the current data
    clearTable();

    data.forEach((ufo) => {
        var row = tbody.append("tr");
        Object.values(ufo).forEach(value => {
            var cell = row.append("td");
            cell.text(value);
            cell.attr("class", "table-style");}); 
    }); 
    // populate dates dropdown menu
    
    var dates = Array.from(new Set(data.map(sighting => sighting.datetime)));

    
    dates.forEach(date => {
        var option = dateSelect.append("option");
        option.text(date);
    });
}; 


function filterTable() {
    d3.event.preventDefault();

    var inputDate = dateSelect.property("value")

    var filteredData = data;

    if (inputDate) {
        filteredData = filteredData.filter(sighting => sighting.datetime == inputDate);
    }

    clearTable();

    filteredData.forEach((ufo) => {

        var row = tbody.append("tr");

        Object.values(ufo).forEach(value => {

            var cell = row.append("td");

            cell.text(value);
            cell.attr("class", "table-style");
        }); 
    }); 
}; 

resetTable();

filterButton.on("click", filterTable);

resetButton.on("click", resetTable);