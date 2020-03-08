import cookie from 'cookie';

export const state = () => ({
  user: null
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { req, $axios }) {
    if (!(req && req.headers && req.headers.cookie)) return;

    const cookies = cookie.parse(req.headers.cookie);
    if (!cookies.PHPSESSID) return;

    console.log('auth check');
    const { result, payload } = await $axios.$get('/auth/check', {
      headers: {
        Authorization: cookies.PHPSESSID
      }
    });

    if (result) commit('setUser', payload.user);
  }
};
