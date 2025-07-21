// JavaScript for QuickShow Movie Streaming Site

// Movie data with more variety
const movies = [
    {
        title: "Alita: Battle Angel",
        year: "2019",
        genre: "Action, Adventure, Sci-Fi",
        duration: "2h 6m",
        rating: 4.5,
        poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop"
    },
    {
        title: "Avatar: The Way of Water",
        year: "2022",
        genre: "Action, Adventure, Sci-Fi",
        duration: "3h 12m",
        rating: 4.7,
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop"
    },
    {
        title: "Top Gun: Maverick",
        year: "2022",
        genre: "Action, Drama",
        duration: "2h 11m",
        rating: 4.8,
        poster: "https://images.unsplash.com/photo-1509347528160-9329559ab135?w=300&h=400&fit=crop"
    },
    {
        title: "Black Panther: Wakanda Forever",
        year: "2022",
        genre: "Action, Adventure, Drama",
        duration: "2h 41m",
        rating: 4.3,
        poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=400&fit=crop"
    },
    {
        title: "Spider-Man: No Way Home",
        year: "2021",
        genre: "Action, Adventure, Fantasy",
        duration: "2h 28m",
        rating: 4.9,
        poster: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=300&h=400&fit=crop"
    },
    {
        title: "The Batman",
        year: "2022",
        genre: "Action, Crime, Drama",
        duration: "2h 56m",
        rating: 4.4,
        poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop"
    },
    {
        title: "Dune",
        year: "2021",
        genre: "Action, Adventure, Drama",
        duration: "2h 35m",
        rating: 4.6,
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop"
    },
    {
        title: "John Wick: Chapter 4",
        year: "2023",
        genre: "Action, Crime, Thriller",
        duration: "2h 49m",
        rating: 4.8,
        poster: "https://images.unsplash.com/photo-1509347528160-9329559ab135?w=300&h=400&fit=crop"
    }
];

// DOM Elements
let moviesRow;
let navbar;

// State management
let currentMovies = [...movies];
let isLoading = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    moviesRow = document.getElementById('moviesRow');
    navbar = document.querySelector('.navbar');
    
    // Check if required elements exist
    if (!moviesRow) {
        console.error('Movies container not found');
        return;
    }
    
    // Render movies
    renderMovies();
    
    // Initialize all features
    initScrollEffects();
    initInteractiveElements();
    initAnimations();
    addImageLoadingAnimation();
    initLazyLoading();
    addRippleEffect();
});

// Render movies function
function renderMovies(moviesToRender = currentMovies) {
    if (!moviesRow) return;
    
    let moviesHTML = '';
    
    moviesToRender.forEach((movie, index) => {
        moviesHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="movie-card loading" data-index="${index}">
                    <div class="movie-poster-container">
                        <img src="${movie.poster}" 
                             alt="${movie.title}" 
                             class="movie-poster"
                             loading="lazy">
                        <div class="movie-overlay">
                            <button class="play-button" data-movie="${movie.title}">
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                    </div>
                    <div class="movie-info">
                        <h5 class="movie-title">${movie.title}</h5>
                        <div class="movie-meta-small">
                            ${movie.year} • ${movie.genre} • ${movie.duration}
                        </div>
                        <div class="rating">
                            <div class="stars">
                                ${generateStars(movie.rating)}
                            </div>
                            <span class="rating-number">${movie.rating}</span>
                        </div>
                        <button class="btn btn-danger btn-sm mt-3 w-100 buy-ticket-btn" data-movie="${movie.title}">
                            Buy Ticket
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    moviesRow.innerHTML = moviesHTML;
    
    // Animate cards on load
    setTimeout(() => {
        const cards = document.querySelectorAll('.movie-card.loading');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
                card.classList.remove('loading');
            }, index * 100);
        });
    }, 200);
    
    // Re-initialize interactive elements for new content
    initMovieCardEvents();
}

