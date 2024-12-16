document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    
    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value.trim();

        
        if (!query) {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
            return;
        }

        try {
            
            const response = await fetch(`/publications/search?title=${encodeURIComponent(query)}`);
            const publications = await response.json();

            
            searchResults.innerHTML = '';

            if (publications.length === 0) {
                searchResults.style.display = 'none';
                return;
            }

            
            publications.forEach((pub) => {
                const li = document.createElement('li');
                li.className = 'list-group-item list-group-item-action';
                li.textContent = pub.title;
                li.addEventListener('click', () => {
                    
                    window.location.href = `/publications/view/${pub._id}`;
                });
                searchResults.appendChild(li);
            });

            searchResults.style.display = 'block';
        } catch (error) {
            console.error('Error al buscar publicaciones:', error);
        }
    });

    
    document.addEventListener('click', (e) => {
        if (!searchResults.contains(e.target) && e.target !== searchInput) {
            searchResults.style.display = 'none';
        }
    });
});
