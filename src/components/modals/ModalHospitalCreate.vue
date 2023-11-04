<template>
  <div
    class="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50 cursor-pointer"
    v-if="isModalVisible"
    @click="closeModal"
  >
    <div
      class="modal-content h-4/5 bg-gradient-to-r from-stone-500 via-gray-600 to-indigo-800 bg-opacity-60 p-5 rounded-lg shadow-md cursor-default"
      @click.stop
    >
      <HospitalCreate
        class=" "
        @close-modal="closeModal"
        @hospital-created="closeModal"
      />
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
  