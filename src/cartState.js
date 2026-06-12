import { reactive, computed } from 'vue'

export const cartState = reactive({
  isOpen: false,
  isContactOpen: false,
  items: [
    { id: 1, name: 'Montre Luxe', price: 199.99, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' }
  ],
  selectedProduct: null,
  isProductDetailOpen: false,
  searchTerm: '',
  toggle() { this.isOpen = !this.isOpen },
  toggleContact() { this.isContactOpen = !this.isContactOpen },
  removeItem(id) { this.items = this.items.filter(item => item.id !== id) },
  addItem(product) {
    const existing = this.items.find(i => i.id === product.id)
    if (existing) { existing.quantity++ }
    else { this.items.push({ id: product.id, name: product.title, price: product.price, quantity: 1, image: product.thumbnail }) }
    this.isOpen = true
  },
  updateQuantity(id, change) {
    const item = this.items.find(i => i.id === id)
    if (item) { item.quantity += change; if (item.quantity <= 0) this.removeItem(id) }
  },
  openProductDetail(product) { this.selectedProduct = product; this.isProductDetailOpen = true },
  closeProductDetail() { this.selectedProduct = null; this.isProductDetailOpen = false }
})

export const cartTotal = computed(() =>
  cartState.items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)
)

export const cartCount = computed(() =>
  cartState.items.reduce((acc, item) => acc + item.quantity, 0)
)