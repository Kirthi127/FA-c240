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
        image: "images/chicken rice.webp"
    },
    {
        id: 2,
        name: "Nasi Lemak",
        cuisine: "malay",
        price: 4.0,
        priceRange: "budget",
        location: "Adam Road Food Centre",
        description: "Coconut rice with fried chicken, egg, peanuts, and sambal.",
        image: "images/Nasi lemak.jpg"
    },
    {
        id: 3,
        name: "Roti Prata",
        cuisine: "indian",
        price: 2.5,
        priceRange: "budget",
        location: "Casuarina Curry",
        description: "Crispy flatbread served with curry dipping sauce.",
        image: "images/roti prata.jpg"
    },
    {
        id: 4,
        name: "Laksa",
        cuisine: "fusion",
        price: 5.5,
        priceRange: "moderate",
        location: "Katong Laksa",
        description: "Spicy coconut curry noodle soup with seafood and cockles.",
        image: "images/laksa.jpg"
    },
    {
        id: 5,
        name: "Char Kway Teow",
        cuisine: "chinese",
        price: 4.5,
        priceRange: "budget",
        location: "Outram Park Fried Kway Teow",
        description: "Stir-fried flat rice noodles with prawns, egg, and Chinese sausage.",
        image: "images/char kway teow.jpg"
    },
    {
        id: 6,
        name: "Mee Goreng",
        cuisine: "malay",
        price: 4.0,
        priceRange: "budget",
        location: "Old Airport Road Food Centre",
        description: "Spicy fried yellow noodles with vegetables and egg.",
        image: "images/mee goreng.jpg"
    },
    {
        id: 7,
        name: "Fish Head Curry",
        cuisine: "indian",
        price: 12.0,
        priceRange: "splurge",
        location: "Muthu's Curry",
        description: "Rich curry with tender fish head and vegetables.",
        image: "images/fish head curry.jpg"
    },
    {
        id: 8,
        name: "Satay",
        cuisine: "malay",
        price: 8.0,
        priceRange: "moderate",
        location: "Lau Pa Sat",
        description: "Grilled meat skewers served with peanut sauce and cucumber.",
        image: "images/satay.jpg"
    },
    {
        id: 9,
        name: "Bak Kut Teh",
        cuisine: "chinese",
        price: 7.0,
        priceRange: "moderate",
        location: "Song Fa Bak Kut Teh",
        description: "Pork rib soup cooked in aromatic herbs and spices.",
        image: "images/bak kut teh.jpg"
    },
    {
        id: 10,
        name: "Chili Crab",
        cuisine: "fusion",
        price: 15.0,
        priceRange: "splurge",
        location: "Jumbo Seafood",
        description: "Succulent crab cooked in sweet and spicy tomato-based sauce.",
        image: "images/chilli crab.jpg"
    },
    {
        id: 11,
        name: "Hokkien Mee",
        cuisine: "chinese",
        price: 5.0,
        priceRange: "moderate",
        location: "Tiong Bahru Market",
        description: "Stir-fried noodles with prawns, squid, and pork in rich gravy.",
        image: "images/hokkien mee.jpg"
    },
    {
        id: 12,
        name: "Thosai",
        cuisine: "indian",
        price: 2.0,
        priceRange: "budget",
        location: "Ananda Bhavan",
        description: "Crispy rice and lentil crepe served with sambar and chutney.",
        image: "images/thosai.jpg"
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
const mrtTabs = document.querySelectorAll('.mrt-tab');
const mrtContents = document.querySelectorAll('.mrt-content');

// ===== MRT Location Tab Functions =====
mrtTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const line = tab.dataset.line;
        
        // Remove active class from all tabs and contents
        mrtTabs.forEach(t => t.classList.remove('active'));
        mrtContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(`${line}-line`).classList.add('active');
    });
});

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
    
    // Check if food has a valid image or should use placeholder
    const hasImage = food.image && food.image !== 'placeholder';
    const imageHTML = hasImage 
        ? `<img src="${food.image}" alt="${food.name}" loading="lazy">`
        : `<div style="background: linear-gradient(135deg, #4ECDC4 0%, #FF6B6B 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; height: 100%;"><i class="fas fa-utensils"></i></div>`;
    
    return `
        <div class="food-card" data-cuisine="${food.cuisine}" data-price-range="${food.priceRange}" data-food-id="${food.id}">
            <div class="food-card-image">
                ${imageHTML}
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
        
        // Add click event to open modal
        card.addEventListener('click', () => {
            const foodId = parseInt(card.dataset.foodId);
            openFoodModal(foodId);
        });
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

// ===== Food Detail Modal Functions =====

// Get modal elements
const foodModal = document.getElementById('foodModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

// Open modal with food details
function openFoodModal(foodId) {
    const food = foodData.find(f => f.id === foodId);
    if (!food) return;
    
    const hasImage = food.image && food.image !== 'placeholder';
    const imageHTML = hasImage 
        ? `<img src="${food.image}" alt="${food.name}">`
        : `<div style="background: linear-gradient(135deg, #4ECDC4 0%, #FF6B6B 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 4rem; height: 100%;"><i class="fas fa-utensils"></i></div>`;
    
    modalBody.innerHTML = `
        <div class="modal-image">
            ${imageHTML}
        </div>
        <div class="modal-details">
            <div class="modal-header">
                <h2>${food.name}</h2>
                <div class="modal-badges">
                    <span class="badge badge-cuisine">${food.cuisine.charAt(0).toUpperCase() + food.cuisine.slice(1)}</span>
                    <span class="badge badge-price">${food.priceRange.charAt(0).toUpperCase() + food.priceRange.slice(1)}</span>
                </div>
            </div>
            
            <div class="modal-info">
                <div class="info-item">
                    <i class="fas fa-dollar-sign"></i>
                    <div>
                        <strong>Price</strong>
                        <p>$${food.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <strong>Location</strong>
                        <p>${food.location}</p>
                    </div>
                </div>
            </div>
            
            <div class="modal-description">
                <h3>About this dish</h3>
                <p>${food.description}</p>
            </div>
            
            <div class="modal-tips">
                <h3><i class="fas fa-lightbulb"></i> Pro Tips</h3>
                <ul>
                    <li>Best enjoyed fresh and hot</li>
                    <li>Ask locals for the best stalls</li>
                    <li>Peak hours: 12pm-2pm, 6pm-8pm</li>
                </ul>
            </div>
        </div>
    `;
    
    foodModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeFoodModal() {
    foodModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for modal
modalClose.addEventListener('click', closeFoodModal);
modalOverlay.addEventListener('click', closeFoodModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && foodModal.classList.contains('active')) {
        closeFoodModal();
    }
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

// ===== Location Details Data =====
const locationDetails = {
    'pasir-ris': {
        name: 'Pasir Ris',
        stations: [{line: 'green', code: 'EW1'}],
        places: [
            {
                name: 'Pasir Ris Hawker Centre',
                address: '1 Pasir Ris Central Street 3, #01-01',
                timing: 'Daily: 7:00 AM - 10:00 PM',
                stalls: [
                    {name: 'Ah Seng Chicken Rice', dish: 'Hainanese Chicken Rice', price: '$3.50', hours: '10:00 AM - 8:00 PM'},
                    {name: 'BBQ Seafood Stall', dish: 'Grilled Stingray, BBQ Chicken Wings', price: '$6-10', hours: '4:00 PM - 11:00 PM'},
                    {name: 'Mei Ling Fried Hokkien Mee', dish: 'Hokkien Prawn Noodles', price: '$4.00', hours: '11:00 AM - 9:00 PM'},
                    {name: 'Nasi Lemak Corner', dish: 'Nasi Lemak with Fried Chicken', price: '$4.50', hours: '7:00 AM - 2:00 PM'}
                ]
            },
            {
                name: 'White Sands Shopping Mall',
                address: '1 Pasir Ris Central Street 3',
                timing: 'Daily: 10:00 AM - 10:00 PM',
                stalls: [
                    {name: 'Food Republic', dish: 'Various cuisines - Chinese, Malay, Western', price: '$5-8', hours: '10:00 AM - 10:00 PM'},
                    {name: 'Toast Box', dish: 'Kaya Toast, Local Coffee', price: '$3-5', hours: '8:00 AM - 10:00 PM'}
                ]
            }
        ]
    },
    'hougang': {
        name: 'Hougang',
        stations: [{line: 'purple', code: 'NE14'}],
        places: [
            {
                name: 'Hougang 1 Prawn Noodle',
                address: '105 Hougang Ave 1, #01-1229',
                timing: 'Tue-Sun: 10:30 AM - 7:30 PM (Closed Mon)',
                stalls: [
                    {name: 'Hougang Prawn Noodle', dish: 'Prawn Noodles (Dry/Soup)', price: '$4.50-6', hours: '10:30 AM - 7:30 PM'}
                ]
            },
            {
                name: 'Kovan Market & Food Centre',
                address: '209 Hougang St 21',
                timing: 'Daily: 6:00 AM - 10:00 PM',
                stalls: [
                    {name: 'Sin Kee Famous Cantonese Chicken Rice', dish: 'Roasted Chicken Rice', price: '$3.50', hours: '10:00 AM - 8:00 PM'},
                    {name: 'Carrot Cake Stall', dish: 'Black/White Carrot Cake', price: '$3.00', hours: '7:00 AM - 2:00 PM'},
                    {name: 'Lor Mee Stall', dish: 'Traditional Lor Mee', price: '$3.50', hours: '11:00 AM - 7:00 PM'}
                ]
            }
        ]
    },
    'sengkang': {
        name: 'Sengkang',
        stations: [{line: 'purple', code: 'NE16'}],
        places: [
            {
                name: 'Compass One Shopping Mall',
                address: '1 Sengkang Square',
                timing: 'Daily: 10:00 AM - 10:00 PM',
                stalls: [
                    {name: 'Food Junction', dish: 'Mixed Cuisines - Chinese, Malay, Indian, Western', price: '$4-7', hours: '10:00 AM - 10:00 PM'},
                    {name: 'Ya Kun Kaya Toast', dish: 'Kaya Toast Set', price: '$4.50', hours: '8:00 AM - 10:00 PM'}
                ]
            },
            {
                name: 'Sengkang Square (Kopitiam)',
                address: '33 Sengkang West Ave',
                timing: 'Daily: 7:00 AM - 9:00 PM',
                stalls: [
                    {name: 'Economic Rice Stall', dish: 'Mixed Vegetables & Meat Rice', price: '$3-4', hours: '7:00 AM - 8:00 PM'},
                    {name: 'Yong Tau Foo', dish: 'Assorted Yong Tau Foo', price: '$4-5', hours: '10:00 AM - 9:00 PM'}
                ]
            }
        ]
    },
    'serangoon': {
        name: 'Serangoon',
        stations: [{line: 'purple', code: 'NE12'}, {line: 'yellow', code: 'CC13'}],
        places: [
            {
                name: 'Chomp Chomp Food Centre',
                address: '20 Kensington Park Rd',
                timing: 'Daily: 5:00 PM - 2:00 AM (Dinner/Supper spot)',
                stalls: [
                    {name: 'BBQ Sambal Stingray', dish: 'Grilled Stingray with Sambal', price: '$8-12', hours: '5:00 PM - 1:00 AM'},
                    {name: 'Satay Stall', dish: 'Chicken/Pork Satay (10 sticks)', price: '$7-8', hours: '5:30 PM - 12:00 AM'},
                    {name: 'Fried Carrot Cake', dish: 'Black/White Carrot Cake', price: '$4', hours: '5:00 PM - 11:00 PM'},
                    {name: 'Hokkien Mee', dish: 'Fried Hokkien Prawn Noodles', price: '$5', hours: '5:00 PM - 12:00 AM'}
                ]
            },
            {
                name: 'NEX Shopping Mall',
                address: '23 Serangoon Central',
                timing: 'Daily: 10:00 AM - 10:00 PM',
                stalls: [
                    {name: 'Food Opera', dish: 'Various Local & International Cuisine', price: '$5-10', hours: '10:00 AM - 10:00 PM'},
                    {name: 'Din Tai Fung', dish: 'Xiao Long Bao, Fried Rice', price: '$10-20', hours: '11:00 AM - 10:00 PM'}
                ]
            }
        ]
    }
};

// Add all remaining locations
locationDetails['woodlands'] = {
    name: 'Woodlands',
    stations: [{line: 'red', code: 'NS9'}],
    places: [
        {
            name: 'Woodlands Mart',
            address: '768 Woodlands Avenue 6',
            timing: 'Daily: 7:00 AM - 9:00 PM',
            stalls: [
                {name: 'Prawn Noodles Stall', dish: 'Prawn Noodles (Soup/Dry)', price: '$4-5', hours: '8:00 AM - 3:00 PM'},
                {name: 'Chicken Rice Stall', dish: 'Roasted/Steamed Chicken Rice', price: '$3.50-4', hours: '10:00 AM - 8:00 PM'}
            ]
        },
        {
            name: '888 Plaza Food Court',
            address: '888 Woodlands Drive 50',
            timing: 'Daily: 8:00 AM - 10:00 PM',
            stalls: [
                {name: 'Malaysian Food Stall', dish: 'Nasi Lemak, Laksa', price: '$3.50-5', hours: '8:00 AM - 9:00 PM'},
                {name: 'Yong Tau Foo', dish: 'Assorted Yong Tau Foo', price: '$3-5', hours: '10:00 AM - 8:00 PM'}
            ]
        }
    ]
};

locationDetails['yishun'] = {
    name: 'Yishun',
    stations: [{line: 'red', code: 'NS13'}],
    places: [
        {
            name: 'Chong Pang Market',
            address: '105 Yishun Ring Road',
            timing: 'Daily: 6:00 AM - 8:00 PM',
            stalls: [
                {name: 'Chong Pang Nasi Lemak', dish: 'Nasi Lemak with Various Sides', price: '$2.50-4', hours: '6:00 AM - 12:00 PM'},
                {name: 'Fried Carrot Cake', dish: 'Black/White Carrot Cake', price: '$3', hours: '7:00 AM - 2:00 PM'},
                {name: 'Ban Mian Stall', dish: 'Handmade Noodles Soup', price: '$3.50', hours: '8:00 AM - 7:00 PM'}
            ]
        },
        {
            name: 'Northpoint City',
            address: '930 Yishun Avenue 2',
            timing: 'Daily: 10:00 AM - 10:00 PM',
            stalls: [
                {name: 'Food Republic', dish: 'Various Asian Cuisines', price: '$4-8', hours: '10:00 AM - 10:00 PM'}
            ]
        }
    ]
};

locationDetails['ang-mo-kio'] = {
    name: 'Ang Mo Kio',
    stations: [{line: 'red', code: 'NS16'}],
    places: [
        {
            name: 'AMK Hub Food Court',
            address: '53 Ang Mo Kio Avenue 3',
            timing: 'Daily: 10:00 AM - 10:00 PM',
            stalls: [
                {name: 'Mixed Rice Stall', dish: 'Economic Rice with Vegetables & Meat', price: '$3.50-6', hours: '10:00 AM - 9:00 PM'},
                {name: 'Chicken Rice', dish: 'Roasted Chicken Rice', price: '$3.50', hours: '10:00 AM - 8:00 PM'}
            ]
        },
        {
            name: 'Cheng San Market & Cooked Food Centre',
            address: '527 Ang Mo Kio Avenue 10',
            timing: 'Daily: 6:00 AM - 10:00 PM',
            stalls: [
                {name: 'Famous Lor Mee', dish: 'Traditional Lor Mee', price: '$3-5', hours: '7:00 AM - 2:00 PM'},
                {name: 'Satay Stall', dish: 'Chicken/Pork Satay', price: '$0.60/stick', hours: '4:00 PM - 11:00 PM'}
            ]
        }
    ]
};

locationDetails['tiong-bahru'] = {
    name: 'Tiong Bahru',
    stations: [{line: 'green', code: 'EW17'}],
    places: [
        {
            name: 'Tiong Bahru Market & Food Centre',
            address: '30 Seng Poh Road',
            timing: 'Daily: 6:00 AM - 9:00 PM',
            stalls: [
                {name: 'Jian Bo Shui Kueh', dish: 'Chwee Kueh (Rice Cakes)', price: '$2-3', hours: '6:00 AM - 12:00 PM'},
                {name: 'Tiong Bahru Rojak', dish: 'Fruit & Vegetable Rojak', price: '$3-5', hours: '11:00 AM - 7:00 PM'},
                {name: 'Lao Ban Soya Beancurd', dish: 'Soy Milk & Beancurd', price: '$1.50-2', hours: '6:00 AM - 8:00 PM'}
            ]
        },
        {
            name: 'Tiong Bahru Bakery',
            address: '56 Eng Hoon Street',
            timing: 'Daily: 8:00 AM - 9:00 PM',
            stalls: [
                {name: 'Bakery Counter', dish: 'Croissants, Kouign Amann', price: '$4-8', hours: '8:00 AM - 9:00 PM'}
            ]
        }
    ]
};

locationDetails['jurong-east'] = {
    name: 'Jurong East',
    stations: [{line: 'green', code: 'EW24'}],
    places: [
        {
            name: 'Jurong Point Food Junction',
            address: '1 Jurong West Central 2',
            timing: 'Daily: 10:00 AM - 10:00 PM',
            stalls: [
                {name: 'Various Food Stalls', dish: 'Chinese, Malay, Indian, Western, Japanese', price: '$3.50-6', hours: '10:00 AM - 10:00 PM'}
            ]
        },
        {
            name: 'Yuhua Market & Hawker Centre',
            address: '347 Jurong East Avenue 1',
            timing: 'Daily: 6:00 AM - 9:00 PM',
            stalls: [
                {name: 'Hokkien Mee', dish: 'Fried Hokkien Prawn Noodles', price: '$3-5', hours: '11:00 AM - 8:00 PM'},
                {name: 'Nasi Padang', dish: 'Rice with Various Dishes', price: '$3.50-5', hours: '7:00 AM - 8:00 PM'}
            ]
        }
    ]
};

locationDetails['bugis'] = {
    name: 'Bugis',
    stations: [{line: 'green', code: 'EW12'}, {line: 'blue', code: 'DT14'}],
    places: [
        {
            name: 'Bugis+ / Bugis Junction Food Courts',
            address: '201 Victoria Street',
            timing: 'Daily: 10:00 AM - 10:00 PM',
            stalls: [
                {name: 'Korean Food Stalls', dish: 'Kimchi Fried Rice, Korean BBQ', price: '$6-9', hours: '10:00 AM - 10:00 PM'},
                {name: 'Japanese Stalls', dish: 'Ramen, Donburi', price: '$7-10', hours: '10:00 AM - 10:00 PM'}
            ]
        },
        {
            name: 'Albert Centre Market & Food Centre',
            address: '270 Queen Street',
            timing: 'Daily: 7:00 AM - 8:00 PM',
            stalls: [
                {name: 'Liang Zhao Ji Chicken Rice', dish: 'Roasted Chicken Rice', price: '$3-6', hours: '10:00 AM - 7:00 PM'},
                {name: 'Fishball Noodles', dish: 'Handmade Fishball Noodles', price: '$3.50-5', hours: '7:00 AM - 4:00 PM'}
            ]
        }
    ]
};

locationDetails['paya-lebar'] = {
    name: 'Paya Lebar',
    stations: [{line: 'yellow', code: 'CC9'}, {line: 'green', code: 'EW8'}],
    places: [
        {
            name: 'Paya Lebar Square',
            address: '60 Paya Lebar Road',
            timing: 'Daily: 10:00 AM - 10:00 PM',
            stalls: [
                {name: 'Food Court Level 5', dish: 'Various Asian & Western', price: '$4-7', hours: '10:00 AM - 10:00 PM'}
            ]
        },
        {
            name: 'Geylang Lorong 9 Fresh Frog Porridge',
            address: 'Geylang Lorong 9',
            timing: 'Daily: 5:00 PM - 3:00 AM',
            stalls: [
                {name: 'Frog Porridge', dish: 'Frog Porridge, Seafood', price: '$8-15', hours: '5:00 PM - 3:00 AM'}
            ]
        }
    ]
};

locationDetails['holland-village'] = {
    name: 'Holland Village',
    stations: [{line: 'yellow', code: 'CC21'}],
    places: [
        {
            name: 'Holland Village Market & Food Centre',
            address: '44 Holland Drive',
            timing: 'Daily: 7:00 AM - 9:00 PM',
            stalls: [
                {name: 'Hokkien Prawn Mee', dish: 'Prawn Noodles', price: '$4-6', hours: '9:00 AM - 7:00 PM'},
                {name: 'Fried Kway Teow', dish: 'Char Kway Teow', price: '$3.50-5', hours: '11:00 AM - 8:00 PM'}
            ]
        },
        {
            name: 'Wee Nam Kee Chicken Rice',
            address: '275 Holland Avenue',
            timing: 'Daily: 11:00 AM - 3:00 AM',
            stalls: [
                {name: 'Restaurant', dish: 'Hainanese Chicken Rice, Roast Duck', price: '$6-12', hours: '11:00 AM - 3:00 AM'}
            ]
        }
    ]
};

locationDetails['dhoby-ghaut'] = {
    name: 'Dhoby Ghaut',
    stations: [{line: 'red', code: 'NS24'}, {line: 'purple', code: 'NE6'}, {line: 'yellow', code: 'CC1'}],
    places: [
        {
            name: 'Plaza Singapura',
            address: '68 Orchard Road',
            timing: 'Daily: 10:00 AM - 10:00 PM',
            stalls: [
                {name: 'Food Republic', dish: 'Mixed Asian Cuisines', price: '$4-8', hours: '10:00 AM - 10:00 PM'}
            ]
        },
        {
            name: 'Rochor Original Beancurd',
            address: '745 North Bridge Road',
            timing: 'Daily: 12:00 PM - 12:00 AM',
            stalls: [
                {name: 'Beancurd Shop', dish: 'Tau Huay, Soy Milk', price: '$2-3', hours: '12:00 PM - 12:00 AM'}
            ]
        }
    ]
};

locationDetails['little-india'] = {
    name: 'Little India',
    stations: [{line: 'purple', code: 'NE7'}, {line: 'blue', code: 'DT12'}],
    places: [
        {
            name: 'Tekka Centre',
            address: '665 Buffalo Road',
            timing: 'Daily: 6:00 AM - 10:00 PM',
            stalls: [
                {name: 'Allauddin\'s Briyani', dish: 'Mutton Biryani', price: '$5-8', hours: '8:00 AM - 9:00 PM'},
                {name: 'Indian Rojak', dish: 'Vegetable Fritters with Sauce', price: '$3-5', hours: '11:00 AM - 8:00 PM'},
                {name: 'Prata Stall', dish: 'Plain/Egg Prata', price: '$1.50-3', hours: '6:00 AM - 10:00 PM'}
            ]
        },
        {
            name: 'Muthu\'s Curry',
            address: '138 Race Course Road',
            timing: 'Daily: 10:00 AM - 10:00 PM',
            stalls: [
                {name: 'Restaurant', dish: 'Fish Head Curry, Biryani', price: '$10-20', hours: '10:00 AM - 10:00 PM'}
            ]
        }
    ]
};

locationDetails['chinatown'] = {
    name: 'Chinatown',
    stations: [{line: 'purple', code: 'NE4'}, {line: 'blue', code: 'DT19'}],
    places: [
        {
            name: 'Chinatown Complex Food Centre',
            address: '335 Smith Street',
            timing: 'Daily: 7:00 AM - 10:00 PM',
            stalls: [
                {name: 'Lian He Ben Ji Claypot Rice (Michelin)', dish: 'Claypot Rice', price: '$3-5', hours: '4:00 PM - 10:00 PM'},
                {name: 'Outram Park Fried Kway Teow (Michelin)', dish: 'Char Kway Teow', price: '$4-5', hours: '8:00 AM - 3:00 PM'},
                {name: 'Liao Fan Soya Sauce Chicken (Michelin)', dish: 'Soya Sauce Chicken Rice', price: '$3-4', hours: '10:00 AM - 7:30 PM'}
            ]
        },
        {
            name: 'Maxwell Food Centre',
            address: '1 Kadayanallur Street',
            timing: 'Daily: 8:00 AM - 2:00 AM',
            stalls: [
                {name: 'Tian Tian Chicken Rice', dish: 'Steamed Chicken Rice', price: '$3.50-6', hours: '10:00 AM - 8:00 PM (Often sold out early)'},
                {name: 'Zhen Zhen Porridge', dish: 'Congee with various toppings', price: '$3-5', hours: '5:00 PM - 2:00 AM'}
            ]
        }
    ]
};

locationDetails['beauty-world'] = {
    name: 'Beauty World',
    stations: [{line: 'blue', code: 'DT5'}],
    places: [
        {
            name: 'Beauty World Centre Food Court',
            address: '144 Upper Bukit Timah Road',
            timing: 'Daily: 7:00 AM - 9:00 PM',
            stalls: [
                {name: 'Hainanese Chicken Rice', dish: 'Chicken Rice', price: '$3-5', hours: '8:00 AM - 8:00 PM'},
                {name: 'Yong Tau Foo', dish: 'Assorted Yong Tau Foo', price: '$3.50-5', hours: '10:00 AM - 8:00 PM'}
            ]
        },
        {
            name: 'Beauty World Market',
            address: '2 Cheong Chin Nam Road',
            timing: 'Daily: 6:00 AM - 9:00 PM',
            stalls: [
                {name: 'Kopitiam Coffee', dish: 'Kopi, Kaya Toast', price: '$2-4', hours: '6:00 AM - 9:00 PM'}
            ]
        }
    ]
};

locationDetails['springleaf'] = {
    name: 'Springleaf',
    stations: [{line: 'brown', code: 'TE4'}],
    places: [
        {
            name: 'The Roti Prata House (Springleaf)',
            address: '31 Thomson Road',
            timing: '24 Hours',
            stalls: [
                {name: 'Prata Shop', dish: 'Prata, Murtabak, Thosai', price: '$2-6', hours: '24 Hours'}
            ]
        },
        {
            name: 'Sin Ming Roti Prata',
            address: '23 Sin Ming Road',
            timing: 'Daily: 6:00 PM - 4:00 AM',
            stalls: [
                {name: 'Prata Stall', dish: 'Various Prata, Murtabak', price: '$2-5', hours: '6:00 PM - 4:00 AM'}
            ]
        }
    ]
};

locationDetails['orchard'] = {
    name: 'Orchard',
    stations: [{line: 'red', code: 'NS22'}, {line: 'brown', code: 'TE14'}],
    places: [
        {
            name: 'ION Orchard Food Hall',
            address: '2 Orchard Turn, Level 4',
            timing: 'Daily: 10:00 AM - 10:00 PM',
            stalls: [
                {name: 'Food Opera', dish: 'Premium Hawker Dishes', price: '$8-15', hours: '10:00 AM - 10:00 PM'}
            ]
        },
        {
            name: 'Lucky Plaza Food Court',
            address: '304 Orchard Road',
            timing: 'Daily: 10:00 AM - 9:00 PM',
            stalls: [
                {name: 'Filipino Food Stalls', dish: 'Adobo, Sisig, Pancit', price: '$4-7', hours: '10:00 AM - 9:00 PM'},
                {name: 'Mixed Asian Stalls', dish: 'Thai, Vietnamese, Chinese', price: '$5-8', hours: '10:00 AM - 9:00 PM'}
            ]
        }
    ]
};

locationDetails['shenton-way'] = {
    name: 'Shenton Way',
    stations: [{line: 'brown', code: 'TE20'}],
    places: [
        {
            name: 'Lau Pa Sat (Telok Ayer Market)',
            address: '18 Raffles Quay',
            timing: 'Daily: 24 Hours',
            stalls: [
                {name: 'Satay Street (Evening)', dish: 'Various Satay Stalls', price: '$0.60-0.80/stick', hours: '7:00 PM - 3:00 AM'},
                {name: 'Chicken Rice', dish: 'Hainanese Chicken Rice', price: '$3.50-5', hours: '10:00 AM - 8:00 PM'},
                {name: 'Indian Food', dish: 'Biryani, Nasi Padang', price: '$4-6', hours: '7:00 AM - 9:00 PM'}
            ]
        }
    ]
};

locationDetails['marina-bay'] = {
    name: 'Marina Bay',
    stations: [{line: 'red', code: 'NS27'}, {line: 'yellow', code: 'CE2'}, {line: 'brown', code: 'TE20'}],
    places: [
        {
            name: 'Marina Bay Sands - Rasapura Masters',
            address: 'B2-01 to B2-71, 2 Bayfront Avenue',
            timing: 'Daily: 10:00 AM - 10:00 PM',
            stalls: [
                {name: 'Famous Sungei Road Laksa', dish: 'Laksa', price: '$6-8', hours: '10:00 AM - 10:00 PM'},
                {name: 'Liao Fan Hawker Chan', dish: 'Soya Sauce Chicken Rice', price: '$3-5', hours: '10:00 AM - 8:00 PM'},
                {name: 'Various Premium Hawker', dish: 'Curated Best Hawker Dishes', price: '$6-12', hours: '10:00 AM - 10:00 PM'}
            ]
        },
        {
            name: 'Marina Bay Financial Centre Food Courts',
            address: 'Various Towers in MBFC',
            timing: 'Mon-Fri: 7:00 AM - 8:00 PM, Sat-Sun: Limited',
            stalls: [
                {name: 'Office Lunch Spots', dish: 'Quick Asian & Western Meals', price: '$5-10', hours: '7:00 AM - 8:00 PM (Weekdays)'}
            ]
        }
    ]
};

// ===== Location Modal Functions =====
const locationModal = document.getElementById('locationModal');
const locationModalOverlay = document.getElementById('locationModalOverlay');
const locationModalClose = document.getElementById('locationModalClose');
const locationModalBody = document.getElementById('locationModalBody');

// Open location modal with details
function openLocationModal(locationKey) {
    const location = locationDetails[locationKey];
    if (!location) return;
    
    const stationBadges = location.stations.map(s => 
        `<span class="station-badge ${s.line}">${s.code}</span>`
    ).join('');
    
    const placesHTML = location.places.map(place => `
        <div class="location-place">
            <h3><i class="fas fa-store"></i> ${place.name}</h3>
            <div class="place-info">
                <p><i class="fas fa-map-marker-alt"></i> <strong>Address:</strong> ${place.address}</p>
                <p><i class="fas fa-clock"></i> <strong>Opening Hours:</strong> ${place.timing}</p>
            </div>
            <div class="stalls-list">
                <h4>Food Stalls & Recommendations:</h4>
                ${place.stalls.map(stall => `
                    <div class="stall-item">
                        <div class="stall-header">
                            <strong>${stall.name}</strong>
                            <span class="stall-price">${stall.price}</span>
                        </div>
                        <p class="stall-dish"><i class="fas fa-utensils"></i> ${stall.dish}</p>
                        <p class="stall-hours"><i class="far fa-clock"></i> ${stall.hours}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    locationModalBody.innerHTML = `
        <div class="location-modal-header">
            <h2><i class="fas fa-map-pin"></i> ${location.name} Station</h2>
            <div class="modal-badges">${stationBadges}</div>
        </div>
        <div class="location-places">
            ${placesHTML}
        </div>
        <div class="location-tips">
            <h3><i class="fas fa-lightbulb"></i> Tips</h3>
            <ul>
                <li>Peak hours are usually 12-2 PM (lunch) and 6-8 PM (dinner)</li>
                <li>Bring cash as many hawker stalls don't accept cards</li>
                <li>Look for long queues - they often indicate the best stalls!</li>
            </ul>
        </div>
    `;
    
    locationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close location modal
function closeLocationModal() {
    locationModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for location modal
locationModalClose.addEventListener('click', closeLocationModal);
locationModalOverlay.addEventListener('click', closeLocationModal);

// Add click events to location cards
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for DOM to fully render
    setTimeout(() => {
        const locationCards = document.querySelectorAll('.location-card[data-location]');
        locationCards.forEach(card => {
            card.addEventListener('click', () => {
                const locationKey = card.dataset.location;
                openLocationModal(locationKey);
            });
            card.style.cursor = 'pointer';
        });
    }, 100);
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
