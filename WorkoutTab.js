"use Strict";
import CalenderDays from "./CalenderDays.js";
let dateMonth = document.getElementById("date-month");
let dateYear = document.getElementById("date-year");
let tableBody = document.getElementById("table-body");
const table = document.querySelector("#calender-container");
let currentDate = new Date();
const currentMonth = currentDate.getUTCMonth();
const currentYear = currentDate.getUTCFullYear();
let daysOfMonth = [];
let dayObj;

let maxYear = 2030;

const years = [];
let days;

let oldYear = currentYear - 2;
while (maxYear >= oldYear) {
  years.push(oldYear);
  oldYear++;
}

function createOptions(dateType, arr, docEl, compare) {
  let options = document.createElement("option");
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
  let i = 1;
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
    days = document.createElement("td");
    days.id = "date-day";
    days.className = "disabled-day";
    if (i % 6 === 1) {
      let row = document.createElement("tr");
      tableBody.appendChild(row);
    }
    days.innerText = i;
    tableBody.appendChild(days);

    dayObj = new CalenderDays(i, dateMonth.value);
  }
}

function activeEventHandlerOnChange() {
  let allDays = document.querySelectorAll("td");
  allDays.forEach((el) => {
    el.onclick = function () {
      table.classList.add("move-left");
      table.classList.remove("middle");
      el.classList.toggle("active-day");
    };
  });
}

document.onload = changeMonth();
dateMonth.onchange = changeMonth;
dateMonth.onchange = activeEventHandlerOnChange();
