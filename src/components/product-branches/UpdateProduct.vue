<template>
  <div class="createProduct">
    <div class="form">
      <h4 class="title">Update Product</h4>
      <div class="form-body">
        <div class="item item1">
          <label for="name">Product Name</label>
          <input
            type="text"
            class="inputField"
            id="name"
            v-model="productData.name"
          />
          <small style="color: red" v-show="nameError"
            >Product name is required.</small
          >
        </div>

        <div class="item item2">
          <label for="category">Product Category</label>
          <select
            class="inputField"
            id="category"
            v-model="productData.category"
          >
            <option
              class="opt"
              v-for="(category, index) in categories"
              :key="index"
              :value="category._id"
              :selected="category.id === productData.category"
            >
              {{ category.category_name }}
            </option>
          </select>
        </div>

        <div class="item item3">
          <label for="price">Product Price</label>
          <input
            type="number"
            class="inputField"
            id="price"
            v-model="productData.price"
          />
          <small style="color: red" v-show="priceError"
            >Product price is required.</small
          >
        </div>

        <div class="item item4">
          <label for="image" v-show="photo === null"
            ><i class="fa-solid fa-plus"></i>Choose a photo</label
          >
          <input
            v-show="photo != null"
            type="file"
            class="inputField"
            id="image"
            @change="selectImage"
          />
        </div>

        <div class="item item5">
          <label for="description">Product Summary</label>
          <textarea
            class="inputField"
            id="description"
            cols="30"
            rows="10"
            v-model="productData.summary"
          ></textarea>
          <small style="color: red" v-show="summaryError"
            >Product summary is required.</small
          >
        </div>

        <div class="item item6">
          <label for="count">Product Count</label>
          <input
            type="number"
            class="inputField"
            id="count"
            v-model="productData.stock_code"
          />
          <small style="color: red" v-show="stockCodeError"
            >Product stock code is required.</small
          >
        </div>

        <div class="item7">
          <button type="button" class="btn" @click="updateProductData()">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'UpdateProduct',
  data() {
    return {
      nameError: false,
      priceError: false,
      stockCodeError: false,
      summaryError: false,
      updateProductStatus: false,

      photo: null,
    };
  },
  props: ['product', 'categories'],
  computed: {
    productData() {
      return {
        // "id": this.product.id,
        name: this.product.name,
        category: this.product.category_id,
        price: this.product.price,
        stock_code: this.product.stock_code,
        summary: this.product.summary,
      };
    },
  },
  methods: {
    ...mapActions('Products', ['updateProduct']),
    selectImage(event) {
      this.photo = event.target.files[0];
      // console.log(event.target.files[0]);
    },
    async updateProductData() {
      this.clearValidationMessage();
      this.updateProductValidation();
      if (this.updateProductStatus === true) {
        let formData = new FormData();
        formData.append('id', this.product.id);
        formData.append('name', this.productData.name);
        formData.append('category', this.productData.category);
        formData.append('price', this.productData.price);
        formData.append('stock_code', this.productData.stock_code);
        formData.append('summary', this.productData.summary);
        formData.append('photo', this.image);

        await this.updateProduct(formData);
        this.$emit('previousPage', 'productTable');
        this.clearValidationMessage();
        this.$emit('toastAlert', 'update');
      }
    },
    updateProductValidation() {
      if (this.productData.name === '') {
        this.nameError = true;
        return;
      }
      if (this.productData.price === '') {
        this.priceError = true;
        return;
      }
      if (this.productData.summary === '') {
        this.summaryError = true;
        return;
      }
      if (this.productData.stock_code === '') {
        this.stockCodeError = true;
        return;
      }
      this.updateProductStatus = true;
    },
    clearValidationMessage() {
      (this.nameError = false),
        (this.priceError = false),
        (this.stockCodeError = false),
        (this.summaryError = false),
        (this.updateProductStatus = false);
    },
  },
};
</script>

<style scoped>
.createProduct {
  width: 100%;
}
.form {
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto 12px auto;
}
.form .title {
  width: 100%;
  text-align: center;
  margin: 10px 0 10px 0;
  padding: 15px 0;
  font-size: 1.1rem;
  background: teal;
  color: #fff;
}
.item1 {
  grid-area: one;
}
.item2 {
  grid-area: two;
}
.item3 {
  grid-area: three;
}
.item4 {
  grid-area: four;
}
.item5 {
  grid-area: five;
}
.item6 {
  grid-area: six;
}
.item7 {
  grid-area: seven;
}
.form-body {
  display: grid;
  grid-template-areas: 'one one five five' 'two two five five' 'three three five five' 'four four six six' '. . seven seven';
  grid-template-columns: auto auto auto auto;
  gap: 10px;
}
.form-body .item {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
.form-body .item label {
  margin: 6px 0 5px 0;
}
.form-body .item .inputField {
  padding: 10px 8px;
  border-radius: 6px;
  border: 1px solid #b3e0dc;
}
.form-body .item2 .inputField .opt {
  color: teal;
  font-size: 1rem;
}
.form-body .item4 label {
  margin-top: 15px;
  padding: 10px 8px;
  border-radius: 6px;
  border: 1px solid #b3e0dc;
}
.form-body .item4 label i {
  margin-right: 10px;
  opacity: 0.8;
}
.form-body .item4 .inputField[type='file'] {
  margin-top: 10px;
}
.form-body .item7 .btn {
  width: 100%;
  margin: 15px 8px 0 8px;
  padding: 10px 0;
  border-radius: 5px;
  font-size: 1rem;
  color: #fff;
  background: teal;
  border-style: none;
  cursor: pointer;
  transition: 0.5s;
}
.form-body .item .inputField:focus {
  border: 2px solid #4fb9af;
}
.form-body .item7 .btn:active {
  transform: scale(0.95);
  background: #4fb9af;
}

/* make it responsive */
@media (max-width: 991px) {
  .form {
    width: 96%;
  }
  .form .title {
    margin: 8px 0 8px 0;
    padding: 10px 0;
    font-size: 1rem;
  }
  .form-body .item .inputField,
  .form-body .item4 label {
    padding: 7px 5px;
  }
  .form-body .item label,
  .form-body .item4 label,
  .form-body .item7 .btn {
    font-size: 0.9rem;
  }
  .form-body .item7 .btn {
    width: 96%;
    margin: 12px 8px 0 8px;
    padding: 7px 0;
  }
}
@media (max-width: 768px) {
  .form .title {
    margin: 5px 0 5px 0;
    padding: 8px 0;
    font-size: 0.9rem;
  }
  .form-body .item .inputField,
  .form-body .item4 label {
    padding: 5px 4px;
  }
  .form-body .item label,
  .form-body .item4 label,
  .form-body .item7 .btn {
    font-size: 0.8rem;
  }
  .form-body .item7 .btn {
    width: 96%;
    padding: 7px 0;
  }
}
@media (max-width: 650px) {
  .form-body {
    grid-template-areas: 'one one' 'two two' 'three three' 'four four' 'five five' 'six six' '. seven';
    grid-template-columns: auto auto;
    gap: 7px;
  }
}
</style>
