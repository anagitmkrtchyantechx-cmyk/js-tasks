const profileForm = document.getElementById("profile-form");

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const profile = { name, email };
  localStorage.setItem("profile", JSON.stringify(profile));
  console.log("Profile saved:", profile);
});

window.addEventListener("load", () => {
  const savedProfile = localStorage.getItem("profile");
  if (savedProfile) {
    const parsed = JSON.parse(savedProfile);
    console.log("Loaded profile:", parsed);
  }
});
