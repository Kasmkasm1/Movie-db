document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (menuBtn && dropdownMenu) {
    // Hamburger butona tıklandığında menüyü aç / kapat
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Tıklamanın dışarı yayılmasını önler
      dropdownMenu.classList.toggle('show');
    });

    // Sayfa üzerinde menü dışı bir yere tıklandığında menüyü kapat
    document.addEventListener('click', (e) => {
      if (!dropdownMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        dropdownMenu.classList.remove('show');
      }
    });
  }
});
// TMDb API Yapılandırması
const API_KEY = '2097b5af72062807051b79b8b70d4d0c';
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const moviesContainer = document.getElementById('moviesContainer');

    if (!searchForm || !searchInput || !moviesContainer) {
        console.error('Gerekli HTML elemanları bulunamadı!');
        return;
    }

    // Form Gönderildiğinde Arama Yap
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Sayfanın yenilenmesini önler
        
        const searchTerm = searchInput.value.trim();

        if (searchTerm && searchTerm !== '') {
            getMovies(API_URL + encodeURIComponent(searchTerm));
        }
    });

    // API'den Film Verilerini Çeken Fonksiyon
    async function getMovies(url) {
        try {
            const res = await fetch(url);
            const data = await res.json();

            if (data.results && data.results.length > 0) {
                showMovies(data.results);
            } else {
                moviesContainer.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1; padding: 20px;">Aradığınız film bulunamadı.</p>';
            }
        } catch (error) {
            console.error('Veri çekilirken hata oluştu:', error);
            moviesContainer.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1; padding: 20px;">Bir hata oluştu, lütfen tekrar deneyin.</p>';
        }
    }

    // Gelen Filmleri Ekrana Bastıran Fonksiyon
    function showMovies(movies) {
        moviesContainer.innerHTML = ''; // Önceki arama sonuçlarını temizle

        movies.forEach((movie) => {
            const { title, poster_path, vote_average } = movie;

            const movieEl = document.createElement('div');
            movieEl.classList.add('movie-card');

            // Görsel yoksa kullanılacak varsayılan kapak
            const poster = poster_path 
                ? IMG_PATH + poster_path 
                : 'https://via.placeholder.com/500x750/142337/ffffff?text=Gorsel+Yok';

            movieEl.innerHTML = `
                <img src="${poster}" alt="${title}" class="movie-poster">
                <div class="movie-info">
                    <h3 class="movie-title">${title}</h3>
                    <span class="movie-rating">★ ${vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
                </div>
            `;

            moviesContainer.appendChild(movieEl);
        });
    }
});