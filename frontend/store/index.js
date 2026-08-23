import cookie from 'cookie';

export const state = () => ({
  user: null,
  open: 1787497200 * 1000, // Mon Aug 24 2026 00:00:00 GMT+0900 (한국 표준시)
  due: 1788447599 * 1000, // Thu Sep 03 2026 23:59:59 GMT+0900 (한국 표준시) Reference: https://www.unixtimestamp.com/
  time: Date.now(),
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  updateTime(state) {
    state.time = Date.now();
  },
};

export const getters = {
  beforeopen(state) {
    return state.time < state.open;
  },

  overdue(state) {
    return state.time >= state.due;
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { req, $axios }) {
    if (!(req && req.headers && req.headers.cookie)) return;
    const cookies = cookie.parse(req.headers.cookie);

    if (!cookies.PHPSESSID) return;

    const { result, payload } = await $axios.$get('/auth/check', {
      headers: {
        Authorization: cookies.PHPSESSID,
      },
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
  },
};
