// Menu data
const menuData = {
    "Swiss Cafe Menu": [
        {
            name: "Swiss Cafe Early Bird",
            price: 7000,
            description: "2 Fried Eggs, Tomato, Sausages, Baked Beans & Toasts with Coffee or Tea"
        },
        {
            name: "English Breakfast",
            price: 10000,
            description: "2 Scramble Eggs, Tomato, Sausages, Baked Beans & Toasts with Coffee or Tea"
        },
        {
            name: "American Breakfast",
            price: 18000,
            description: "2 Croissants, Jam, Sausages, Baked Beans & with Coffee or Tea"
        },
        {
            name: "Swiss Cafe Continental Breakfast",
            price: 12000,
            description: "FRESH JUICE, TOAST, OVEN FRESH BREADROLL, BUTTER & JAM, CEREALS, CHOICE OF COFFEE OR TEA"
        },
        {
            name: "NIGERIAN BREAKFAST",
            price: 7000,
            description: "TOAST, EGG SAUCE or KIDNEY SAUCE, PLANTAIN or YAM, COFFEE OR TEA"
        },
        {
            name: "Bircher Muesli",
            price: 5500,
            description: "The Classical swiss vitamin shot with oak flakes, yoghurt, and seasonal fruit"
        }
    
    ],
};

// DOM Elements
const menuItemsContainer = document.getElementById('menuItems');
const categoryButtons = document.getElementById('categoryButtons');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');

// Render menu items
function renderMenuItems(category) {
    menuItemsContainer.innerHTML = '';
    
    menuData[category].forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        menuItemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p class="menu-item-description">${item.description || ''}</p>
            <p class="menu-item-price">₦${item.price.toLocaleString()}</p>
        `;
        menuItemsContainer.appendChild(menuItemElement);
    });
}

// Initial render
renderMenuItems("Swiss Cafe Menu");

// Category button click handler
categoryButtons.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-btn')) {
        // Remove active class from all buttons
        categoryButtons.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Render items for selected category
        renderMenuItems(e.target.dataset.category);
        
        // Close mobile menu
        if (window.innerWidth <= 768) {
            categoryButtons.classList.remove('show');
        }
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    categoryButtons.classList.toggle('show');
});