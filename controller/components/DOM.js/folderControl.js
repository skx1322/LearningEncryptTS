document.addEventListener("click", (event) => {
    const folderDiv = document.getElementById("folderDiv");

    if (
      folderDiv &&
      !folderDiv.contains(event.target) && 
      event.target !== document.getElementById("createFolder")
    ) {
      folderDiv.classList.add("hidden");
    }
  });

    document.getElementById("createFolder")?.addEventListener("click", () => {
    const folderDiv = document.getElementById("folderDiv");
    folderDiv?.classList.remove("hidden");
  });


  document.getElementById("addFolder")?.addEventListener("click", () => {
  document.getElementById("folderForm")?.submit();
});

  document.getElementById("folderForm")?.addEventListener("submit", async (event) => {
  event.preventDefault(); 

  const folderName = document.getElementById("folderName").value; 
  console.log(folderName);
  const response = await fetch("http://localhost:3000/api/createFolder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: folderName }),
  });

    if (response.ok) {
      console.log("Folder created successfully");
    } else {
      console.error("Error creating folder");
    }
  });
