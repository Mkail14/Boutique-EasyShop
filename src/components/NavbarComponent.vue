<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { cartState, cartCount } from '../cartState'

const isMenuOpen = ref(false)

onMounted(() => {
  const allPanels = document.querySelectorAll('.mega-panel')
  const navLinks  = document.querySelectorAll('.navbar-link[data-panel]')
  const menuBtn   = document.getElementById('menuBtn')
  const nav       = document.querySelector('.bottom-nav')
  let closeTimeout = null

  function openPanel(panelId) {
    clearTimeout(closeTimeout)
    allPanels.forEach(p => p.classList.remove('open'))
    navLinks.forEach(l => l.classList.remove('active'))
    const target = document.getElementById(panelId)
    if (target) {
      target.classList.add('open')
      navLinks.forEach(l => { if (l.dataset.panel === panelId) l.classList.add('active') })
    }
  }

  function closeAll() {
    clearTimeout(closeTimeout)
    allPanels.forEach(p => p.classList.remove('open'))
    navLinks.forEach(l => l.classList.remove('active'))
    isMenuOpen.value = false
    menuBtn.setAttribute('aria-expanded', 'false')
  }

  // Hover uniquement sur "Avis" (seul lien avec data-panel restant)
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      isMenuOpen.value = false
      menuBtn.setAttribute('aria-expanded', 'false')
      openPanel(link.dataset.panel)
    })
    link.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        const panel = document.getElementById(link.dataset.panel)
        panel?.classList.contains('open') ? closeAll() : openPanel(link.dataset.panel)
      }
    })
  })

  nav.addEventListener('mouseleave', () => {
    closeTimeout = setTimeout(() => {
      if (!document.querySelector('.mega-panel:hover')) closeAll()
    }, 180)
  })

  allPanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => clearTimeout(closeTimeout))
    panel.addEventListener('mouseleave', () => { closeTimeout = setTimeout(closeAll, 180) })
  })

  menuBtn.addEventListener('click', e => {
    e.stopPropagation()
    const menuPanel = document.getElementById('panel-menu')
    if (isMenuOpen.value) { closeAll() }
    else {
      allPanels.forEach(p => p.classList.remove('open'))
      navLinks.forEach(l => l.classList.remove('active'))
      menuPanel?.classList.add('open')
      isMenuOpen.value = true
      menuBtn.setAttribute('aria-expanded', 'true')
    }
  })

  document.querySelectorAll('.panel-close').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); closeAll() })
  })

  document.querySelectorAll('.mobile-link').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      const targetPanel = btn.dataset.panel
      if (targetPanel) {
        isMenuOpen.value = false
        menuBtn.setAttribute('aria-expanded', 'false')
        openPanel(targetPanel)
      } else { closeAll() }
    })
  })

  document.addEventListener('click', e => {
    if (!e.target.closest('.mega-panel') && !e.target.closest('.bottom-nav')) closeAll()
  })

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll() })
})
</script>

<template>
  <nav class="bottom-nav d-flex align-items-center gap-2">
    <div class="bg-blur d-flex align-items-center gap-4">
      <div class="logo">
        <a class="navbar-link fw-bold" href="#acceuil-section">ShopEasy</a>
      </div>
      <div class="d-none d-md-flex align-items-center gap-4">
        
        <a class="navbar-link" href="#products-section"><RouterLink class="nav-link" active-class="active" to="/">Produit</RouterLink></a>

        
        <a  class="navbar-link" data-panel="panel-avis" href="#avis" >Avis</a>

        
        <span class="navbar-link" @click="cartState.toggleContact()" style="cursor:pointer">Contact</span>
      </div>

      <button
        class="menu-btn ms-auto"
        :class="{ 'open': isMenuOpen }"
        id="menuBtn"
        aria-expanded="false"
        aria-label="Menu"
      >
        <span></span><span></span><span></span>
      </button>

      <div class="position-relative" style="cursor:pointer" @click="cartState.toggle()">
        <span class="navbar-link d-none d-md-inline pe-2">Panier</span>
        <span
          v-if="cartCount > 0"
          class="badge rounded-pill bg-primary position-absolute top-0 start-100 translate-middle"
          style="font-size:0.6rem;"
        >
          {{ cartCount }}
        </span>
      </div>
    </div>
  </nav>


  <!-- Menu mobile burger -->
  <div class="mega-panel" id="panel-menu">
    <button class="panel-close" aria-label="Fermer"><i class="bi bi-x-lg"></i></button>
    <h3 class="panel-title">Navigation</h3>
    <div class="d-flex flex-column gap-2">
      <a href="#acceuil-section" class="panel-menu-btn mobile-link">Accueil</a>
      <a href="#products-section" class="panel-menu-btn mobile-link">Produits</a>
      <a href="#avis" class="panel-menu-btn mobile-link">Avis</a>
      <!-- Contact mobile : ferme le burger puis ouvre le modal -->
      <button
        class="panel-menu-btn"
        @click="isMenuOpen = false; cartState.toggleContact()"
      >Contact</button>
    </div>
  </div>
</template>