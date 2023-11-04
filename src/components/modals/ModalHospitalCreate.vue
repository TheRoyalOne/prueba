<template>
  <div class="modal" v-if="isModalVisible" @click="closeModal">
    <div class="modal-content h-4/5" @click.stop>
      <HospitalCreate class=" " @close-modal="closeModal" @hospital-created="closeModal"/>
    </div>
  </div>
</template>
  
  <script>
import HospitalCreate from "@/components/actions/HospitalCreate.vue";

export default {
  props: {
    showModal: Boolean,
  },
  components: {
    HospitalCreate,
  },
  data() {
    return {
      isModalVisible: this.showModal,
    };
  },
  methods: {
    closeModal() {
      if (this.isModalVisible) {
        this.$emit("close-modal");
        this.isModalVisible = false;
      }
    },
    closeModalOnEscape(event) {
      if (event.key === "Escape") {
        this.closeModal();
      }
    },
  },
  watch: {
    showModal(newVal) {
      this.isModalVisible = newVal;
      if (newVal) {
        window.addEventListener("keydown", this.closeModalOnEscape);
      } else {
        window.removeEventListener("keydown", this.closeModalOnEscape);
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.closeModalOnEscape);
  },
};
</script>
  
  <style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  cursor: pointer;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: auto;
}
</style>
  