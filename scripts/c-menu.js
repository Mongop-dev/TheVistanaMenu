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
    "Sandwiches": [
        {
            name: "Club Sandwich",
            price: 10000,
            description: "Fresh Vegetables, Shredded Chicken, Mayonnaise, Boiled Egg, and Bacon on Request. Served with French Fries."
        },
        {
            name: "Prawns Club Sandwich",
            price: 15000,
            description: "Curry-Boiled Prawns. Served with French Fries"
        },
        {
            name: "Hamburger",
            price: 10000,
            description: "150 gr. Ground Meat Patty with Secret Homemade Sauce. Served with French Fries."
        }
    ],
    "Small Chops": [
        {
            name: "Meat Pie",
            price: 2000,
            description: "Standard Meat Pie"
        },
        {
            name: "Chicken Pie",
            price: 2000,
            description: "Standard Chicken Pie"
        },
        {
            name: "Scotch Egg",
            price: 3000,
            description: "2 Scotch Eggs"
        }
    ],
    "Pasta": [
        {
            name: "Spaghetti Bolognaise",
            price: 12000,
            description: "Classical Pasta Dish with Tomato and Ground Beef"
        },
        {
            name: "Pizza Margherita",
            price: 10000,
            description: "Tomato Sauce, Mozzarella Cheese, Oregano"
        }
    ],
    "Nigerian": [
        {
            name: "Jollof Rice",
            price: 5000,
            description: "Traditional Recipe Cooked with Fresh Tomato Stew"
        },
        {
            name: "Coconut Rice",
            price: 5000,
            description: "Cooked with Coconut Milk and Powder"
        }
    ],
    "Starters": [
        {
            name: "Caesar Salad",
            price: 14000,
            description: "Fresh Lettuce with Parmesan Cheese and Croutons"
        },
        {
            name: "Shrimp Cocktail",
            price: 15000,
            description: "Local Shrimps on a Bed of Grated Carrots"
        }
    ],
    "Hot-starter": [
        {
            name: "Chicken",
            price: 10000,
            description: "Chicken pepper soup"
        }
    ]
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