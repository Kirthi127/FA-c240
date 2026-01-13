# TravelMate 🍜

Your smart local buddy for discovering affordable, delicious, and student-friendly food options in Singapore!

## 🎯 Project Overview

TravelMate helps exchange students navigate Singapore's diverse food scene with confidence. Discover hawker centres, local dishes, price ranges, and multicultural cuisines with ease.

## ✨ Features

- **Smart Food Filtering**: Filter by cuisine type (Chinese, Malay, Indian, Fusion) and price range
- **Interactive Search**: Real-time search across dishes, locations, and descriptions
- **Personalized Recommendations**: Get tailored suggestions based on your preferences
- **Mobile-Responsive Design**: Beautiful interface optimized for all devices
- **Student-Friendly**: Budget-conscious options and clear pricing information

## 🎨 Design & Brand

### Color Palette
- **Primary**: #FF6B6B (Coral Red) - Warm, appetizing, inviting
- **Secondary**: #4ECDC4 (Turquoise) - Fresh, trustworthy, calming
- **Accent**: #FFE66D (Sunny Yellow) - Energetic, friendly, optimistic
- **Dark**: #2D3436 (Charcoal) - Professional, readable
- **Light**: #F8F9FA (Off-white) - Clean, spacious

### Typography
- **Primary Font**: Poppins (modern, friendly, highly readable)
- **Display Font**: Playfair Display (elegant, attention-grabbing for headings)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- [VS Code](https://code.visualstudio.com/) with [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (recommended)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd "C240 FA proj"
```

2. Open in VS Code:
```bash
code .
```

3. Start Live Server:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Or use the "Go Live" button in the status bar

The website will open at `http://localhost:5500`

## 📁 Project Structure

```
C240 FA proj/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles and responsive design
├── js/
│   └── app.js          # Interactive features and functionality
├── images/             # Image assets (placeholder)
├── .vscode/
│   └── settings.json   # Live Server configuration
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## 💻 JavaScript Features

### Implemented Functionality

1. **Food Filtering System**
   - Real-time filtering by cuisine type
   - Price range filtering (Budget, Moderate, Splurge)
   - Combined filter logic

2. **Search Functionality**
   - Live search across all food attributes
   - Debounced input for performance
   - Empty state handling

3. **Dynamic Content Rendering**
   - 12 sample Singapore dishes with details
   - Animated card rendering
   - Responsive grid layout

4. **Personalized Recommendations**
   - LocalStorage-based preference tracking
   - User behavior analysis
   - Tailored food suggestions

5. **Smooth Navigation**
   - Smooth scroll to sections
   - Active link highlighting
   - Mobile-responsive hamburger menu
   - Sticky navigation bar

6. **Performance Optimizations**
   - Intersection Observer for animations
   - Lazy loading support (ready for images)
   - Debounced search input

7. **Contact Form**
   - Form validation
   - Email format checking
   - User feedback

## 🎯 UX Design Principles

### 1. **Usability**
- Clear, intuitive navigation
- Prominent call-to-action buttons
- Consistent button styles and interactions
- Mobile-first responsive design

### 2. **Accessibility**
- Semantic HTML5 structure
- ARIA labels for screen readers
- Keyboard navigation support
- Focus visible states
- High contrast text ratios

### 3. **Visual Hierarchy**
- Large, clear headings
- Consistent spacing system
- Color-coded information (price, cuisine type)
- Card-based content organization

### 4. **First-Time User Experience**
- Welcoming hero section with clear value proposition
- "Why TravelMate?" section explains benefits
- Visual icons for quick understanding
- Guided filtering system

### 5. **Performance**
- Optimized animations
- Efficient DOM updates
- Minimal external dependencies
- Fast load times

### 6. **Aesthetic Appeal**
- Modern gradient backgrounds
- Smooth transitions and hover effects
- Rounded corners and soft shadows
- Vibrant, energetic color scheme
- Beautiful typography pairing

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Customization

### Adding New Food Items

Edit the `foodData` array in [js/app.js](js/app.js):

```javascript
{
    id: 13,
    name: "Your Dish Name",
    cuisine: "chinese|malay|indian|fusion",
    price: 5.00,
    priceRange: "budget|moderate|splurge",
    location: "Hawker Centre Name",
    description: "Description of the dish",
    image: "placeholder"
}
```

### Changing Colors

Edit CSS variables in [css/styles.css](css/styles.css):

```css
:root {
    --primary-color: #FF6B6B;
    --secondary-color: #4ECDC4;
    --accent-color: #FFE66D;
}
```

## 🌟 Future Enhancements

- [ ] Interactive map integration (Google Maps API)
- [ ] User authentication and profiles
- [ ] Review and rating system
- [ ] Photo uploads for dishes
- [ ] Favorites and bookmarking
- [ ] Directions and navigation
- [ ] Push notifications for deals
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Backend API integration

## 📄 License

This project is created for educational purposes.

## 👥 Target Audience

Exchange students in Singapore who are:
- Unfamiliar with local food culture
- Looking for budget-friendly options
- Interested in exploring multicultural cuisines
- Need guidance navigating hawker centres
- Want authentic local experiences

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Singapore's vibrant food culture for inspiration

---

**Made with ❤️ for exchange students in Singapore**

For questions or support, contact: hello@travelmate.sg
