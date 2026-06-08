async function loadDashboard() {
  const { data, error } = await supabaseClient.from("tasks").select("*");

  if (error) {
    console.error(error);
    return;
  }

  const total = data.length;

  const completed = data.filter((task) => task.status === "완료").length;

  const remaining = total - completed;

  const today = new Date().toISOString().split("T")[0];

  const todayCount = data.filter((task) => task.deadline === today).length;

  const upcomingTasks = data
    .filter((task) => task.status !== "완료")
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const todoList = document.querySelector("#todoList");

  todoList.innerHTML = "";

  const todoTasks = data
    .filter((task) => task.status !== "완료")
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  if (todoTasks.length === 0) {
    todoList.innerHTML = `
    <li>등록된 과제가 없습니다.</li>
  `;
  } else {
    todoTasks.forEach((task) => {
      const diffTime = new Date(task.deadline) - new Date(today);

      const dday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const ddayText = dday === 0 ? "D-Day" : `D-${dday}`;

      todoList.innerHTML += `
    <li>
      <input
        type="checkbox"
        disabled
      />
      ${task.title}
      (${ddayText})
    </li>
  `;
    });
  }

  if (upcomingTasks.length > 0) {
    const task = upcomingTasks[0];

    const diffTime = new Date(task.deadline) - new Date(today);

    const dday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    document.querySelector("#deadlineTitle").textContent = task.title;

    document.querySelector("#deadlineSubject").textContent =
      `${task.subject} · ${task.status}`;

    document.querySelector("#deadlinePriority").textContent =
      `중요도 ${task.priority}`;

    document.querySelector("#deadlineDday").textContent =
      dday === 0 ? "D-Day" : `D-${dday}`;
  } else {
    document.querySelector("#deadlineTitle").textContent = "과제가 없습니다.";

    document.querySelector("#deadlineSubject").textContent = "-";

    document.querySelector("#deadlinePriority").textContent = "-";

    document.querySelector("#deadlineDday").textContent = "-";
  }

  document.querySelector("#totalCount").textContent = total;

  document.querySelector("#doneCount").textContent = completed;

  document.querySelector("#remainingCount").textContent = remaining;

  document.querySelector("#todayCount").textContent = todayCount;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.querySelector("#progressText").textContent =
    `전체 진행률 ${percent}%`;

  document.querySelector("#progressFill").style.width = `${percent}%`;
}

loadDashboard();
