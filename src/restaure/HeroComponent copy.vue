<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { cartState } from '../cartState.js'
import ProductDetailModal from './ProductDetailModal.vue'

const products = ref([])
const categories = ref([])
const selectedCategory = ref(null)
const isSearchActive = ref(false)
const activeBg = ref(null)

const searchTerm = computed({
  get: () => cartState.searchTerm,
  set: (val) => cartState.searchTerm = val
})

// Désactive le bg sur tablette/mobile
const setActiveBg = (key) => {
  if (window.innerWidth > 1024) {
    activeBg.value = key ? bgImageMap[key] : null
  }
}

onMounted(async () => {
  try {
    const productsResponse = await fetch('https://dummyjson.com/products?limit=0')
    const productsData = await productsResponse.json()
    products.value = productsData.products

    const categoriesResponse = await fetch('https://dummyjson.com/products/categories')
    const categoriesData = await categoriesResponse.json()
    categories.value = categoriesData
  } catch (error) {
    console.error("Erreur lors de la récupération des produits ou catégories:", error)
  }
})

const imageCategoryMap = {
  'beauty':              'beauty',
  'Téléphones':          'smartphones',
  'accessoires cuisine': 'kitchen-accessories',
  'Décoration maison':   'home-decoration',
  'Scoooter moto':       'motorcycle',
  'Voiture':             'vehicle'
}

const bgImageMap = {
  'beauty':              '/bg2.jpg',
  'Téléphones':          '/bg3.jpg',
  'accessoires cuisine': '/bg4.jpg',
  'Décoration maison':   '/bg5.jpg',
  'Scoooter moto':       '/bg6.jpg',
  'Voiture':             '/bg7.jpg',
}

const directCategories = [
  'beauty',
  'fragrances',
  'furniture',
  'groceries',
  'home-decoration',
  'kitchen-accessories',
]

const getCatSlug = (cat) => typeof cat === 'object' ? cat.slug : cat
const getCatName = (cat) => {
  if (typeof cat === 'object') return cat.name
  return cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')
}

const otherCategories = computed(() => {
  return categories.value.filter(cat => !directCategories.includes(getCatSlug(cat)))
})

const filteredProducts = computed(() => {
  let filtered = products.value
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    )
  }
  return filtered
})

const selectCategory = (cat) => selectedCategory.value = cat
const clearCategory = () => selectedCategory.value = null

const handleImageClick = (altText) => {
  const categorySlug = imageCategoryMap[altText]
  if (categorySlug) {
    selectCategory(categorySlug)
  } else {
    clearCategory()
  }
  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })
}

