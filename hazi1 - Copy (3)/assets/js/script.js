document.addEventListener('DOMContentLoaded', function() {
    updateFavoritesList();
    
    document.querySelectorAll('.blog-post').forEach(post => {
        const commentsList = post.querySelector('.comments-list');
        if (commentsList) {
            loadComments(post.id, commentsList);
        }
    });

    setupGallery();
});

function toggleContent(button) {
    const article = button.closest('article');
    const content = article.querySelector('.content');
    const expandedContent = content.querySelector('.expanded-content');

    if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        expandedContent.style.display = 'block';
        button.textContent = 'Kevesebb';
    } else {
        content.classList.add('collapsed');
        expandedContent.style.display = 'none';
        button.textContent = 'Tovább olvasom';
    }
}

function toggleFavorite(button) {
    const article = button.closest('article');
    const articleId = article.id;
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.includes(articleId)) {
        const index = favorites.indexOf(articleId);
        favorites.splice(index, 1);
        button.innerHTML = '❤️ Kedvencekhez adás';
        button.classList.remove('active');
        showNotification('Eltávolítva a kedvencek közül!');
    } else {
        favorites.push(articleId);
        button.innerHTML = '💔 Eltávolítás a kedvencekből';
        button.classList.add('active');
        showNotification('Hozzáadva a kedvencekhez!');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesList();
}

function addComment(button, articleId) {
    const article = button.closest('article');
    const commentsList = article.querySelector('.comments-list');
    const input = article.querySelector('.comment-input');
    const authorInput = article.querySelector('.comment-author');
    const commentText = input.value.trim();
    const author = authorInput.value.trim() || 'Névtelen';

    if (commentText) {
        const comment = document.createElement('div');
        comment.className = 'comment';
        
        const now = new Date();
        const formattedDate = now.toLocaleDateString('hu-HU', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        comment.innerHTML = `
            <div class="comment-content">${commentText}</div>
            <div class="comment-meta">
                <span class="comment-info">
                    <span class="comment-author">${escapeHtml(author)}</span> •
                    <span class="comment-date">${formattedDate}</span>
                </span>
                <button onclick="deleteComment(this)" class="delete-comment">❌</button>
            </div>
        `;

        commentsList.appendChild(comment);
        saveComments(articleId);
        
        input.value = '';
        authorInput.value = '';
        
        showNotification('Hozzászólás elküldve!');
    }
}

function deleteComment(button) {
    const comment = button.closest('.comment');
    const article = button.closest('article');
    const articleId = article.id;
    
    comment.remove();
    saveComments(articleId);
    showNotification('Hozzászólás törölve!');
}

function saveComments(articleId) {
    const article = document.getElementById(articleId);
    const commentsList = article.querySelector('.comments-list');
    const comments = commentsList.innerHTML;
    
    const savedComments = JSON.parse(localStorage.getItem('comments') || '{}');
    savedComments[articleId] = comments;
    localStorage.setItem('comments', JSON.stringify(savedComments));
}

function loadComments() {
    const savedComments = JSON.parse(localStorage.getItem('comments') || '{}');
    Object.keys(savedComments).forEach(articleId => {
        const commentsList = document.querySelector(`#comments-${articleId}`);
        if (commentsList) {
            commentsList.innerHTML = savedComments[articleId];
        }
    });
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function updateFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesList = document.getElementById('favorites-list');
    
    if (!favoritesList) return;

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>Még nincsenek kedvenc bejegyzések.</p>';
        return;
    }

    favoritesList.innerHTML = '';
    favorites.forEach(id => {
        const article = document.getElementById(id);
        if (article) {
            const title = article.querySelector('h2').textContent;
            const item = document.createElement('div');
            item.className = 'favorite-item';
            item.innerHTML = `
                <span>${title}</span>
                <button onclick="toggleFavorite(document.querySelector('#${id} .fav-btn'))">❌</button>
            `;
            favoritesList.appendChild(item);
        }
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 100);
}

function setupGallery() {
    const gallery = document.querySelector('.gallery-grid');
    if (!gallery) return;

    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    const images = Array.from(gallery.getElementsByTagName('img'));

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
            modal.style.display = 'block';
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
    }

    function showImage(index) {
        modalImg.src = images[index].src;
    }
}