// Generate star rating
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize scroll effects
function initScrollEffects() {
    const debouncedScrollHandler = debounce(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        // Navbar background change
        if (navbar) {
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }, 16);
    
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.loading');
    animateElements.forEach(el => observer.observe(el));
}

// Initialize movie card events
function initMovieCardEvents() {
    // Movie card hover effects
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
}

// Initialize interactive elements
function initInteractiveElements() {
    // Event delegation for dynamic content
    document.addEventListener('click', function(e) {
        // Buy ticket button clicks
        if (e.target.classList.contains('buy-ticket-btn')) {
            e.preventDefault();
            const movieTitle = e.target.getAttribute('data-movie');
            showTicketModal(movieTitle);
        }
        
        // Play button clicks
        if (e.target.closest('.play-button') || e.target.classList.contains('play-button')) {
            e.preventDefault();
            const movieTitle = e.target.getAttribute('data-movie') || 
                             e.target.closest('.play-button')?.getAttribute('data-movie');
            playTrailer(movieTitle);
        }
        
        // Time slot selection
        if (e.target.classList.contains('time-slot')) {
            e.preventDefault();
            selectTimeSlot(e.target);
        }
        
        // Modal close handling
        if (e.target.classList.contains('modal-close') || 
            e.target.closest('.modal-close')) {
            closeModal(e.target);
        }
    });
    
    // Search functionality
    const searchIcon = document.querySelector('.fa-search');
    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            showSearchModal();
        });
    }
    
    // Show more button - using more specific selector
    const showMoreBtn = document.querySelector('[data-action="show-more"]');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loadMoreMovies();
        });
    }
    
    // Initialize movie card events
    initMovieCardEvents();
}

// Select time slot
function selectTimeSlot(clickedSlot) {
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.classList.remove('active', 'btn-danger');
        slot.classList.add('btn-outline-danger');
    });
    
    clickedSlot.classList.add('active', 'btn-danger');
    clickedSlot.classList.remove('btn-outline-danger');
}

// Initialize animations
function initAnimations() {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Stagger animation for movie cards
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Show ticket modal
function showTicketModal(movieTitle) {
    // Remove existing modal if any
    const existingModal = document.getElementById('ticketModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="ticketModal" tabindex="-1" aria-labelledby="ticketModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title" id="ticketModalLabel">Book Ticket - ${movieTitle}</h5>
                        <button type="button" class="btn-close btn-close-white modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="ticketForm">
                            <div class="mb-3">
                                <label for="theatreSelect" class="form-label">Select Theatre</label>
                                <select id="theatreSelect" class="form-select bg-secondary text-white border-0" required>
                                    <option value="">Choose a theatre...</option>
                                    <option value="amc">AMC Theatre Downtown</option>
                                    <option value="regal">Regal Cinemas Mall</option>
                                    <option value="century">Century Theatres</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Show Time</label>
                                <div class="d-flex gap-2 flex-wrap">
                                    <button type="button" class="btn btn-outline-danger btn-sm time-slot" data-time="14:00">2:00 PM</button>
                                    <button type="button" class="btn btn-outline-danger btn-sm time-slot" data-time="17:30">5:30 PM</button>
                                    <button type="button" class="btn btn-outline-danger btn-sm time-slot" data-time="20:00">8:00 PM</button>
                                    <button type="button" class="btn btn-outline-danger btn-sm time-slot" data-time="22:30">10:30 PM</button>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="ticketCount" class="form-label">Number of Tickets</label>
                                <input type="number" id="ticketCount" class="form-control bg-secondary text-white border-0" 
                                       value="1" min="1" max="10" required>
                            </div>
                            <div class="mb-3">
                                <div class="d-flex justify-content-between">
                                    <span>Price per ticket:</span>
                                    <span class="fw-bold">$12.99</span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <span>Total:</span>
                                    <span class="fw-bold text-danger" id="totalPrice">$12.99</span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer border-secondary">
                        <button type="button" class="btn btn-secondary modal-close" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" id="bookNowBtn">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal (Bootstrap 5 compatible)
    const modalElement = document.getElementById('ticketModal');
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } else {
        // Fallback for when Bootstrap is not available
        modalElement.style.display = 'block';
        modalElement.classList.add('show');
    }
    
    // Add ticket count change listener
    const ticketCount = document.getElementById('ticketCount');
    const totalPrice = document.getElementById('totalPrice');
    const bookNowBtn = document.getElementById('bookNowBtn');
    
    if (ticketCount && totalPrice) {
        ticketCount.addEventListener('input', function() {
            const count = parseInt(this.value) || 1;
            const total = (count * 12.99).toFixed(2);
            totalPrice.textContent = `$${total}`;
            bookNowBtn.textContent = `Book Now - $${total}`;
        });
    }
    
    // Book now button functionality
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            handleBooking(movieTitle);
        });
    }
}

