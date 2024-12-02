// Initialize Supabase client
const supabaseUrl = 'https://sdoerkwrsclpcvfkpgif.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkb2Vya3dyc2NscGN2ZmtwZ2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5NzAzMjMsImV4cCI6MjA0ODU0NjMyM30.gjuN7XMoJhJt9nMqggTsOe05HLg74Iaa3f6NQCs43zg'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-items')

    // Render menu items
    function renderMenuItems(items) {
        menuContainer.innerHTML = ''
        items.forEach(item => {
            const itemElement = document.createElement('div')
            itemElement.classList.add('menu-item')
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p class="price">$${item.price.toFixed(2)}</p>
            `
            menuContainer.appendChild(itemElement)
        })
    }

    // Fetch and render all menu items
    async function loadMenuItems() {
        try {
            const { data: menuItems, error } = await supabase
                .from('menu_items')
                .select('*')
            
            if (error) throw error
            renderMenuItems(menuItems)
        } catch (error) {
            console.error('Error loading menu items:', error)
            menuContainer.innerHTML = '<p>Failed to load menu items</p>'
        }
    }

    // Category filtering
    window.filterCategory = async function(category) {
        try {
            let query = supabase.from('menu_items').select('*')
            
            if (category !== 'all') {
                query = query.eq('category', category)
            }

            const { data: filteredItems, error } = await query
            
            if (error) throw error
            renderMenuItems(filteredItems)
        } catch (error) {
            console.error('Error filtering menu items:', error)
            menuContainer.innerHTML = '<p>Failed to filter menu items</p>'
        }
    }

    // Initial load
    loadMenuItems()
})