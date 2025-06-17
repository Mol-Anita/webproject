document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    let searchTimeout;

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value;
            
            searchTimeout = setTimeout(async () => {
                try {
                    const response = await fetch(`/blog?search=${encodeURIComponent(query)}`, {
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    
                    const data = await response.json();
                    updateSearchResults(data.articles);
                } catch (error) {
                    console.error('Error:', error);
                }
            }, 300); // 300ms debounce
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value;
            window.location.href = `/blog?search=${encodeURIComponent(query)}`;
        });
    }

    function updateSearchResults(articles) {
        if (!searchResults) return;

        searchResults.innerHTML = articles.length > 0 ? articles.map(article => `
            <article class="blog-post mb-4">
                <h2><a href="/blog/${article.id}">${article.title}</a></h2>
                <div class="article-meta text-muted">
                    <span>Írta: ${article.username || 'Ismeretlen'}</span> •
                    <time datetime="${article.created_at}">
                        ${new Date(article.created_at).toLocaleDateString('hu-HU', 
                            { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                </div>
                <div class="content mt-3">
                    ${article.content}
                </div>
            </article>
        `).join('') : '<div class="alert alert-info">Nincs találat a keresési feltételekre.</div>';
    }
});
