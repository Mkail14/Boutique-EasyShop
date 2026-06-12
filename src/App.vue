<script setup>
import {RouterView} from 'vue-router'
import Navbar from './components/NavbarComponent.vue'
import Accueil from './components/HeroComponent.vue'
import Cart from './components/CartSummary.vue'
import ContactForm from './components/ContactForm.vue'
import detailModal from './components/ProductDetailModal.vue'
import ProductDetailModal from './components/ProductDetailModal.vue'
import AdvantageCard from './components/AdvantageCard.vue'
import Footer from './components/FooterComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

</script>

<template>
  <Navbar/>
  <Accueil/>
  <Cart/>
  <ContactForm/>
  <ProductDetailModal/>
  <AdvantageCard/>
  <FooterComponent/>

</template>