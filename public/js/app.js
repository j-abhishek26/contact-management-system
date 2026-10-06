// ========================================
//  Contact Management System — Frontend JS
// ========================================

const API = "./contacts";

// DOM elements
const contactsGrid = document.getElementById("contactsGrid");
const emptyState = document.getElementById("emptyState");
const loadingState = document.getElementById("loadingState");
const totalCount = document.getElementById("totalCount");
const searchInput = document.getElementById("searchInput");

// Modal elements
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const emailInput = document.getElementById("emailInput");
const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");
const submitBtn = document.getElementById("submitBtn");

// Delete modal elements
const deleteModalOverlay = document.getElementById("deleteModalOverlay");
const deleteName = document.getElementById("deleteName");
const deleteConfirmBtn = document.getElementById("deleteConfirmBtn");

// Toast container
const toastContainer = document.getElementById("toastContainer");

// State
let allContacts = [];
let editingId = null; // null = adding, string = editing
let deletingId = null;

// ========================================
//  API Functions
// ========================================

async function fetchContacts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    showToast("Failed to load contacts. Is the server running?", "error");
    return [];
  }
}

async function createContact(contact) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  return res.json();
}

async function updateContact(id, contact) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  return res.json();
}

async function deleteContact(id) {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  return res.json();
}

// ========================================
//  Render Functions
// ========================================

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function renderContacts(contacts) {
  loadingState.style.display = "none";

  if (contacts.length === 0) {
    contactsGrid.innerHTML = "";
    contactsGrid.style.display = "none";
    emptyState.style.display = "block";
    totalCount.textContent = "0 contacts";
    return;
  }

  emptyState.style.display = "none";
  contactsGrid.style.display = "grid";
  totalCount.textContent = `${contacts.length} contact${contacts.length !== 1 ? "s" : ""}`;

  contactsGrid.innerHTML = contacts
    .map(
      (c) => `
    <div class="contact-card" data-id="${c.contactId}">
      <div class="card-header">
        <div class="card-avatar">${getInitials(c.name)}</div>
        <div class="card-actions">
          <button class="btn-icon" onclick="openEditModal('${c.contactId}')" title="Edit">✏️</button>
          <button class="btn-icon delete" onclick="openDeleteModal('${c.contactId}', '${c.name.replace(/'/g, "\\'")}')" title="Delete">🗑️</button>
        </div>
      </div>
      <div class="card-name">${escapeHtml(c.name)}</div>
      <div class="card-detail"><span class="icon">📞</span> ${escapeHtml(c.phone)}</div>
      <div class="card-detail"><span class="icon">📧</span> ${escapeHtml(c.email)}</div>
      <div class="card-id">ID: ${c.contactId}</div>
    </div>
  `
    )
    .join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ========================================
//  Search / Filter
// ========================================

function filterContacts() {
  const query = searchInput.value.toLowerCase().trim();
  if (!query) {
    renderContacts(allContacts);
    return;
  }
  const filtered = allContacts.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.phone.includes(query) ||
      c.email.toLowerCase().includes(query)
  );
  renderContacts(filtered);
}

searchInput.addEventListener("input", filterContacts);

// ========================================
//  Modal Open / Close
// ========================================

function openAddModal() {
  editingId = null;
  modalTitle.textContent = "Add Contact";
  submitBtn.textContent = "Save Contact";
  contactForm.reset();
  clearErrors();
  modalOverlay.classList.add("active");
  nameInput.focus();
}

function openEditModal(id) {
  const contact = allContacts.find((c) => c.contactId === id);
  if (!contact) return;

  editingId = id;
  modalTitle.textContent = "Edit Contact";
  submitBtn.textContent = "Update Contact";
  nameInput.value = contact.name;
  phoneInput.value = contact.phone;
  emailInput.value = contact.email;
  clearErrors();
  modalOverlay.classList.add("active");
  nameInput.focus();
}

function closeModal() {
  modalOverlay.classList.remove("active");
  editingId = null;
}

function openDeleteModal(id, name) {
  deletingId = id;
  deleteName.textContent = name;
  deleteModalOverlay.classList.add("active");
}

