import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AvisView from '../views/avisView.vue'
import ProduitView from '../views/produitView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: ProduitView
    },
    {
        path: '/produit',
        name: 'produit',
        component: ProduitView
    },
    {
        path: '/avis',
        name: 'avis',
        component: AvisView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router