// Handle booking
function handleBooking(movieTitle) {
    const theatre = document.getElementById('theatreSelect')?.value;
    const selectedTime = document.querySelector('.time-slot.active')?.getAttribute('data-time');
    const ticketCount = document.getElementById('ticketCount')?.value;
    
    if (!theatre || !selectedTime || !ticketCount) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Simulate booking process
    const bookNowBtn = document.getElementById('bookNowBtn');
    if (bookNowBtn) {
        bookNowBtn.disabled = true;
        bookNowBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        setTimeout(() => {
            alert(`Booking confirmed for ${movieTitle}!\nTheatre: ${theatre}\nTime: ${selectedTime}\nTickets: ${ticketCount}`);
            closeModal(document.getElementById('ticketModal'));
        }, 2000);
    }
}

// Close modal
function closeModal(modalElement) {
    const modal = modalElement.closest('.modal');
    if (modal) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        } else {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
        
        // Remove modal after animation
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Show search modal
function showSearchModal() {
    const existingModal = document.getElementById('searchModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const searchModalHTML = `
        <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title" id="searchModalLabel">Search Movies</h5>
                        <button type="button" class="btn-close btn-close-white modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control bg-secondary text-white border-0" 
                                   placeholder="Search for movies, genres, actors..." 
                                   id="searchInput" autocomplete="off">
                            <button class="btn btn-danger" type="button" id="searchBtn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                        <div id="searchResults">
                            <p class="text-muted">Start typing to search...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', searchModalHTML);
    
    const modalElement = document.getElementById('searchModal');
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } else {
        modalElement.style.display = 'block';
        modalElement.classList.add('show');
    }
    
    // Focus on search input and add search functionality
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        
        if (searchInput) {
            searchInput.focus();
            
            // Real-time search
            searchInput.addEventListener('input', debounce(function() {
                performSearch(this.value, searchResults);
            }, 300));
        }
    }, 500);
}

// Perform search
function performSearch(query, resultsContainer) {
    if (!query.trim()) {
        resultsContainer.innerHTML = '<p class="text-muted">Start typing to search...</p>';
        return;
    }
    
    const filteredMovies = currentMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.toLowerCase().includes(query.toLowerCase()) ||
        movie.year.includes(query)
    );
    
    if (filteredMovies.length === 0) {
        resultsContainer.innerHTML = '<p class="text-muted">No movies found matching your search.</p>';
        return;
    }
    
    let resultsHTML = '<div class="row">';
    filteredMovies.forEach(movie => {
        resultsHTML += `
            <div class="col-md-6 mb-3">
                <div class="d-flex bg-secondary rounded p-2">
                    <img src="${movie.poster}" alt="${movie.title}" 
                         class="rounded" style="width: 60px; height: 80px; object-fit: cover;">
                    <div class="ms-3 flex-grow-1">
                        <h6 class="mb-1">${movie.title}</h6>
                        <small class="text-muted">${movie.year} • ${movie.genre}</small>
                        <div class="mt-1">
                            <button class="btn btn-danger btn-sm buy-ticket-btn" data-movie="${movie.title}">
                                Book Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    resultsHTML += '</div>';
    
    resultsContainer.innerHTML = resultsHTML;
}

// Play trailer function
function playTrailer(movieTitle = 'Movie Trailer') {
    const existingModal = document.getElementById('videoModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const videoModalHTML = `
        <div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-0">
                        <h5 class="modal-title text-white" id="videoModalLabel">${movieTitle} - Trailer</h5>
                        <button type="button" class="btn-close btn-close-white modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-0">
                        <div class="ratio ratio-16x9">
                            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" 
                                    allowfullscreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', videoModalHTML);
    
    const modalElement = document.getElementById('videoModal');
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } else {
        modalElement.style.display = 'block';
        modalElement.classList.add('show');
    }
}

