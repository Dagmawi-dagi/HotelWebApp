<script setup>
import { MessageCircle, X, Send, Sparkles } from 'lucide-vue-next'
import { sendMessageToGemini } from '../services/gemini.js'

const isOpen = ref(false)
const inputText = ref('')
const isLoading = ref(false)
const messagesEndRef = ref(null)

const messages = ref([
  {
    id: 'welcome',
    role: 'model',
    text: 'Bonjour! I am Dagi, your personal concierge. How may I assist you with your stay at Lumina Grand today?',
    timestamp: new Date()
  }
])

const scrollToBottom = async () => {
  await nextTick()
  messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' })
}

watch([messages, isOpen], scrollToBottom)

const handleSend = async () => {
  if (!inputText.value.trim() || isLoading.value) return

  const userMsg = {
    id: Date.now().toString(),
    role: 'user',
    text: inputText.value,
    timestamp: new Date()
  }

  messages.value.push(userMsg)
  inputText.value = ''
  isLoading.value = true

  try {
    const stream = await sendMessageToGemini(userMsg.text)

    const modelMsgId = (Date.now() + 1).toString()
    messages.value.push({
      id: modelMsgId,
      role: 'model',
      text: '',
      timestamp: new Date()
    })

    let fullText = ''

    for await (const chunk of stream) {
      fullText += chunk
      const msg = messages.value.find(m => m.id === modelMsgId)
      if (msg) msg.text = fullText
    }
  } catch (err) {
    console.error(err)
    messages.value.push({
      id: Date.now().toString(),
      role: 'model',
      text: 'I apologize, but I am having trouble connecting to the concierge service right now.',
      timestamp: new Date()
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
    <!-- Chat Window -->
    <div
      v-if="isOpen"
      class="bg-white rounded-lg shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-stone-200 animate-in fade-in slide-in-from-bottom-10 duration-300 flex flex-col h-[500px]"
    >
      <!-- Header -->
      <div class="bg-stone-900 text-white p-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="bg-gold-500 p-1.5 rounded-full">
            <Sparkles class="text-white w-4 h-4" />
          </div>
          <div>
            <h3 class="font-serif font-bold">Dagi</h3>
            <p class="text-xs text-stone-300">AI Concierge</p>
          </div>
        </div>
        <button @click="isOpen = false" class="text-stone-400 hover:text-white">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']"
        >
          <div
            :class="[
              'max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm',
              msg.role === 'user'
                ? 'bg-stone-800 text-white rounded-tr-none'
                : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
            ]"
          >
            {{ msg.text }}
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isLoading" class="flex justify-start">
          <div class="bg-white p-3 rounded-2xl rounded-tl-none border border-stone-200 shadow-sm flex gap-1">
            <span class="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></span>
            <span class="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-75"></span>
            <span class="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-150"></span>
          </div>
        </div>

        <div ref="messagesEndRef" />
      </div>

      <!-- Input -->
      <div class="p-3 bg-white border-t border-stone-100 flex gap-2">
        <input
          v-model="inputText"
          @keydown.enter.prevent="handleSend"
          type="text"
          placeholder="Ask about rooms, dining..."
          class="flex-1 bg-stone-50 border border-stone-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
        />
        <button
          @click="handleSend"
          :disabled="isLoading || !inputText.trim()"
          class="bg-gold-600 text-white p-2.5 rounded-full hover:bg-gold-500 disabled:opacity-50 transition-colors"
        >
          <Send class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Toggle Button -->
    <button
      @click="isOpen = !isOpen"
      class="group flex items-center gap-2 bg-stone-900 text-white pl-4 pr-2 py-3 rounded-full shadow-lg hover:bg-gold-600 transition-all duration-300"
    >
      <span class="text-sm font-medium">Concierge</span>
      <div class="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
        <component :is="isOpen ? X : MessageCircle" class="w-5 h-5" />
      </div>
    </button>
  </div>
</template>


