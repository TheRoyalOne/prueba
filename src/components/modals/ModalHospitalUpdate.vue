<template>
  <div
    class="modal fixed top-0 left-0 w-full h-full bg-opacity-60 bg-black flex justify-center items-center z-50 cursor-pointer"
    v-if="isModalVisible"
    @click="closeModal"
  >
    <div class="modal-content bg-white p-4 rounded-lg shadow-md cursor-default h-4/5" @click.stop>
      <HospitalUpdate
        class=" "
        :hospital="selectedHospital"
        :modal="selectedModal"
        @close-modal="closeModal"
        @hospital-updated="closeModal"
      />
    </div>
  </div>
</template>
  
  <script>
import HospitalUpdate from "@/components/actions/HospitalUpdate.vue";

export default {
  props: {
    showModal: Boolean,
    selectedHospital: Object,
    selectedModal: String,
  },
  components: {
    HospitalUpdate,
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
  