const triggerSearch = () => {
  if (!isSearchActive.value) {
    isSearchActive.value = true
    nextTick(() => {
      document.getElementById('searchInput')?.focus()
    })
  } else {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="hero-section d-flex align-items-center min-vh-100 py-5" id="acceuil-section">

    <div
      class="hero-bg-overlay"
      :class="{ active: !!activeBg }"
      :style="activeBg ? { backgroundImage: `url(${activeBg})` } : {}"
    ></div>

    <div class="container-fluid">
      <div class="row">
        <div  class="col-lg-6 col-md-12 col-sm-12 b-5 align-self-center text-md-center text-lg-start msg1">
          <h1 id="txt1" class="display-4 fw-bold">Bienvenue sur ShopEasy</h1>
          <p id="txt2" class="lead">Votre destination ultime pour une expérience de shopping en ligne exceptionnelle.</p>
          <a id="btn1" href="#products-section" class="btn avis-btn rounded-pill px-4">Commencez à explorer</a>
        </div>

        <div class="col-lg-6 col-md-12 col-sm-12">
          <div class="gallery ">
            <div id="rssv-img3" class="left-column">
              <div
                id="rssv-7"
                class="gallery-item"
                @mouseenter="setActiveBg('beauty')"
                @mouseleave="setActiveBg(null)"
              >
                <img src="/img1.jpg" alt="beauty" @click="handleImageClick('beauty')">
                <span class="gallery-description">Beauté</span>
              </div>
              <div
              id="rssv-6"
                class="gallery-item"
                @mouseenter="setActiveBg('Téléphones')"
                @mouseleave="setActiveBg(null)"
              >
                <img src="/img2.jpg" alt="Téléphones" @click="handleImageClick('Téléphones')">
                <span class="gallery-description">Téléphones</span>
              </div>
            </div>

            <div id="rssv-img"
              class="gallery-item big"
              @mouseenter="setActiveBg('accessoires cuisine')"
              @mouseleave="setActiveBg(null)"
            >
              <img src="/img3.jpg" alt="accessoires cuisine" @click="handleImageClick('accessoires cuisine')">
              <span class="gallery-description">Cuisine</span>
            </div>

            <div id="rssv-img2" class="left-column">
              <div
                id="rssv-img5"
                class="gallery-item"
                @mouseenter="setActiveBg('Décoration maison')"
                @mouseleave="setActiveBg(null)"
              >
                <img src="/1.webp" alt="Décoration maison" @click="handleImageClick('Décoration maison')">
                <span class="gallery-description">Décoration</span>
              </div>
              <div
                id="rssv-img4"
                class="gallery-item"
                @mouseenter="setActiveBg('Scoooter moto')"
                @mouseleave="setActiveBg(null)"
              >
                <img src="/img5.jpg" alt="Scoooter moto" @click="handleImageClick('Scoooter moto')">
                <span class="gallery-description">Moto</span>
              </div>
            </div>

            <div id="rssv-img1"
              class="gallery-item big"
              @mouseenter="setActiveBg('Voiture')"
              @mouseleave="setActiveBg(null)"
            >
              <img src="/img4.jpg" alt="Voiture" @click="handleImageClick('Voiture')">
              <span class="gallery-description">Voiture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section produits -->
  <section class="products-section container min-vh-100" id="products-section">
    <h1 class="fw-bold py-4">Les produits</h1>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 rounded-pill shadow-sm border border-secondary">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavProducts">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavProducts">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 flex-wrap">
            <li class="nav-item">
              <button class="btn btn-link nav-link" :class="{ 'active': selectedCategory === null }" @click="clearCategory">
                Tous
              </button>
            </li>
            <li class="nav-item" v-for="slug in directCategories" :key="slug">
              <button
                class="btn btn-link nav-link"
                :class="{ 'active': selectedCategory === slug }"
                @click="selectCategory(slug)"
              >
                {{ slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') }}
              </button>
            </li>
            <li class="nav-item dropdown" v-if="otherCategories.length > 0">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Autres</a>
              <ul class="dropdown-menu dropdown-menu-dark shadow">
                <li v-for="cat in otherCategories" :key="getCatSlug(cat)">
                  <button
                    class="dropdown-item"
                    :class="{ 'active': selectedCategory === getCatSlug(cat) }"
                    @click="selectCategory(getCatSlug(cat))"
                  >
                    {{ getCatName(cat) }}
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="scroll-wrapper overflow-y-auto overflow-x-hidden custom-scroll px-2" style="max-height: 600px;">
      <div class="row g-4">
        <div v-for="product in filteredProducts" :key="product.id" class="col-12 col-sm-6 col-md-4 col-lg-2-4-custom">
          <div
            class="card h-100 bg-dark text-white border-secondary shadow-sm product-card"
            @click="cartState.openProductDetail(product)"
          >
            <img :src="product.thumbnail" class="card-img-top" :alt="product.title" style="height: 180px; object-fit: cover;">
            <div class="card-body d-flex flex-column p-3">
              <h5 class="card-title h6 mb-1 text-truncate">{{ product.title }}</h5>
              <p class="card-text small text-muted flex-grow-1" style="font-size: 0.8rem;">{{ product.description.substring(0, 50) }}...</p>
              <div class="d-flex justify-content-between align-items-center mt-3">
                <span class="fw-bold text-info">{{ product.price }} €</span>
                <button @click.stop="cartState.addItem(product)" class="btn btn-sm btn-primary rounded-pill px-3">
                  <i class="bi bi-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="filteredProducts.length === 0" class="col-12 text-center text-muted py-5">
          <i class="bi bi-search display-1 d-block mb-3"></i>
          <p class="lead">Aucun produit ne correspond à votre recherche.</p>
        </div>
      </div>
    </div>
  </section>

  <ProductDetailModal />
</template>