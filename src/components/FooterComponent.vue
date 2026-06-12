<script setup>
import { cartState } from '../cartState'
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">

      <!-- COLONNE BRAND -->
      <div class="footer-brand">
        <span class="footer-logo">ShopEasy</span>
        <p class="footer-tagline">Votre destination ultime pour une expérience de shopping en ligne exceptionnelle.</p>
        <div class="footer-socials">
          <a href="#" class="social-btn" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" class="social-btn" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
          <a href="#" class="social-btn" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="social-btn" aria-label="TikTok"><i class="bi bi-tiktok"></i></a>
        </div>
      </div>

      <!-- COLONNE NAVIGATION -->
      <div class="footer-col">
        <h4 class="footer-col-title">Navigation</h4>
        <ul class="footer-links">
          <li><a href="#acceuil-section">Accueil</a></li>
          <li><a href="#products-section">Produits</a></li>
          <li><a href="#" @click.prevent="cartState.toggleContact()">Contact</a></li>
        </ul>
      </div>

      <!-- COLONNE AIDE -->
      <div class="footer-col">
        <h4 class="footer-col-title">Aide</h4>
        <ul class="footer-links">
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Livraison</a></li>
          <li><a href="#">Retours</a></li>
          <li><a href="#">Suivre ma commande</a></li>
        </ul>
      </div>

      <!-- COLONNE CONTACT -->
      <div class="footer-col">
        <h4 class="footer-col-title">Contact</h4>
        <ul class="footer-links">
          <li><i class="bi bi-envelope me-2"></i>contact@shopeasy.fr</li>
          <li><i class="bi bi-telephone me-2"></i>+33 1 23 45 67 89</li>
          <li><i class="bi bi-geo-alt me-2"></i>Paris, France</li>
        </ul>
      </div>

    </div>

    <!-- BARRE DU BAS -->
    <div class="footer-bottom">
      <span>© {{ new Date().getFullYear() }} ShopEasy. Tous droits réservés.</span>
      <div class="footer-legal">
        <a href="#">Mentions légales</a>
        <a href="#">CGV</a>
        <a href="#">Politique de confidentialité</a>
      </div>
    </div>

  </footer>
</template>

