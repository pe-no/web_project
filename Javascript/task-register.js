const taskForm = document.querySelector("#task_form");

if (taskForm) {
  taskForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.querySelector("#taskTitle").value;
    const subject = document.querySelector("#subjectName").value;
    const deadline = document.querySelector("#datepicker").value;

    if (!deadline) {
      alert("마감일을 선택해주세요.");
      return;
    }

    const priority = document.querySelector("#priority").value;
    const type = document.querySelector("#type").value;
    const status = document.querySelector("#status").value;
    const memo = document.querySelector("#memo").value;

    console.log({
      title,
      subject,
      deadline,
      priority,
      type,
      status,
      memo,
    });

    const { error } = await supabaseClient.from("tasks").insert([
      {
        title,
        subject,
        deadline,
        priority,
        type,
        status,
        memo,
      },
    ]);

    if (error) {
      console.error(error);
      alert("과제 등록 실패");
      return;
    }

    alert("과제 등록 완료");

    location.href = "task-manage.html";
  });
}
