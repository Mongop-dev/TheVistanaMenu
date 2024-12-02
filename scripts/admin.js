// Initialize Supabase client
const supabaseUrl = 'https://sdoerkwrsclpcvfkpgif.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkb2Vya3dyc2NscGN2ZmtwZ2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5NzAzMjMsImV4cCI6MjA0ODU0NjMyM30.gjuN7XMoJhJt9nMqggTsOe05HLg74Iaa3f6NQCs43zg'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('add-item-form')
    const menuItemsList = document.getElementById('menu-items-list')
    const editModal = document.getElementById('edit-modal')
    const editItemForm = document.getElementById('edit-item-form')
    const closeBtn = document.querySelector('.close-btn')

    // Load existing menu items
    async function loadMenuItems() {
        menuItemsList.innerHTML = ''
        
        try {
            const { data: menuItems, error } = await supabase
                .from('menu_items')
                .select('*')
            
            if (error) throw error

            menuItems.forEach(item => {
                const itemRow = document.createElement('div')
                itemRow.classList.add('menu-item-row')
                itemRow.innerHTML = `
                    <span>${item.name} - ${item.category} - $${item.price}</span>
                    <div class="menu-item-actions">
                        <button class="edit-btn" data-id="${item.id}">Edit</button>
                        <button class="delete-btn" data-id="${item.id}">Delete</button>
                    </div>
                `
                menuItemsList.appendChild(itemRow)
            })

            // Add event listeners for edit and delete buttons
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', openEditModal)
            })

            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', deleteMenuItem)
            })
        } catch (error) {
            console.error('Error loading menu items:', error)
            alert('Failed to load menu items')
        }
    }

    // Add new menu item
    addItemForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const name = document.getElementById('item-name').value
        const category = document.getElementById('item-category').value
        const price = parseFloat(document.getElementById('item-price').value)
        const image = document.getElementById('item-image').value

        try {
            const { data, error } = await supabase
                .from('menu_items')
                .insert([{ name, category, price, image }])
            
            if (error) throw error

            addItemForm.reset()
            loadMenuItems()
        } catch (error) {
            console.error('Error adding menu item:', error)
            alert('Failed to add menu item')
        }
    })

    // Open edit modal
    async function openEditModal(e) {
        const itemId = e.target.dataset.id

        try {
            const { data: item, error } = await supabase
                .from('menu_items')
                .select('*')
                .eq('id', itemId)
                .single()
            
            if (error) throw error

            document.getElementById('edit-item-name').value = item.name
            document.getElementById('edit-item-category').value = item.category
            document.getElementById('edit-item-price').value = item.price
            document.getElementById('edit-item-image').value = item.image
            document.getElementById('edit-item-id').value = item.id

            editModal.style.display = 'block'
        } catch (error) {
            console.error('Error opening edit modal:', error)
            alert('Failed to load item details')
        }
    }

    // Update menu item
    editItemForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const itemId = document.getElementById('edit-item-id').value
        const updatedItem = {
            name: document.getElementById('edit-item-name').value,
            category: document.getElementById('edit-item-category').value,
            price: parseFloat(document.getElementById('edit-item-price').value),
            image: document.getElementById('edit-item-image').value
        }

        try {
            const { data, error } = await supabase
                .from('menu_items')
                .update(updatedItem)
                .eq('id', itemId)
            
            if (error) throw error

            editModal.style.display = 'none'
            loadMenuItems()
        } catch (error) {
            console.error('Error updating menu item:', error)
            alert('Failed to update menu item')
        }
    })

    // Delete menu item
    async function deleteMenuItem(e) {
        const itemId = e.target.dataset.id
        
        if(confirm('Are you sure you want to delete this menu item?')) {
            try {
                const { data, error } = await supabase
                    .from('menu_items')
                    .delete()
                    .eq('id', itemId)
                
                if (error) throw error

                loadMenuItems()
            } catch (error) {
                console.error('Error removing menu item:', error)
                alert('Failed to delete menu item')
            }
        }
    }

    // Close modal
    closeBtn.addEventListener('click', () => {
        editModal.style.display = 'none'
    })

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none'
        }
    })

    // Initial load of menu items
    loadMenuItems()
})