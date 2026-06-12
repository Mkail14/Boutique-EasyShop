<script setup>
import { cartState } from '../cartState';
import { computed, ref, watch, onUnmounted } from 'vue';

const product = computed(() => cartState.selectedProduct);
const currentImageIndex = ref(0);
let intervalId = null;

const close = () => {
  cartState.closeProductDetail();
};

const startCarousel = () => {
  stopCarousel(); // Sécurité pour éviter les doublons d'intervalles
  if (product.value?.images?.length > 1) {
    intervalId = setInterval(() => {
      currentImageIndex.value = (currentImageIndex.value + 1) % product.value.images.length;
    }, 2000); // Défilement toutes les 2 secondes
  }
};

const stopCarousel = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

// On surveille l'ouverture du modal pour lancer/arrêter le défilement
watch(() => cartState.isProductDetailOpen, (isOpen) => {
  if (isOpen) {
    currentImageIndex.value = 0; // On repart de la première image
    startCarousel();
  } else {
    stopCarousel();
  }
}, { immediate: true });

onUnmounted(stopCarousel);
</script>

<template>
  <Transition name="fade">
    <div v-if="cartState.isProductDetailOpen && product" class="product-detail-overlay" @click.self="close">
      <Transition name="slide-up">
        <div v-if="cartState.isProductDetailOpen && product" class="product-detail-panel bg-dark text-light rounded shadow-lg">
          <button class="btn-close btn-close-white position-absolute top-0 end-0 m-3" @click="close"></button>
          
          <div class="row g-0 h-100">
            <div class="col-md-6 d-flex flex-column">
              <div class="product-main-image flex-grow-1 d-flex align-items-center justify-content-center bg-secondary bg-opacity-25 rounded-start p-3">
                <img :src="product.images[currentImageIndex]" :alt="product.title" class="img-fluid rounded shadow-sm" style="max-height: 100%; object-fit: contain;">
              </div>
              <div class="d-flex gap-2 p-2 overflow-auto product-thumbnails">
                <img v-for="(img, index) in product.images" :key="index" :src="img" :alt="product.title"
                     :class="{ 'img-thumbnail': true, 'active-thumbnail': index === currentImageIndex }"
                     @click="currentImageIndex = index"
                     style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;">
              </div>
            </div>
            <div class="col-md-6 p-4 d-flex flex-column">
              <h2 class="h3 fw-bold text-primary">{{ product.title }}</h2>
              <p class="text-muted small mb-2">{{ product.brand }} - {{ product.category }}</p>
              <p class="lead fw-bold text-info mb-3">{{ product.price }} €</p>
              <p class="flex-grow-1">{{ product.description }}</p>
              
              <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top border-secondary">
                <span class="text-success fw-bold">En stock: {{ product.stock }}</span>
                <button class="btn btn-primary rounded-pill px-4" @click="cartState.addItem(product); close()">
                  <i class="bi bi-cart-plus me-2"></i>Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.product-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 2000; /* Above cart panel */
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-detail-panel {
  position: relative;
  width: 90%;
  max-width: 1000px;
  height: 80%;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Ensure content inside doesn't overflow */
}
.product-main-image {
  transition: background-color 0.3s ease; /* Smooth transition for background if needed */
}


/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease-out;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
.active-thumbnail {
  border: 2px solid var(--bs-primary); /* Highlight active thumbnail */
  transform: scale(1.05);
}
</style>