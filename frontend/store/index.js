import cookie from 'cookie';

export const state = () => ({
  user: null,
  due: 1630681199000, // 2021-09-03 00:00:00 UTC+09
  time: Date.now()
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  updateTime(state) {
    state.time = Date.now();
  }
};

export const getters = {
  overdue(state) {
    return state.time >= state.due;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { req, $axios }) {
    if (!(req && req.headers && req.headers.cookie)) return;
    const cookies = cookie.parse(req.headers.cookie);

    if (!cookies.PHPSESSID) return;

    const { result, payload } = await $axios.$get('/auth/check', {
      headers: {
        Authorization: cookies.PHPSESSID
      }
    });

    if (result) {
      payload.token = cookies.PHPSESSID;
      commit('setUser', payload);
    }
  },

  login({ commit }, payload) {
    document.cookie = `PHPSESSID=${payload.token}; path=/`;
    commit('setUser', payload);
  },

  logout({ commit }, payload) {
    document.cookie = `PHPSESSID=; path=/`;
    commit('setUser', null);
  }
};
