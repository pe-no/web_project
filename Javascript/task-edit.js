const params = new URLSearchParams(window.location.search);

const taskId = params.get("id");

async function loadTask() {
  const { data, error } = await supabaseClient
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  document.querySelector("#taskTitle").value =
    data.title;

  document.querySelector("#subjectName").value =
    data.subject;

  document.querySelector("#datepicker").value =
    data.deadline;

  document.querySelector("#priority").value =
    data.priority;

  document.querySelector("#type").value =
    data.type;

  document.querySelector("#status").value =
    data.status;

  document.querySelector("#memo").value =
    data.memo;
}

loadTask();

const taskForm = document.querySelector("#task_form");

taskForm.addEventListener(
  "submit",
  async function (event) {
    event.preventDefault();

    const title =
      document.querySelector("#taskTitle").value;

    const subject =
      document.querySelector("#subjectName").value;

    const deadline =
      document.querySelector("#datepicker").value;

    const priority =
      document.querySelector("#priority").value;

    const type =
      document.querySelector("#type").value;

    const status =
      document.querySelector("#status").value;

    const memo =
      document.querySelector("#memo").value;

    const { error } = await supabaseClient
      .from("tasks")
      .update({
        title,
        subject,
        deadline,
        priority,
        type,
        status,
        memo,
      })
      .eq("id", taskId);

    if (error) {
      console.error(error);
      alert("수정 실패");
      return;
    }

    alert("수정 완료");

    location.href = "task-manage.html";
  }
);