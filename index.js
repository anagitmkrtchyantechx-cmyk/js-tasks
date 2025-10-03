document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('customerDetailsForm');
  const otherSourceContainer = document.getElementById('otherSourceContainer');
  const otherSourceInput = document.getElementById('otherSource');
  const successModal = document.getElementById('successModal');
  const customSelect = document.querySelector('.custom-select');
  const selectTrigger = customSelect.querySelector('.select-trigger');
  const optionsContainer = customSelect.querySelector('.options');
  const howHearInput = document.querySelector('input[name="howHear"]');

  const showError = (input, message) => {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.add('invalid');
    const errorMessage = input.closest('.input-group')?.querySelector('.error-message')
      || group.querySelector('.error-message');

    if (errorMessage) {
      const svgColor = '#f23a3c'; 
      const iconColor = '#fff';   
      errorMessage.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" style="vertical-align:middle; margin-right:6px;">
        <circle cx="12" cy="12" r="12" fill="${svgColor}" />
        <text x="12" y="17" font-size="16" font-family="Arial" text-anchor="middle" fill="${iconColor}">!</text>
      </svg>
      ${message}
    `;
    }
  };

  const clearValidation = (input) => {
    const group = input.closest('.input-group, .custom-select-wrapper');
    if (!group) return;
    group.classList.remove('invalid');
    const errorMessage = group.querySelector('.error-message');
    if (errorMessage) errorMessage.textContent = '';
  };

  const validateInput = (input) => {
    clearValidation(input);
    const value = input.value.trim();
    const type = input.dataset.validationType;
    const required =
      input.required ||
      (input.name === 'otherSource' && howHearInput.value === 'Other') ||
      (input.name === 'howHear' && input.required);

    if (required && !value) {
      showError(input, 'This field is required.');
      return false;
    }

    if (value) {
      if (type === 'number-only' && !/^[0-9\s\-()]+$/.test(value)) {
        showError(input, 'Only numbers are accepted.');
        return false;
      }
      if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showError(input, 'Please enter a valid email address.');
        return false;
      }
    }
    return true;
  };

  const clearForm = () => {
    form.reset();
    selectTrigger.textContent = 'Please Select';
    howHearInput.value = '';
    otherSourceContainer.style.display = 'none';
    otherSourceInput.required = false;

    form.querySelectorAll('.invalid').forEach((g) => {
      g.classList.remove('invalid');
      const error = g.querySelector('.error-message');
      if (error) error.textContent = '';
    });
  };

  const collectFormData = () => {
    const data = {};
    [...form.elements].forEach((el) => {
      if (!el.name || el.type === 'submit') return;
      if (el.name === 'recommend') return;
      if (el.type === 'radio' || el.type === 'checkbox') return;
      if (!el.value.trim()) return;

      if (el.name === 'otherSource' && howHearInput.value !== 'Other') return;
      if (el.name === 'howHear' && !el.value) return;

      data[el.name] = el.value.trim();
    });

    const recommend = form.querySelector('input[name="recommend"]:checked');
    if (recommend) data.willingToRecommend = recommend.value;

    const references = [1, 2].map((i) => ({
      name: form[`refName${i}`].value.trim(),
      address: form[`refAddress${i}`].value.trim(),
      contact: form[`refContact${i}`].value.trim(),
    })).filter(ref => ref.name || ref.address || ref.contact);

    if (references.length) data.references = references;

    return data;
  };

  selectTrigger.addEventListener('click', () =>
    optionsContainer.classList.toggle('open')
  );

  optionsContainer.querySelectorAll('.option').forEach((option) => {
    option.addEventListener('click', () => {
      const value = option.dataset.value;
      selectTrigger.textContent = option.textContent;
      howHearInput.value = value;
      optionsContainer.classList.remove('open');

      if (value === 'Other') {
        otherSourceContainer.style.display = 'block';
        otherSourceInput.required = true;
      } else {
        otherSourceContainer.style.display = 'none';
        otherSourceInput.required = false;
        clearValidation(otherSourceInput);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) optionsContainer.classList.remove('open');
  });

  form.querySelectorAll('input, select, textarea').forEach((input) => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => clearValidation(input));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalid = null;

    const fields = [
      'firstName', 'lastName', 'streetAddress1', 'city',
      'stateProvince', 'postalZipCode', 'phoneNumber',
      'howHear', 'email', 'otherSource'
    ].map((name) => form.querySelector(`[name="${name}"]`)).filter(Boolean);

    fields.forEach((input) => {
      if (input.name === 'email' && !input.value.trim()) return; 
      if (input.name === 'otherSource' && howHearInput.value !== 'Other') return;

      if (!validateInput(input)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = input.closest('.form-group, .input-group, .custom-select-wrapper');
      }
    });

    if (!isValid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('Form submission failed: validation errors.');
      return;
    }

    const formData = collectFormData();

    // Save in localStorage
    localStorage.setItem('customerFormData', JSON.stringify(formData));

    console.log('--- Form Data Submitted Successfully ---');
    console.log(formData);
    console.log('--------------------------------------');

    try {
      // Send to backend server (Redis)
      const res = await fetch('http://localhost:3000/submit', { // <-- Updated
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      console.log('Server response:', result);

      successModal.style.display = 'flex';
      setTimeout(clearForm, 500);
    } catch (err) {
      console.error('Error sending data to server:', err);
    }
  });

  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) successModal.style.display = 'none';
  });
});
