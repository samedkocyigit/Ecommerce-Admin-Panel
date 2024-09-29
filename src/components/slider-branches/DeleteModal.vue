<template>
  <!-- Slider Create Modal -->
  <div class="delete-modal">
    <Modal @close="$emit('close')">
      <h4>Do you really want to delete permanantly?</h4>
      <div class="btn-box">
        <button @click="deleteChosenSlider(slider._id)">Delete</button>
        <button @click="$emit('close')">Cancel</button>
      </div>
    </Modal>
  </div>
  <!-- Slider Create Modal End -->
</template>

<script>
import { mapActions } from 'vuex';
import Modal from '../AllModals.vue';

export default {
  props: {
    slider: {
      type: Object,
      required: true,
    },
  },
  components: { Modal },
  methods: {
    ...mapActions('Categories', ['deleteSlider']),
    /* Delete Slider */
    deleteChosenSlider(id) {
      this.deleteSlider(id);
      this.$emit('done', 'Deleted-Slider.');
    },
  },
};
</script>

<style src="../../assets/css/category.css" scoped></style>
