document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const progressBar = document.querySelector('#uploadProgress .progress-bar');
    const progressContainer = document.getElementById('uploadProgress');

    if (uploadForm) {
        uploadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const articleId = window.location.pathname.split('/').pop();
            
            try {
                progressContainer.classList.remove('d-none');
                
                const response = await fetch(`/blog/${articleId}/images`, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Hiba történt a feltöltés során');
                }

                const result = await response.json();
                
                // Add new image to gallery
                const gallery = document.querySelector('.image-gallery .row');
                if (gallery) {
                    const newImageContainer = document.createElement('div');
                    newImageContainer.className = 'col-md-4 mb-3 image-container';
                    newImageContainer.dataset.imageId = result.imageId;
                    
                    newImageContainer.innerHTML = `
                        <img src="/images/${result.imageId}" class="img-fluid" alt="Uploaded image">
                        <button class="btn btn-danger btn-sm delete-image" data-image-id="${result.imageId}">Törlés</button>
                    `;
                    
                    gallery.appendChild(newImageContainer);
                }

                // Reset form and progress
                uploadForm.reset();
                progressBar.style.width = '0%';
                progressContainer.classList.add('d-none');
                
            } catch (error) {
                console.error('Error:', error);
                alert(error.message);
                progressContainer.classList.add('d-none');
            }
        });
    }

    // Image deletion
    document.addEventListener('click', async function(e) {
        if (e.target.classList.contains('delete-image')) {
            const imageId = e.target.dataset.imageId;
            if (!confirm('Biztosan törölni szeretnéd ezt a képet?')) {
                return;
            }

            try {
                const response = await fetch(`/images/${imageId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Hiba történt a törlés során');
                }

                // Remove image container from DOM
                const imageContainer = e.target.closest('.image-container');
                imageContainer.remove();

            } catch (error) {
                console.error('Error:', error);
                alert(error.message);
            }
        }
    });
});
