import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'app',
  state: () => ({
    jwtToken: null, 
  }),
  actions: {
    setJwtToken(token) {
      this.jwtToken = token;
      this.saveToLocalStorage(); 
    },
    loadFromLocalStorage() {
      this.jwtToken = localStorage.getItem('jwtToken');
    },
    saveToLocalStorage() {
      localStorage.setItem('jwtToken', this.jwtToken);
    },
  },
});
