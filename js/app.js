/**
 * TravelMate - Interactive JavaScript Features
 * Implements: Food filtering, search, smooth scrolling, dynamic content, and personalized recommendations
 */

// ===== Sample Food Data =====
const foodData = [
    {
        id: 1,
        name: "Chicken Rice",
        cuisine: "chinese",
        price: 3.5,
        priceRange: "budget",
        location: "Maxwell Food Centre",
        description: "Tender poached chicken served with fragrant rice and homemade chili sauce.",
        image: "placeholder"
    },
    {
        id: 2,
        name: "Nasi Lemak",
        cuisine: "malay",
        price: 4.0,
        priceRange: "budget",
        location: "Adam Road Food Centre",
        description: "Coconut rice with fried chicken, egg, peanuts, and sambal.",
        image: "placeholder"
    },
    {
        id: 3,
        name: "Roti Prata",
        cuisine: "indian",
        price: 2.5,
        priceRange: "budget",
        location: "Casuarina Curry",
        description: "Crispy flatbread served with curry dipping sauce.",
        image: "placeholder"
    },
    {
        id: 4,
        name: "Laksa",
        cuisine: "fusion",
        price: 5.5,
        priceRange: "moderate",
        location: "Katong Laksa",
        description: "Spicy coconut curry noodle soup with seafood and cockles.",
        image: "placeholder"
    },
    {
        id: 5,
        name: "Char Kway Teow",
        cuisine: "chinese",
        price: 4.5,
        priceRange: "budget",
        location: "Outram Park Fried Kway Teow",
        description: "Stir-fried flat rice noodles with prawns, egg, and Chinese sausage.",
        image: "placeholder"
    },
    {
        id: 6,
        name: "Mee Goreng",
        cuisine: "malay",
        price: 4.0,
        priceRange: "budget",
        location: "Old Airport Road Food Centre",
        description: "Spicy fried yellow noodles with vegetables and egg.",
        image: "placeholder"
    },
    {
        id: 7,
        name: "Fish Head Curry",
        cuisine: "indian",
        price: 12.0,
        priceRange: "splurge",
        location: "Muthu's Curry",
        description: "Rich curry with tender fish head and vegetables.",
        image: "placeholder"
    },
    {
        id: 8,
        name: "Satay",
        cuisine: "malay",
        price: 8.0,
        priceRange: "moderate",
        location: "Lau Pa Sat",
        description: "Grilled meat skewers served with peanut sauce and cucumber.",
        image: "placeholder"
    },
    {
        id: 9,
        name: "Bak Kut Teh",
        cuisine: "chinese",
        price: 7.0,
        priceRange: "moderate",
        location: "Song Fa Bak Kut Teh",
        description: "Pork rib soup cooked in aromatic herbs and spices.",
        image: "placeholder"
    },
    {
        id: 10,
        name: "Chili Crab",
        cuisine: "fusion",
        price: 15.0,
        priceRange: "splurge",
        location: "Jumbo Seafood",
        description: "Succulent crab cooked in sweet and spicy tomato-based sauce.",
        image: "placeholder"
    },
    {
        id: 11,
        name: "Hokkien Mee",
        cuisine: "chinese",
        price: 5.0,
        priceRange: "moderate",
        location: "Tiong Bahru Market",
        description: "Stir-fried noodles with prawns, squid, and pork in rich gravy.",
        image: "placeholder"
    },
    {
        id: 12,
        name: "Thosai",
        cuisine: "indian",
        price: 2.0,
        priceRange: "budget",
        location: "Ananda Bhavan",
        description: "Crispy rice and lentil crepe served with sambar and chutney.",
        image: "placeholder"
    }
];

// ===== State Management =====
let currentFilter = 'all';
let currentPriceFilter = 'all';
let searchQuery = '';

// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const priceButtons = document.querySelectorAll('.price-btn');
const foodGrid = document.getElementById('foodGrid');
const contactForm = document.getElementById('contactForm');

// ===== Navigation Functions =====

// Sticky Navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isActive = navMenu.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isActive);
});

// Smooth Scrolling & Active Link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Scroll to section
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu
        navMenu.classList.remove('active');
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Food Card Functions =====

// Generate Food Card HTML
function createFoodCard(food) {
    const priceDisplay = `$${food.price.toFixed(2)}`;
    
    return `
        <div class="food-card" data-cuisine="${food.cuisine}" data-price-range="${food.priceRange}">
            <div class="food-card-image" style="background: linear-gradient(135deg, #4ECDC4 0%, #FF6B6B 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                <i class="fas fa-utensils"></i>
            </div>
            <div class="food-card-content">
                <div class="food-card-header">
                    <div>
                        <h3>${food.name}</h3>
                        <span class="food-card-cuisine">${food.cuisine.charAt(0).toUpperCase() + food.cuisine.slice(1)}</span>
                    </div>
                    <div class="food-card-price">${priceDisplay}</div>
                </div>
                <div class="food-card-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${food.location}
                </div>
                <p class="food-card-description">${food.description}</p>
            </div>
        </div>
    `;
}

