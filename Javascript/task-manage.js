const searchInput = document.querySelector("#searchInput");

let currentKeyword = "";

const taskList = document.querySelector(".task_list");

let currentFilter = "전체";

async function loadTasks() {
  let query = supabaseClient.from("tasks").select("*");

  if (currentKeyword) {
    query = query.ilike("title", `%${currentKeyword}%`);
  }

  if (currentFilter !== "전체") {
    query = query.eq("status", currentFilter);
  }

  const { data, error } = await query.order("deadline", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  taskList.innerHTML = "";

  data.forEach((task) => {
    let badgeClass = "badge_normal";
    let badgeText = task.priority || "보통";

    if (task.priority === "높음") {
      badgeClass = "badge_important";
      badgeText = "중요";
    }

    if (task.status === "완료") {
      badgeClass = "badge_done";
      badgeText = "완료";
    }

    taskList.innerHTML += `
  <div class="task_item">

    <div class="task_info">
      <h2>${task.title}</h2>
      <p>
        ${task.subject}
        · ${task.deadline}
        · ${task.status}
      </p>
    </div>

    <div class="task_actions">

      <span class="${badgeClass} badge">
        ${badgeText}
      </span>

      <button
        class="edit_btn"
        data-id="${task.id}"
      >
        수정
      </button>

      <button
        class="delete_btn"
        data-id="${task.id}"
      >
        삭제
      </button>

    </div>

  </div>
`;
  });
}

loadTasks();

document.addEventListener("click", async (event) => {
  // 수정 버튼
  if (event.target.classList.contains("edit_btn")) {
    const taskId = Number(event.target.dataset.id);

    location.href = `task-edit.html?id=${taskId}`;

    return;
  }

  // 삭제 버튼
  if (!event.target.classList.contains("delete_btn")) {
    return;
  }

  const taskId = Number(event.target.dataset.id);

  const confirmDelete = confirm("정말 삭제하시겠습니까?");

  if (!confirmDelete) {
    return;
  }

  const { error } = await supabaseClient
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) {
    console.error(error);
    alert("삭제 실패");
    return;
  }

  alert("삭제 완료");

  loadTasks();
});

const filterButtons = document.querySelectorAll(".task_filter button");

filterButtons.forEach((button) => {
  button.addEventListener("click", async function () {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    this.classList.add("active");

    currentFilter = this.dataset.status;

    await loadTasks();
  });
});

searchInput.addEventListener(
  "input",
  async function () {

    currentKeyword =
      this.value.trim();

    await loadTasks();

  }
);
