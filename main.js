function delay(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUsers(includeHeader) {
  const statusElement = document.getElementById("status");
  const elements = document.getElementById("user-list");

  statusElement.textContent = "Loading...";
  elements.textContent = "";

  console.log("Fetching users...");

  try {

     const headers = includeHeader
      ? { "x-api-key": "reqres-free-v1" }
      : {};

    const response = await fetch("https://reqres.in/api/users?delay=1", {
      headers
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    await delay(1000);

    if (!data || !data.data || data.data.length === 0) {
      throw new Error("No users found");
    }

    const fullNames = data.data.map(
      user => `${user.name}`
    );

    fullNames.forEach(name => {
      const el = document.createElement("li");
      el.textContent = name;
      elements.appendChild(el);
    });

    console.log(data);
    console.log("Done.");
    statusElement.textContent = ""; 
  } catch (error) {
    console.error(error);
    statusElement.textContent = "No users";
    elements.textContent = ""; 
  }
}

document.getElementById("with-header")
  .addEventListener("click", () => fetchUsers(true));

document.getElementById("without-header")
  .addEventListener("click", () => fetchUsers(false));