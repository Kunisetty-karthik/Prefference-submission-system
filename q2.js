// ===== DOM ELEMENTS =====
const form = document.getElementById('preferenceForm');
const submissionBody = document.getElementById('submissionBody');
const formError = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const editIndexInput = document.getElementById('editIndex');

// ===== YEAR =====
document.getElementById('yr').textContent = new Date().getFullYear();

// ===== HAMBURGER =====
const hamBtn = document.getElementById('hamBtn');
const mobMenu = document.getElementById('mobMenu');
hamBtn.addEventListener('click', () => {
  hamBtn.classList.toggle('open');
  mobMenu.classList.toggle('open');
});

// ===== LOAD ON PAGE START =====
window.onload = () => {
  renderTable(getData());
};

// ===== GET / SAVE DATA =====
function getData() {
  return JSON.parse(localStorage.getItem('nssSubmissions')) || [];
}

function saveData(data) {
  localStorage.setItem('nssSubmissions', JSON.stringify(data));
}

// ===== FORM SUBMIT =====
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formError.textContent = '';

  const name      = document.getElementById('fullName').value.trim();
  const roll      = document.getElementById('rollNumber').value.trim();
  const ldap      = document.getElementById('ldapEmail').value.trim();
  const personal  = document.getElementById('personalEmail').value.trim();
  const contact   = document.getElementById('contactNo').value.trim();
  const pref1     = document.getElementById('pref1').value;
  const pref2     = document.getElementById('pref2').value;
  const pref3     = document.getElementById('pref3').value;
  const editIndex = parseInt(editIndexInput.value);

  // Validate: all 3 prefs must be different
  if (pref1 === pref2 || pref2 === pref3 || pref1 === pref3) {
    formError.textContent = '⚠ All three preferences must be different departments.';
    return;
  }

  // Validate: contact must be 10 digits
  if (!/^[0-9]{10}$/.test(contact)) {
    formError.textContent = '⚠ Contact number must be exactly 10 digits.';
    return;
  }

  const data = getData();

  // Validate: roll number must be unique (skip current entry when editing)
  const duplicate = data.findIndex((d, i) => d.roll === roll && i !== editIndex);
  if (duplicate !== -1) {
    formError.textContent = `⚠ Roll number "${roll}" has already submitted preferences.`;
    return;
  }

  const entry = { name, roll, ldap, personal, contact, pref1, pref2, pref3 };

  if (editIndex >= 0) {
    // Edit mode: update existing entry
    data[editIndex] = entry;
    submitBtn.textContent = 'Submit Preferences';
    cancelBtn.style.display = 'none';
    editIndexInput.value = -1;
  } else {
    // New entry
    data.push(entry);
  }

  saveData(data);
  renderTable(data);
  form.reset();
});

// ===== RENDER TABLE =====
function renderTable(data) {
  submissionBody.innerHTML = '';

  if (data.length === 0) {
    submissionBody.innerHTML = `<tr><td colspan="7" class="empty-msg">No submissions yet.</td></tr>`;
    return;
  }

  data.forEach((item, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${item.name}</td>
      <td>${item.roll}</td>
      <td>${item.pref1}</td>
      <td>${item.pref2}</td>
      <td>${item.pref3}</td>
      <td>
        <button class="btn-edit" onclick="editEntry(${i})">✏ Edit</button>
        <button class="btn-delete" onclick="deleteEntry(${i})">🗑 Delete</button>
      </td>
    `;
    submissionBody.appendChild(row);
  });
}

// ===== EDIT =====
function editEntry(i) {
  const data = getData();
  const item = data[i];

  document.getElementById('fullName').value    = item.name;
  document.getElementById('rollNumber').value  = item.roll;
  document.getElementById('ldapEmail').value   = item.ldap;
  document.getElementById('personalEmail').value = item.personal;
  document.getElementById('contactNo').value   = item.contact;
  document.getElementById('pref1').value       = item.pref1;
  document.getElementById('pref2').value       = item.pref2;
  document.getElementById('pref3').value       = item.pref3;

  editIndexInput.value = i;
  submitBtn.textContent = 'Update Preferences';
  cancelBtn.style.display = 'inline-block';
  formError.textContent = '';

  // Scroll to form
  document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
}

// ===== CANCEL EDIT =====
function cancelEdit() {
  form.reset();
  editIndexInput.value = -1;
  submitBtn.textContent = 'Submit Preferences';
  cancelBtn.style.display = 'none';
  formError.textContent = '';
}

// ===== DELETE =====
function deleteEntry(i) {
  if (!confirm('Are you sure you want to delete this submission?')) return;
  const data = getData();
  data.splice(i, 1);
  saveData(data);
  renderTable(data);
}

// ===== CLEAR ALL =====
function clearAll() {
  if (!confirm('Clear ALL submissions? This cannot be undone.')) return;
  localStorage.removeItem('nssSubmissions');
  renderTable([]);
}
