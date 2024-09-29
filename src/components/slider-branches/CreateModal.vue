<template>
  <!-- Slider Create Modal -->
  <div class="create-modal">
    <Modal @close="$emit('close')">
      <label for="name">Create New Slider</label>
      <input
        type="text"
        id="name"
        placeholder="Enter slider name..."
        v-model="slider.name"
      />
      <small style="color: red" v-if="nameError"
        >Slider name is required.</small
      >

      <label for="mainPhoto">Choose a main photo</label>
      <input
        type="file"
        class="inputField"
        id="mainPhoto"
        placeholder="Choose main photo"
        @change="selectMainPhoto"
      />
      <small style="color: red" v-if="mainPhotoError">
        Main product image is required.
      </small>

      <label for="thumbNailPhoto">Choose a thumbnail photo</label>
      <input
        type="file"
        class="inputField"
        id="thumbNailPhoto"
        placeholder="Choose thumbnail photo"
        @change="selectThumbnailPhoto"
      />
      <small style="color: red" v-if="thumbnailPhotoError">
        Thumbnail image is required.
      </small>

      <div class="btn-box">
        <button @click="createNewSlider">Create</button>
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
  data: () => {
    return {
      slider: {
        name: '',
        mainPhoto: null,
        thumbNailPhoto: null,
      },
      nameError: false,
      mainPhotoError: false,
      thumbnailPhotoError: false,
    };
  },
  components: { Modal },
  methods: {
    ...mapActions('Sliders', ['createSlider']),

    /* Handle Main Photo Selection */
    selectMainPhoto(event) {
      const file = event.target.files[0];
      if (file) {
        this.slider.mainPhoto = file;
        this.mainPhotoError = false;
      } else {
        this.mainPhotoError = true;
      }
    },

    /* Handle Thumbnail Photo Selection */
    selectThumbnailPhoto(event) {
      const file = event.target.files[0];
      if (file) {
        this.slider.thumbNailPhoto = file;
        this.thumbnailPhotoError = false;
      } else {
        this.thumbnailPhotoError = true;
      }
    },

    /* Create New Slider */
    createNewSlider() {
      if (this.slider.sliderName === '') {
        this.nameError = true;
        return;
      } else {
        this.nameError = false;
      }

      if (!this.slider.mainPhoto) {
        this.mainPhotoError = true;
        return;
      }

      if (!this.slider.thumbNailPhoto) {
        this.thumbnailPhotoError = true;
        return;
      }

      let formData = new FormData();
      formData.append('name', this.slider.name);
      formData.append('mainPhoto', this.slider.mainPhoto);
      formData.append('thumbNailPhoto', this.slider.thumbNailPhoto);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      this.createSlider(formData)
        .then(() => {
          this.$emit('done', 'Created-new-slider');
          this.resetForm();
        })
        .catch((error) => {
          console.error('Error creating slider:', error);
        });
    },

    resetForm() {
      this.slider.sliderName = '';
      this.slider.mainPhoto = null;
      this.slider.thumbNailPhoto = null;
      this.nameError = false;
      this.mainPhotoError = false;
      this.thumbnailPhotoError = false;
    },
  },
};
</script>

<style src="../../assets/css/category.css" scoped></style>