// Load more movies
function loadMoreMovies() {
    if (isLoading) return;
    
    isLoading = true;
    const showMoreBtn = document.querySelector('[data-action="show-more"]');
    if (showMoreBtn) {
        showMoreBtn.disabled = true;
        showMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    }
    
    const additionalMovies = [
        {
            title: "Guardians of the Galaxy Vol. 3",
            year: "2023",
            genre: "Action, Adventure, Comedy",
            duration: "2h 30m",
            rating: 4.7,
            poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop"
        },
        {
            title: "Fast X",
            year: "2023",
            genre: "Action, Crime, Thriller",
            duration: "2h 21m",
            rating: 4.2,
            poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop"
        },
        {
            title: "Indiana Jones 5",
            year: "2023",
            genre: "Action, Adventure",
            duration: "2h 34m",
            rating: 4.1,
            poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop"
        },
        {
            title: "The Flash",
            year: "2023",
            genre: "Action, Adventure, Fantasy",
            duration: "2h 24m",
            rating: 4.0,
            poster: "https://images.unsplash.com/photo-1509347528160-9329559ab135?w=300&h=400&fit=crop"
        }
    ];
    
    setTimeout(() => {
        let newMoviesHTML = '';
        additionalMovies.forEach((movie, index) => {
            newMoviesHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="movie-card loading" data-index="${currentMovies.length + index}">
                        <div class="movie-poster-container">
                            <img src="${movie.poster}" 
                                 alt="${movie.title}" 
                                 class="movie-poster"
                                 loading="lazy">
                            <div class="movie-overlay">
                                <button class="play-button" data-movie="${movie.title}">
                                    <i class="fas fa-play"></i>
                                </button>
                            </div>
                        </div>
                        <div class="movie-info">
                            <h5 class="movie-title">${movie.title}</h5>
                            <div class="movie-meta-small">
                                ${movie.year} • ${movie.genre} • ${movie.duration}
                            </div>
                            <div class="rating">
                                <div class="stars">
                                    ${generateStars(movie.rating)}
                                </div>
                                <span class="rating-number">${movie.rating}</span>
                            </div>
                            <button class="btn btn-danger btn-sm mt-3 w-100 buy-ticket-btn" data-movie="${movie.title}">
                                Buy Ticket
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        if (moviesRow) {
            moviesRow.insertAdjacentHTML('beforeend', newMoviesHTML);
        }
        
        // Animate new cards
        const newCards = document.querySelectorAll('.movie-card.loading:not(.show)');
        newCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
                card.classList.remove('loading');
            }, index * 100);
        });
        
        // Add to movies array
        currentMovies.push(...additionalMovies);
        
        // Re-initialize interactive elements for new cards
        initMovieCardEvents();
        
        // Reset button
        if (showMoreBtn) {
            showMoreBtn.disabled = false;
            showMoreBtn.innerHTML = 'Show More';
        }
        
        isLoading = false;
    }, 1000);
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation for images
function addImageLoadingAnimation() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Add ripple effect to buttons
function addRippleEffect() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
            
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;