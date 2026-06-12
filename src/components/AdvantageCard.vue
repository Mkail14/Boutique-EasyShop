<script setup>
const avis = [
  { nom: 'Harouna R.', note: 3, texte: 'Je croyais que cest de l\'arnaque.', avatar: 'HR' },
    { nom: 'Anonymous792.', note: 1, texte: 'Boff ya mieux comme site', avatar: 'NV' },
  { nom: 'Nazirdhine C.', note: 5, texte: 'J\'ai le seum de connaitre ce site que maintenant', avatar: 'NC' },
  { nom: 'Mourad Y.', note: 4, texte: 'Très bonne expérience d\'achat', avatar: 'MY' },
  { nom: 'Khaled A.', note: 5, texte: 'Qualité des produits exceptionnelle, je suis client depuis 2 ans et jamais déçu.', avatar: 'KA' },
  { nom: 'Isma P.', note: 5, texte: 'Le site est LEGER CHAUUUD !!', avatar: 'IP' },
  { nom: 'Nasfi R.', note: 4, texte: 'Rapport qualité/prix imbattable.', avatar: 'NR' },
  { nom: 'Samira H.', note: 2, texte: 'Service client fonctionne pas j\'etait sur que c\'est de l\'arnaque', avatar: 'SH' },
  { nom: 'Anonymous642.', note: 5, texte: 'Retour produit sans aucune soucis, remboursement reçu en 24h. Bravo.', avatar: 'NV' },
  { nom: 'Mohammed P.', note: 1, texte: 'Site de GAZIDJA', avatar: 'MP' },
  { nom: 'Elyamine D.', note: 3, texte: 'Jamais recu mon colis', avatar: 'ED' },
]
</script>

<template >
  <section class="avis-section" id="avis">
    <div class="avis-inner">


      <div class="avis-left">
        <span class="avis-badge">⭐ Clients vérifiés</span>
        <h2 class="avis-titre">Ce que disent<br>nos clients</h2>
        <p class="avis-sub">Des milliers de clients satisfaits partagent leur expérience ShopEasy chaque jour.</p>
        <div class="avis-stars-row">
          <span class="star" v-for="i in 5" :key="i">★</span>
          <span class="avis-score">4.1 / 5</span>
        </div>
        <button class="avis-btn">Laisser votre avis</button>
      </div>


      <div class="avis-right">
        <div class="avis-fade-top"></div>
        <div class="avis-scroll-wrap">
          <div class="avis-track">
            <div class="avis-card" v-for="(a, i) in [...avis, ...avis]" :key="i">
              <div class="avis-card-top">
                <div class="avis-avatar">{{ a.avatar }}</div>
                <div>
                  <div class="avis-nom">{{ a.nom }}</div>
                  <div class="avis-card-stars">
                    <span v-for="s in a.note" :key="s">★</span>
                  </div>
                </div>
              </div>
              <p class="avis-texte">{{ a.texte }}</p>
            </div>
          </div>
        </div>
        <div class="avis-fade-bot"></div>
      </div>

    </div>
  </section>
</template>
