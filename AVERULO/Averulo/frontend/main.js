// General utility to POST data
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

// Handle Signup
async function handleSignup(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('input[type="text"]').value;
  const dob = form.querySelector('input[type="date"]').value;
  const password = form.querySelectorAll('input[type="password"]')[0].value;
  const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const res = await postData("/api/signup", { name, dob, password });
  if (res.success) {
    window.location.href = "otp.html";
  } else {
    alert(res.message || "Signup failed.");
  }
}

// Handle OTP
async function handleOTP(event) {
  event.preventDefault();
  const inputs = document.querySelectorAll(".otp-inputs input");
  const otp = Array.from(inputs).map(input => input.value).join("");

  const res = await postData("/api/verify-otp", { otp });
  if (res.success) {
    window.location.href = "verify-user.html";
  } else {
    alert(res.message || "Invalid OTP.");
  }
}

// Handle Login
async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await postData("/api/login", { email, password });
  if (res.success) {
    window.location.href = "dashboard.html";
  } else {
    alert(res.message || "Login failed.");
  }
}

// ID Verification
async function handleVerification(event) {
  event.preventDefault();
  const idType = document.getElementById("Id-type").value;

  if (!idType) {
    alert("Please select an ID type.");
    return;
  }

  const res = await postData("/api/verify-id", { idType });
  if (res.success) {
    window.location.href = "camera.html";
  } else {
    alert(res.message || "Verification failed.");
  }
}
document.getElementById("signup-form")?.addEventListener("submit", handleSignup);
document.getElementById("otp-form")?.addEventListener("submit", handleOTP);
document.getElementById("login-form")?.addEventListener("submit", handleLogin);
document.getElementById("verification-form")?.addEventListener("submit", handleVerification);