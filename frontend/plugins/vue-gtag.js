import Vue from 'vue';
import VueGtag from '~/plugins/vue-gtag';

export default ({ app }) => {
  Vue.use(
    VueGtag,
    {
      config: {
        id: process.env.GA_ID,
      },
      appName: 'apply-sparcs',
    },
    app.router
  );
};
