import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: Routes,
  mode: 'history' // default is hash mode
});

// Custom directives for use v-theme for all component (GLOBAL)
Vue.directive('theme', {
  bind(el, binding, vnode) {
    if(binding.value=='wide') {
      el.style.maxWidth = '1200px';
    } else if(binding.value=='narrow') {
      el.style.maxWidth = '560px';
    }
    if(binding.arg=='column') {
      el.style.background = '#ddd';
      el.style.padding = '20px';
    }
  }
});
// Create filters for all component can use (GLOBAL)
Vue.filter('snippet', (value) => {
  return value.slice(0, 100) + '...';
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
