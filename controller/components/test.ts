document.addEventListener("click", (event) => {
    const folderDiv = document.getElementById("folderDiv");

    if (
      folderDiv &&
      !folderDiv.contains(event.target as Node) && 
      event.target !== document.getElementById("createFolder")
    ) {
      folderDiv.classList.add("hidden");
    }
  });

  document.getElementById("folderForm")?.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const name = (document.getElementById("name") as HTMLInputElement).value;

    const response = await fetch("http://localhost:3000/api/createFolder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name }),
    });

    if (response.ok) {
      console.log("Folder created successfully");
    } else {
      console.error("Error creating folder");
    }
  });