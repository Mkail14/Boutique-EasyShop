<script setup>
import { cartState, cartTotal } from '../cartState'
</script>

<template>
  <!-- Overlay pour fermer en cliquant à côté -->
  <div class="cart-overlay" :class="{ 'active': cartState.isOpen }" @click="cartState.toggle()"></div>

  <!-- Panneau latéral -->
  <div class="cart-panel" :class="{ 'open': cartState.isOpen }">
    <div class="cart-header d-flex justify-content-between align-items-center">
      <h2 class="h4 mb-0">Mon Panier</h2>
      <button class="btn-close btn-close-white" @click="cartState.toggle()"></button>
    </div>

    <div class="cart-body flex-grow-1 overflow-auto mt-4">
      <div v-if="cartState.items.length === 0" class="text-center text-muted mt-5">
        <i class="bi bi-cart-x display-1"></i>
        <p class="mt-3">Votre panier est vide</p>
      </div>

      <div v-for="item in cartState.items" :key="item.id" class="cart-item d-flex gap-3 mb-3 p-2 rounded">
        <img :src="item.image" :alt="item.name" class="rounded shadow-sm">
        <div class="flex-grow-1">
          <div class="fw-bold">{{ item.name }}</div>
          <div class="text-info small">{{ item.price }} €</div>
          <div class="d-flex align-items-center gap-2 mt-2">
            <button class="btn btn-sm btn-outline-light py-0 px-2" @click="cartState.updateQuantity(item.id, -1)">-</button>
            <span>{{ item.quantity }}</span>
            <button class="btn btn-sm btn-outline-light py-0 px-2" @click="cartState.updateQuantity(item.id, 1)">+</button>
          </div>
        </div>
        <button class="btn text-danger p-0" @click="cartState.removeItem(item.id)">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>

    <div class="cart-footer border-top border-secondary pt-3 mt-3">
      <div class="d-flex justify-content-between h5 mb-3">
        <span>Total:</span>
        <span class="text-primary fw-bold">{{ cartTotal }} €</span>
      </div>
      <button class="btn btn-primary w-100 py-2 rounded-pill shadow" :disabled="cartState.items.length === 0">
        Passer à la caisse
      </button>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  background: rgba(255, 255, 255, 0.05);
  transition: background 0.2s;
}
.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
}
</style>