function closeDeleteModal() {
  deleteModalOverlay.classList.remove("active");
  deletingId = null;
}

// Event listeners for modals
document.getElementById("addBtn").addEventListener("click", openAddModal);
document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
document.getElementById("cancelBtn").addEventListener("click", closeModal);
document.getElementById("deleteModalCloseBtn").addEventListener("click", closeDeleteModal);
document.getElementById("deleteCancelBtn").addEventListener("click", closeDeleteModal);

// Close modals on overlay click
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
deleteModalOverlay.addEventListener("click", (e) => {
  if (e.target === deleteModalOverlay) closeDeleteModal();
});

// Close modals on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeDeleteModal();
  }
});

// ========================================
//  Form Validation & Submit
// ========================================

function clearErrors() {
  nameError.textContent = "";
  phoneError.textContent = "";
  emailError.textContent = "";
  nameInput.classList.remove("input-error");
  phoneInput.classList.remove("input-error");
  emailInput.classList.remove("input-error");
}

function validateForm() {
  clearErrors();
  let valid = true;

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (!name) {
    nameError.textContent = "Name is required.";
    nameInput.classList.add("input-error");
    valid = false;
  }

  if (!phone) {
    phoneError.textContent = "Phone number is required.";
    phoneInput.classList.add("input-error");
    valid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    phoneError.textContent = "Phone must be exactly 10 digits.";
    phoneInput.classList.add("input-error");
    valid = false;
  }

  if (!email) {
    emailError.textContent = "Email is required.";
    emailInput.classList.add("input-error");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = "Enter a valid email address.";
    emailInput.classList.add("input-error");
    valid = false;
  }

  return valid;
}

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const contactData = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
  };

  submitBtn.disabled = true;
  submitBtn.textContent = editingId ? "Updating..." : "Saving...";

  try {
    let result;

    if (editingId) {
      result = await updateContact(editingId, contactData);
    } else {
      result = await createContact(contactData);
    }

    if (result.success) {
      showToast(
        editingId ? "Contact updated successfully!" : "Contact created successfully!",
        "success"
      );
      closeModal();
      await loadContacts();
    } else {
      // Show server-side errors
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach((err) => {
          if (err.toLowerCase().includes("phone")) {
            phoneError.textContent = err;
            phoneInput.classList.add("input-error");
          } else if (err.toLowerCase().includes("email")) {
            emailError.textContent = err;
            emailInput.classList.add("input-error");
          } else if (err.toLowerCase().includes("name")) {
            nameError.textContent = err;
            nameInput.classList.add("input-error");
          }
        });
      } else {
        showToast(result.message || "Something went wrong.", "error");
      }
    }
  } catch (err) {
    showToast("Network error. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = editingId ? "Update Contact" : "Save Contact";
  }
});

// ========================================
//  Delete
// ========================================

deleteConfirmBtn.addEventListener("click", async () => {
  if (!deletingId) return;

  deleteConfirmBtn.disabled = true;
  deleteConfirmBtn.textContent = "Deleting...";

  try {
    const result = await deleteContact(deletingId);

    if (result.success) {
      showToast("Contact deleted successfully!", "success");
      closeDeleteModal();
      await loadContacts();
    } else {
      showToast(result.message || "Failed to delete contact.", "error");
    }
  } catch (err) {
    showToast("Network error. Please try again.", "error");
  } finally {
    deleteConfirmBtn.disabled = false;
    deleteConfirmBtn.textContent = "Delete";
  }
});

// ========================================
//  Toast Notifications
// ========================================

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icon = type === "success" ? "✅" : type === "error" ? "❌" : "⚠️";
  toast.innerHTML = `<span>${icon}</span><span>${escapeHtml(message)}</span>`;

  toastContainer.appendChild(toast);

  // Remove after animation ends
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ========================================
//  Load Contacts (initial & refresh)
// ========================================

async function loadContacts() {
  allContacts = await fetchContacts();
  filterContacts(); // re-apply any active search
}

// Phone input: allow only digits
phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
});

// ========================================
//  Init
// ========================================

loadContacts();
