<script setup lang="js">
import { ref, computed } from 'vue';
import { ROOMS } from '../assets/constants';
import { ArrowRight, Star, Coffee, Mountain, Award, Users, Maximize } from 'lucide-vue-next';

const props = defineProps({
  onNavigate: Function
});

const activeCategory = ref('All');
const categories = ['All', 'Rooms', 'Suites', 'Residences'];

const filteredRooms = computed(() => {
  return activeCategory.value === 'All' 
    ? ROOMS 
    : ROOMS.filter(room => room.category === activeCategory.value);
});
</script>

<template>
  <div class="animate-in fade-in duration-500">
    <!-- Hero Section -->
    <section class="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="https://picsum.photos/1920/1080?grayscale" alt="Luxury Hotel Lobby" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/40" />
      </div>
      <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h2 class="text-sm md:text-base tracking-[0.3em] uppercase mb-4 text-gold-400 font-semibold">Welcome to Zermatt</h2>
        <h1 class="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight">
          Elevate Your <span class="italic">Senses</span>
        </h1>
        <p class="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-light">
          An award-winning sanctuary nestled in the Swiss Alps, where luxury knows no altitude.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="props.onNavigate('BOOKING')" class="bg-gold-600 text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-gold-500 transition-colors duration-300">
            Book Your Stay
          </button>
          <button @click="props.onNavigate('ABOUT')" class="border border-white text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-colors duration-300">
            Discover More
          </button>
        </div>
      </div>
    </section>

    <!-- Intro Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="space-y-6">
          <h3 class="text-gold-600 uppercase tracking-widest text-sm font-bold">The Experience</h3>
          <h2 class="text-4xl font-serif text-stone-900">A Legacy of Luxury</h2>
          <p class="text-stone-600 leading-relaxed">
            Founded in 1924, Lumina Grand has been the preferred destination for royalty, artists, and discerning travelers seeking privacy and unparalleled service. Our newly renovated suites combine heritage charm with contemporary design, offering breathtaking views of the Matterhorn.
          </p>
          <div class="pt-4">
            <button @click="props.onNavigate('ABOUT')" class="flex items-center gap-2 text-stone-900 font-medium hover:text-gold-600 transition-colors">
              Read our story <ArrowRight size="18" />
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <img src="https://picsum.photos/400/500?random=1" alt="Interior Detail" class="w-full h-64 object-cover mt-12 shadow-lg" />
          <img src="https://picsum.photos/400/500?random=2" alt="Mountain View" class="w-full h-64 object-cover shadow-lg" />
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-stone-900 py-20 text-white border-b border-stone-800">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h3 class="text-gold-500 uppercase tracking-widest text-xs font-bold mb-3">By The Numbers</h3>
          <h2 class="font-serif text-3xl md:text-4xl text-white">Our Journey of Excellence</h2>
          <p class="text-stone-400 mt-4 max-w-lg mx-auto font-light">
            This is how far Lumina Grand has come in defining alpine luxury.
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
          <div class="p-6 border border-stone-800 rounded-sm hover:border-gold-600/50 transition-all duration-500 group bg-stone-900/50">
            <div class="text-4xl md:text-5xl font-serif text-white mb-2 group-hover:text-gold-500 transition-colors">100+</div>
            <div class="text-xs uppercase tracking-widest text-stone-500 group-hover:text-stone-300 transition-colors">Years of Heritage</div>
          </div>
          <div class="p-6 border border-stone-800 rounded-sm hover:border-gold-600/50 transition-all duration-500 group bg-stone-900/50">
            <div class="text-4xl md:text-5xl font-serif text-white mb-2 group-hover:text-gold-500 transition-colors">50k+</div>
            <div class="text-xs uppercase tracking-widest text-stone-500 group-hover:text-stone-300 transition-colors">Guests Welcomed</div>
          </div>
          <div class="p-6 border border-stone-800 rounded-sm hover:border-gold-600/50 transition-all duration-500 group bg-stone-900/50">
            <div class="text-4xl md:text-5xl font-serif text-white mb-2 group-hover:text-gold-500 transition-colors">85</div>
            <div class="text-xs uppercase tracking-widest text-stone-500 group-hover:text-stone-300 transition-colors">Rooms & Suites</div>
          </div>
          <div class="p-6 border border-stone-800 rounded-sm hover:border-gold-600/50 transition-all duration-500 group bg-stone-900/50">
            <div class="text-4xl md:text-5xl font-serif text-white mb-2 group-hover:text-gold-500 transition-colors">4.9</div>
            <div class="text-xs uppercase tracking-widest text-stone-500 group-hover:text-stone-300 transition-colors">Average Rating</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Amenities Icons -->
    <section class="bg-stone-100 py-16 border-y border-stone-200">
      <div class="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 text-stone-500">
        <div class="flex flex-col items-center gap-3">
          <Star size="32" class="text-gold-600" />
          <span class="text-sm uppercase tracking-wider">5-Star Rating</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <Mountain size="32" class="text-gold-600" />
          <span class="text-sm uppercase tracking-wider">Alpine Views</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <Coffee size="32" class="text-gold-600" />
          <span class="text-sm uppercase tracking-wider">Fine Dining</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <Award size="32" class="text-gold-600" />
          <span class="text-sm uppercase tracking-wider">Awarded Spa</span>
        </div>
      </div>
    </section>

    <!-- Room Collection -->
    <section class="py-24 bg-stone-50" id="collection">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h3 class="text-gold-600 uppercase tracking-widest text-sm font-bold mb-3">Accommodations</h3>
          <h2 class="text-4xl font-serif text-stone-900 mb-8">Our Collection</h2>

          <!-- Category Filter -->
          <div class="flex flex-wrap justify-center gap-2 mb-12">
            <button 
              v-for="cat in categories" 
              :key="cat" 
              @click="activeCategory = cat"
              :class="['px-6 py-2 rounded-full text-sm font-medium transition-all duration-300', activeCategory === cat ? 'bg-stone-900 text-white shadow-md scale-105' : 'bg-white text-stone-600 hover:bg-stone-200']"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="room in filteredRooms" :key="room.id" class="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div class="relative overflow-hidden h-64">
              <img :src="room.image" :alt="room.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-stone-900 rounded-sm">{{ room.category }}</div>
              <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div class="p-8 flex-grow flex flex-col">
              <div class="flex justify-between items-baseline mb-2">
                <h3 class="text-xl font-serif text-stone-900">{{ room.name }}</h3>
              </div>
              <p class="text-stone-500 text-sm leading-relaxed mb-6 flex-grow">{{ room.description }}</p>
              <div class="border-t border-stone-100 pt-6 mt-auto">
                <div class="flex items-center gap-6 text-stone-400 text-xs uppercase tracking-wider mb-6">
                  <div class="flex items-center gap-2">
                    <Users size="14" /> {{ room.capacity }} Guests
                  </div>
                  <div class="flex items-center gap-2">
                    <Maximize size="14" /> {{ room.amenities.find(a => a.includes('sqm')) || 'Spacious' }}
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-lg font-bold text-stone-900">${{ room.price }}</span>
                    <span class="text-xs text-stone-400"> / night</span>
                  </div>
                  <button @click="props.onNavigate('BOOKING')" class="group/btn flex items-center gap-2 text-gold-600 text-sm font-bold uppercase tracking-wider hover:text-gold-500 transition-colors">
                    Book Now <ArrowRight size="16" class="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <TestimonialSection />
  </div>
</template>