// Render Food Cards
function renderFoodCards(foods) {
    if (foods.length === 0) {
        foodGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-search"></i>
                <h3>No dishes found</h3>
                <p>Try adjusting your filters or search query</p>
            </div>
        `;
        return;
    }
    
    foodGrid.innerHTML = foods.map(food => createFoodCard(food)).join('');
    
    // Add animation delay to cards
    const cards = foodGrid.querySelectorAll('.food-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Filter Food Data
function filterFoodData() {
    let filteredData = foodData;
    
    // Apply cuisine filter
    if (currentFilter !== 'all') {
        filteredData = filteredData.filter(food => food.cuisine === currentFilter);
    }
    
    // Apply price filter
    if (currentPriceFilter !== 'all') {
        filteredData = filteredData.filter(food => food.priceRange === currentPriceFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
        filteredData = filteredData.filter(food => {
            const searchLower = searchQuery.toLowerCase();
            return (
                food.name.toLowerCase().includes(searchLower) ||
                food.cuisine.toLowerCase().includes(searchLower) ||
                food.location.toLowerCase().includes(searchLower) ||
                food.description.toLowerCase().includes(searchLower)
            );
        });
    }
    
    renderFoodCards(filteredData);
}

// ===== Event Listeners =====

// Cuisine Filter Buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update filter
        currentFilter = button.getAttribute('data-filter');
        
        // Apply filters
        filterFoodData();
        
        // Analytics (optional)
        console.log(`Filter applied: ${currentFilter}`);
    });
});

// Price Filter Buttons
priceButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        priceButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update filter
        currentPriceFilter = button.getAttribute('data-price');
        
        // Apply filters
        filterFoodData();
        
        // Analytics (optional)
        console.log(`Price filter applied: ${currentPriceFilter}`);
    });
});

// Search Input
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    filterFoodData();
});

// Debounced Search (performance optimization)
let searchTimeout;
searchInput.addEventListener('keyup', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        console.log(`Search query: ${searchQuery}`);
    }, 500);
});

// ===== Contact Form =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Success message (in production, this would send to backend)
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
    // Log submission (replace with actual API call)
    console.log('Form submitted:', { name, email, message });
});

// ===== Personalized Recommendations =====

// Get user preferences from localStorage
function getUserPreferences() {
    const prefs = localStorage.getItem('travelmate_preferences');
    return prefs ? JSON.parse(prefs) : {
        favoriteCuisines: [],
        viewedDishes: [],
        pricePreference: 'budget'
    };
}

// Save user preferences
function saveUserPreferences(preferences) {
    localStorage.setItem('travelmate_preferences', JSON.stringify(preferences));
}

// Track dish views
function trackDishView(dishId) {
    const prefs = getUserPreferences();
    if (!prefs.viewedDishes.includes(dishId)) {
        prefs.viewedDishes.push(dishId);
        saveUserPreferences(prefs);
    }
}

// Get personalized recommendations
function getPersonalizedRecommendations() {
    const prefs = getUserPreferences();
    let recommendations = [...foodData];
    
    // Sort by user's favorite cuisines
    if (prefs.favoriteCuisines.length > 0) {
        recommendations.sort((a, b) => {
            const aMatch = prefs.favoriteCuisines.includes(a.cuisine);
            const bMatch = prefs.favoriteCuisines.includes(b.cuisine);
            return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
        });
    }
    
    // Filter by price preference
    if (prefs.pricePreference && prefs.pricePreference !== 'all') {
        recommendations = recommendations.filter(food => 
            food.priceRange === prefs.pricePreference
        );
    }
    
    return recommendations.slice(0, 6);
}

// ===== Performance Optimizations =====

// Lazy Loading Images (when actual images are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-card, .feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => observer.observe(el));
}

// ===== Utility Functions =====

// Format price
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Get price range label
function getPriceRangeLabel(priceRange) {
    const labels = {
        budget: '$ (Under $5)',
        moderate: '$$ ($5-$10)',
        splurge: '$$$ ($10+)'
    };
    return labels[priceRange] || priceRange;
}

// Shuffle array (for randomizing recommendations)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🍜 TravelMate initialized!');
    
    // Initial render
    renderFoodCards(foodData);
    
    // Initialize animations
    animateOnScroll();
    
    // Load user preferences
    const prefs = getUserPreferences();
    console.log('User preferences loaded:', prefs);
    
    // Log statistics
    console.log(`Total dishes: ${foodData.length}`);
    console.log('Cuisines:', [...new Set(foodData.map(f => f.cuisine))]);
    console.log('Price ranges:', [...new Set(foodData.map(f => f.priceRange))]);
});

// ===== Analytics & Tracking =====

// Track page views
window.addEventListener('load', () => {
    console.log('Page loaded at:', new Date().toISOString());
});

// Track time spent on page
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    console.log(`Time spent on page: ${timeSpent} seconds`);
});

// ===== Export for potential module usage =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        foodData,
        filterFoodData,
        getUserPreferences,
        saveUserPreferences,
        getPersonalizedRecommendations
    };
}
