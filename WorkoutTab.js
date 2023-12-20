let dateMonth = document.getElementById("date-month");
let dateYear = document.getElementById("date-year");
let tableBody = document.getElementById("table-body");
let currentDate = new Date();
const currentMonth = currentDate.getUTCMonth();
const currentYear = currentDate.getUTCFullYear();
let daysOfMonth = [];

let maxYear = 2030;

const years = [];

let oldYear = currentYear - 2;
while (maxYear >= oldYear) {
  years.push(oldYear);
  oldYear++;
}

function createOptions(dateType, arr, docEl, compare) {
  options = document.createElement("option");
  options.text = dateType;
  if (typeof dateType === "string") {
    if (arr.indexOf(dateType) === compare) options.selected = "selected";
  } else {
    if (dateType === compare) options.selected = "selected";
  }
  docEl.appendChild(options);
}

const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

months.forEach((month) => {
  createOptions(month, months, dateMonth, currentMonth);
});

years.forEach((year) => {
  createOptions(year, years, dateYear, currentYear);
});

function cleanCalenderDays() {
  daysOfMonth = [];
  tableBody.replaceChildren(daysOfMonth);
}

function createDaysForCalenderArr(arr, num) {
  i = 1;
  while (i <= num) {
    arr.push(i);
    i++;
  }
}

function changeMonth() {
  cleanCalenderDays();
  if (dateMonth.value === "Febuary") {
    createDaysForCalenderArr(daysOfMonth, 28);
  } else if (
    dateMonth.value === "April" ||
    dateMonth.value === "June" ||
    dateMonth.value === "September" ||
    dateMonth.value === "November"
  ) {
    createDaysForCalenderArr(daysOfMonth, 30);
  } else {
    createDaysForCalenderArr(daysOfMonth, 31);
  }
  for (let i = 1; i <= daysOfMonth.length; i++) {
    let days = document.createElement("td");
    days.innerText = i;
    tableBody.appendChild(days);
  }
  console.log(dateMonth.value);
}

document.onload = changeMonth();
dateMonth.onchange = changeMonth;
