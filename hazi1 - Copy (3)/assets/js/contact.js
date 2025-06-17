document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message'),
        gdpr: document.getElementById('gdpr')
    };

    const errors = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        subject: document.getElementById('subjectError'),
        message: document.getElementById('messageError'),
        gdpr: document.getElementById('gdprError')
    };

    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        input.addEventListener('input', () => validateField(key));
        input.addEventListener('change', () => validateField(key));
    });

    function validateField(fieldName) {
        const input = inputs[fieldName];
        const error = errors[fieldName];
        let isValid = true;
        let errorMessage = '';

        switch(fieldName) {
            case 'name':
                isValid = input.value.trim().length >= 3;
                errorMessage = 'A név legalább 3 karakter hosszú legyen!';
                break;
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
                errorMessage = 'Érvényes email címet adj meg!';
                break;
            case 'subject':
                isValid = input.value !== '';
                errorMessage = 'Válassz egy tárgyat!';
                break;
            case 'message':
                isValid = input.value.trim().length >= 10;
                errorMessage = 'Az üzenet legalább 10 karakter hosszú legyen!';
                break;
            case 'gdpr':
                isValid = input.checked;
                errorMessage = 'El kell fogadnod az adatkezelési feltételeket!';
                break;
        }

        if (!isValid && input.value !== '') {
            input.classList.add('invalid');
            input.classList.remove('valid');
            error.textContent = errorMessage;
        } else if (input.value !== '') {
            input.classList.add('valid');
            input.classList.remove('invalid');
            error.textContent = '';
        } else {
            input.classList.remove('valid', 'invalid');
            error.textContent = '';
        }

        return isValid;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        Object.keys(inputs).forEach(key => {
            if (!validateField(key)) {
                isValid = false;
            }
        });

        if (isValid) {
            document.getElementById('successMessage').style.display = 'block';
            form.reset();
            Object.values(inputs).forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
        }
    });
});
