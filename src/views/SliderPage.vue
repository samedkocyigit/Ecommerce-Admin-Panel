<template>
  <div class="branch-parent">
    <!-- Toast Alert -->
    <transition name="toast">
      <div class="toast" v-if="toastStatus">
        <h3>{{ toastMessage }}</h3>
      </div>
    </transition>
    <!-- Toast Alert End -->

    <!-- Create Modal-->
    <CreateModal
      v-if="createSliderStatus"
      @done="modalToggle"
      @close="closeModals"
    ></CreateModal>

    <!-- Delete Modal-->
    <DeleteModal
      v-if="deleteSliderStatus"
      :slider="slider"
      @done="modalToggle"
      @close="closeModals"
    ></DeleteModal>

    <!-- Update Modal-->
    <UpdateModal
      v-if="updateSliderStatus"
      :slider="slider"
      @done="modalToggle"
      @close="closeModals"
    ></UpdateModal>

    <!-- Main -->
    <div class="main" :class="{ toggleWidth: getToggleStatus }">
      <!-- Top Bar -->
      <TopBar></TopBar>

      <!-- Slider List -->
      <SliderList @showModal="showModal" />
    </div>
    <!-- Main End -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TopBar from '../components/TopBar.vue';
import SliderList from '../components/slider-branches/SliderList.vue';
import CreateModal from '../components/slider-branches/CreateModal.vue';
import DeleteModal from '../components/slider-branches/DeleteModal.vue';
import UpdateModal from '../components/slider-branches/UpdateModal.vue';
import axios from 'axios';

export default {
  name: 'SliderPage',
  data() {
    return {
      /* Status For Show Associated Modal Or Not */
      createSliderStatus: false,
      updateSliderStatus: false,
      deleteSliderStatus: false,

      /* Validation Message Status For Input Of Modal */
      createError: false,
      updateError: false,

      /* Status For Show Toast And Toast Message */
      toastStatus: false,
      toastMessage: '',

      slider: null,
    };
  },
  components: { TopBar, SliderList, CreateModal, DeleteModal, UpdateModal },
  computed: {
    ...mapGetters(['getToggleStatus']),
  },
  methods: {
    /* Show Modal */
    async showModal(status, id) {
      /* Choose Slider To Show On Modal */
      if (id !== null) {
        await this.takeASlider(id);
      }

      this.modalToggle(status);
    },

    /* Delete Slider */
    deleteChosenSlider(id) {
      this.deleteSlider(id);
      this.modalToggle('delete');

      this.toastMessage = 'Delete Slider success. ';
      setTimeout(() => (this.toastStatus = true), 1000);
      setTimeout(() => (this.toastStatus = false), 3000);
      return;
    },

    /* Update Slider */
    async updateChosenSlider(SliderId, SliderTitle) {
      if (this.SliderTitle === '') {
        this.updateError = true;
        return;
      }

      let newSlider = {
        id: SliderId,
        title: SliderTitle,
      };

      await this.updateSlider(newSlider);
      this.getProducts.forEach((product) => {
        this.getSliders.forEach((Slider) => {
          if (
            product.Slider_id === Slider.id &&
            product.Slider_title !== Slider.title
          ) {
            product.Slider_title = Slider.title;
          }
        });
      });
      this.changeSliderTitleOfProduct(this.getProducts);
      this.modalToggle('update');

      this.toastMessage = 'Update Slider success. ';
      setTimeout(() => (this.toastStatus = true), 1000);
      setTimeout(() => (this.toastStatus = false), 3000);
    },

    /* To Open and Close Modal */
    modalToggle(status) {
      if (status === 'create') {
        this.createSliderStatus = !this.createSliderStatus;
        this.clearValidationMessage();
        return;
      } else if (status === 'update') {
        this.updateSliderStatus = !this.updateSliderStatus;
        this.clearValidationMessage();
        return;
      } else if (status === 'delete') {
        this.deleteSliderStatus = !this.deleteSliderStatus;
        return;
      } else {
        let statusArr = status.split('-');
        this.toastMessage = statusArr.join(' ');
        this.closeModals();
        this.toastStatus = true;
        setTimeout(() => (this.toastStatus = false), 3000);
      }
    },

    clearValidationMessage() {
      this.createError = false;
      this.updateError = false;
    },

    closeModals() {
      this.createSliderStatus = false;
      this.updateSliderStatus = false;
      this.deleteSliderStatus = false;
    },

    /* Take a Slider */
    async takeASlider(id) {
      let { data } = await axios.get(`http://127.0.0.1:3000/api/sliders/${id}`);
      this.slider = data.data.Slider;
    },
  },
};
</script>

<style src="../assets/css/category.css" scoped></style>
