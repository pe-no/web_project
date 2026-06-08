const calendarDates = document.querySelector("#calendar-dates");

const calendarTitle = document.querySelector("#calendarTitle");

const prevButton = document.querySelector("#prev-month");

const nextButton = document.querySelector("#next-month");

let currentDate = new Date();

let tasks = [];

async function loadTasks() {
  const { data, error } = await supabaseClient.from("tasks").select("*");

  if (error) {
    console.error(error);
    return;
  }

  tasks = data;

  renderCalendar();
}

function renderCalendar() {
  calendarDates.innerHTML = "";

  const year = currentDate.getFullYear();

  const month = currentDate.getMonth();

  calendarTitle.textContent = `${year}년 ${month + 1}월`;

  const firstDay = new Date(year, month, 1).getDay();

  const lastDate = new Date(year, month + 1, 0).getDate();

  // 앞 빈칸
  const prevLastDate = new Date(year, month, 0).getDate();

  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDates.innerHTML += `
    <div class="date-cell other-month">
      <div class="date-number">
        ${prevLastDate - i}
      </div>
    </div>
  `;
  }

  // 날짜 생성
  for (let day = 1; day <= lastDate; day++) {
    const today = new Date();

    const isToday =
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day;

    const currentDateString = `${year}-${String(month + 1).padStart(
      2,
      "0",
    )}-${String(day).padStart(2, "0")}`;

    const dayTasks = tasks.filter(
      (task) => task.deadline === currentDateString,
    );

    calendarDates.innerHTML += `
  <div class="date-cell ${isToday ? "today" : ""}">

    <div class="date-number">
      ${day}
    </div>

    <div class="task-area">

      ${dayTasks
        .map(
          (task) => `
            <div class="calendar-task">
              ${task.title}
            </div>
          `,
        )
        .join("")}

    </div>

  </div>
`;
  }
  const currentCells = calendarDates.children.length;

  const nextDays = 35 - currentCells;

  for (let day = 1; day <= nextDays; day++) {
    calendarDates.innerHTML += `
      <div class="date-cell other-month">
        <div class="date-number">
          ${day}
        </div>
      </div>
    `;
  }
}

prevButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);

  renderCalendar();
});

nextButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);

  renderCalendar();
});

loadTasks();
