<script setup>
import { ref, nextTick } from 'vue'
import { cartState } from '../cartState'

const messages = ref([])
const inputText = ref('')
const typing = ref(false)
const showChips = ref(true)
const chatMessages = ref(null)

const chips = ['🔍 Trouver un produit', '📦 Suivre ma commande', '💳 Paiement & livraison']

const aiReplies = {
  '🔍 Trouver un produit': 'Dites-moi ce que vous cherchez : catégorie, budget ou marque, et je vous trouve les meilleures options 🛍️',
  '📦 Suivre ma commande': "Pour suivre votre commande, communiquez-moi votre numéro de commande ou l'email utilisé lors de l'achat.",
  '💳 Paiement & livraison': 'Nous acceptons CB, PayPal et virement. Livraison offerte dès 50€ 🚚',
}

const fallbacks = [
  'Je comprends votre demande ! Laissez-moi vérifier ça pour vous… 🔎',
  'Bonne question ! Je vais vous aider avec ça tout de suite ✨',
  "Merci ! Je m'en occupe. Y a-t-il autre chose que je puisse faire pour vous ?",
]

const getTime = () => new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

const scrollDown = () => nextTick(() => {
  if (chatMessages.value) chatMessages.value.scrollTop = chatMessages.value.scrollHeight
})

const sendChip = (text) => {
  showChips.value = false
  messages.value.push({ type: 'user', text, time: getTime() })
  triggerAI(text)
  scrollDown()
}

const sendMessage = () => {
  const text = inputText.value.trim()
  if (!text) return
  messages.value.push({ type: 'user', text, time: getTime() })
  inputText.value = ''
  triggerAI(text)
  scrollDown()
}

const triggerAI = (userText) => {
  typing.value = true
  scrollDown()
  setTimeout(() => {
    typing.value = false
    const reply = aiReplies[userText] || fallbacks[Math.floor(Math.random() * fallbacks.length)]
    messages.value.push({ type: 'ai', text: reply, time: getTime() })
    scrollDown()
  }, 1000 + Math.random() * 600)
}
</script>

<template>
  <Transition name="cf-fade">
    <div
      v-if="cartState.isContactOpen"
      class="contact-overlay"
      @click.self="cartState.toggleContact()"
    >
      <Transition name="cf-slide">
        <div v-if="cartState.isContactOpen" class="contact-modal">

          <button class="modal-close" @click="cartState.toggleContact()">
            <i class="bi bi-x-lg"></i>
          </button>

          <div class="contact-grid">

            <!-- BLOC MAIL -->
            <div class="contact-card">
              <div class="card-hd">
                <div class="card-icon icon-mail">
                  <i class="bi bi-envelope"></i>
                </div>
                <div>
                  <h3 class="card-title">Envoyer un message</h3>
                  <p class="card-sub">Réponse sous 24–48h</p>
                </div>
              </div>
              <div class="field">
                <label class="f-label">Nom</label>
                <input type="text" class="f-input" placeholder="Jean Dupont">
              </div>
              <div class="field">
                <label class="f-label">Email</label>
                <input type="email" class="f-input" placeholder="jean@exemple.fr">
              </div>
              <div class="field">
                <label class="f-label">Message</label>
                <textarea class="f-input f-textarea" placeholder="Votre message..."></textarea>
              </div>
              <button class="btn-mail">Envoyer</button>
            </div>

            <!-- BLOC CHAT -->
            <div class="chat-card">
              <div class="chat-top">
                <div class="ai-avatar">
                  ✦
                  <div class="ai-dot"></div>
                </div>
                <div>
                  <p class="chat-name">ShopAI</p>
                  <p class="chat-status">En ligne · répond instantanément</p>
                </div>
              </div>

              <div class="chat-messages" ref="chatMessages">
                <div class="bubble-row">
                  <div class="bubble-avatar ai-av">✦</div>
                  <div>
                    <div class="bubble bubble-ai">
                      Bonjour 👋 Je suis ShopAI, votre assistant ShopEasy. Comment puis-je vous aider ?
                      <span class="bubble-time">maintenant</span>
                    </div>
                    <div class="quick-chips" v-if="showChips">
                      <span class="chip" v-for="c in chips" :key="c" @click="sendChip(c)">{{ c }}</span>
                    </div>
                  </div>
                </div>

                <div
                  v-for="(msg, i) in messages"
                  :key="i"
                  class="bubble-row"
                  :class="{ 'row-reverse': msg.type === 'user' }"
                >
                  <div class="bubble-avatar" :class="msg.type === 'ai' ? 'ai-av' : 'user-av'">
                    {{ msg.type === 'ai' ? '✦' : '👤' }}
                  </div>
                  <div class="bubble" :class="msg.type === 'ai' ? 'bubble-ai' : 'bubble-user'">
                    {{ msg.text }}
                    <span class="bubble-time">{{ msg.time }}</span>
                  </div>
                </div>

                <div class="bubble-row" v-if="typing">
                  <div class="bubble-avatar ai-av">✦</div>
                  <div class="typing-bubble">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                  </div>
                </div>
              </div>

              <div class="chat-input-area">
                <textarea
                  class="chat-input"
                  v-model="inputText"
                  placeholder="AI non-connecté..."
                  @keydown.enter.prevent="sendMessage"
                  rows="1"
                ></textarea>
                <button class="send-btn" @click="sendMessage">➤</button>
              </div>
            </div>

          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>