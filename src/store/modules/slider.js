import axios from 'axios';

export default {
  namespaced: true,
  state: {
    // All Sliders //
    sliders: null,

    simpleSliders: null,

    sliderPaginationPoints: {
      start: 0,
      end: 3,
    },
  },

  getters: {
    getSliders: (state) => state.sliders,

    getSimpleSliders: (state) => state.simpleSliders,

    paginatedSliders: (state) =>
      state.sliders.slice(
        state.sliderPaginationPoints.start,
        state.sliderPaginationPoints.end,
      ),

    getSliderCurrentPage: (state) => {
      return (
        state.sliderPaginationPoints.end /
        (state.sliderPaginationPoints.end - state.sliderPaginationPoints.start)
      );
    },
  },

  mutations: {
    setSliders: (state, sliders) => (state.sliders = sliders.reverse()),

    setTakenSliders: (state, sliders) => (state.simpleSliders = sliders),

    setSlidersPaginationPoints: (state, points) => {
      state.sliderPaginationPoints.start = points.start;
      state.sliderPaginationPoints.end = points.end;
    },

    removeSlider: (state, removeId) => {
      state.sliders = state.sliders.filter((slider) => {
        return slider.id !== removeId;
      });
    },

    addNewSlider: (state, newSlider) => state.sliders.unshift(newSlider),

    updateSlider: (state, updatedSlider) => {
      state.sliders.array.forEach((slider) => {
        if (slider.id === updatedSlider._id) {
          slider.name = updatedSlider.name;
        }
      });
    },
  },

  actions: {
    allSliders: async ({ commit }) => {
      const { data } = await axios.get('http://127.0.0.1:3000/api/sliders');
      console.log('sliders', data.data.data);

      commit('setSliders', data.data.data);
    },

    deleteSlider: async ({ commit }, removeId) => {
      await axios.delete(`http://127.0.0.1:3000/api/sliders/${removeId}`);
      commit('removeSliders', removeId);
    },

    updateSlider: async ({ commit }, newSlider) => {
      let { data } = await axios.post(
        `http://127.0.0.1:3000/api/sliders/${newSlider.id}`,
        newSlider,
      );
      commit('updatedSlider', data);
    },

    createSlider: async ({ commit }, newSlider) => {
      let { data } = await axios.post(
        'http://127.0.0.1:3000/api/sliders',
        newSlider,
      );
      commit('addNewSlider', data.data);
    },

    takeSliders: async ({ commit }) => {
      const { data } = await axios.get(`http://127.0.0.1:3000/api/sliders`);
      commit('setTakenSliders', data.data);
    },

    sliderPaginator: ({ commit }, page) => {
      let start = (page.currentPage - 1) * page.perPage;
      let end = start + page.perPage;
      let points = {
        start: start,
        end: end,
      };
      commit('setSliderPaginationPoints', points);
    },
  },
};
