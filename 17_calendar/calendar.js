//BINGO

"use strict";

console.clear();

{
  const today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth(); //11月

  function getCalendarBody() {
    const dates = [];
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i < lastDate + 1; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    // console.log(dates);
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }
    return dates;
  }

  function getPrev() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    // console.log(dates);
    return dates;
  }

  function getNext() {
    const dates = [];
    // const lastDate = new Date(year, month + 1, 1).getDate();
    const n = new Date(year, month + 1, 1).getDay();

    for (let i = 0; i < 7 - n; i++) {
      dates.push({
        date: i + 1,
        isToday: false,
        isDisabled: true,
      });
    }
    // console.log(dates);
    return dates;
  }

  function clearCalendar() {
    const tbody = document.querySelector("tbody")
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle () {
    const title = `${year}/${String(month + 1).padStart(2, "0")}`;
    document.getElementById("title").textContent = title;
  }


  function renderWeeks() {
    let calendar = [];
    calendar.push(
      ...getPrev(),
      ...getCalendarBody(),
      ...getNext(),
    );
    const weeks = [];
    const weeksCount = calendar.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks[i] = calendar.splice(0, 7);
    }
    // console.log(weeks);
    weeks.forEach(week => {
      const tr = document.createElement("tr");
      week.forEach(date => {
        const td = document.createElement("td");
        td.textContent = date.date;

        if (date.isToday){
          td.classList.add("today");
        }

        if (date.isDisabled){
          td.classList.add("disabled");
        }
        tr.appendChild(td);
      });
      document.querySelector("tbody").appendChild(tr);
    });


  }

  function calendarCreate() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }

  document.getElementById("prev").addEventListener("click", function(event){
    month -= 1;
    if (month < 0) {
      year -= 1;
      month = 11
    }
    calendarCreate();
  });

  document.getElementById("next").addEventListener("click", function(event){
    month += 1;
    if (month > 11) {
      year += 1;
      month = 0;
    }
    calendarCreate();
  });

  document.getElementById("today").addEventListener("click", function(event){
    year = today.getFullYear();
    month = today.getMonth();
    calendarCreate();
  });


  calendarCreate();
  console.log(month);
}
