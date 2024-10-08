import axios from 'axios';

export default {
  namespaced: true,
  state: {
    /* All Products */
    products: null,

    /* Pagination Data */
    links: null,
    currentPage: null,
    lastPage: null,
    firstPageUrl: null,
    lastPageUrl: null,
    previousPageUrl: null,
    nextPageUrl: null,
    perPage: null,
    totalProduct: null,
  },

  getters: {
    /* Get All Products Data */
    getProducts: (state) => state.products,

    /* Paginated Products Data */
    paginatedProducts: (state) =>
      state.products.slice(
        state.productPaginationPoints.start,
        state.productPaginationPoints.end,
      ),

    /*  Not to Change Current Products Paginated Data, When Change Other Route */
    getProductCurrentPage: (state) => {
      return (
        state.productPaginationPoints.end /
        (state.productPaginationPoints.end -
          state.productPaginationPoints.start)
      );
    },

    /* Get Pagination Data */
    getLinks: (state) => state.links,
    getCurrentPage: (state) => state.currentPage,
    getLastPage: (state) => state.lastPage,
    getFirstPageUrl: (state) => state.firstPageUrl,
    getLastPageUrl: (state) => state.lastPageUrl,
    getPreviousPageUrl: (state) => state.previousPageUrl,
    getNextPageUrl: (state) => state.nextPageUrl,
    getPerPage: (state) => state.perPage,
    getTotalProduct: (state) => state.totalProduct,
  },

  mutations: {
    /* Set All Products Data */
    setProducts: (state, data) => {
      // data.data.forEach(product => {
      //     product.image = 'https://nooneuse.shop/storage/products/' + product.image;
      // })
      state.products = data;

      state.links = data.links;
      state.firstPageUrl = data.first_page_url;
      state.lastPageUrl = data.last_page_url;
      state.currentPage = data.current_page;
      state.lastPage = data.last_page;
      state.perPage = data.per_page;
      state.totalProduct = data.total;
      state.previousPageUrl = data.prev_page_url;
      state.nextPageUrl = data.next_page_url;
    },

    /* Remove Deleted Products Data From State */
    removeProduct: (state, removeId) => {
      state.products = state.products.filter((product) => {
        return product.id != removeId;
      });
    },

    /* Add New Product Data To State */
    addNewProduct: (state, newProduct) => {
      newProduct.image =
        'https://nooneuse.shop/storage/products/' + newProduct.image;
      state.products.unshift(newProduct);
    },

    /* Add Updated Product Data To State */
    updateOldProduct: (state, updatedProduct) => {
      updatedProduct.image =
        'https://nooneuse.shop/storage/products/' + updatedProduct.image;
      state.products = state.products.filter((product) => {
        return product.id !== updatedProduct.id;
      });
      state.products.unshift(updatedProduct);
    },
  },

  actions: {
    /* Get All Products Data */
    allProducts: async ({ commit }) => {
      const { data } = await axios.get('http://127.0.0.1:3000/api/products');
      console.log('products', data.data.data);

      commit('setProducts', data.data.data);
    },

    /* Delete Product  */
    deleteProduct: async ({ commit }, removeId) => {
      await axios.delete(`http://127.0.0.1:3000/api/products/${removeId}`);
      commit('removeProduct', removeId);
    },

    /* Create New Product */
    createProduct: async ({ commit }, newProduct) => {
      let { data } = await axios.post(
        'http://127.0.0.1:3000/api/products/createProduct',
        newProduct,
      );
      commit('addNewProduct', data);
    },

    /* Update Product */
    updateProduct: async ({ commit }, updateData) => {
      try {
        let { data } = await axios.post(
          `http://127.0.0.1:3000/api/products/updateProduct`,
          updateData,
        );
        commit('updateOldProduct', data);
      } catch (error) {
        console.log(error);
      }
    },

    /* Search Products */
    searchProduct: async ({ commit }, searchKey) => {
      const { data } = await axios.get(
        `https://nooneuse.shop/api/admin/product/getAllProducts/${searchKey}`,
      );
      commit('setProducts', data);
    },

    /* Filter Products By Category */
    filterProductsByCategory: async ({ commit }, id) => {
      const { data } = await axios.get(
        `https://nooneuse.shop/api/admin/product/filterProducts/${id}`,
      );
      commit('setProducts', data);
    },
  },
};
