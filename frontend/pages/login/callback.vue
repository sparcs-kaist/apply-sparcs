<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <span>
            Pending login request...<br />
            Please contact us with the info below if an error occurs.<br /><br />
            Code: {{ code }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData(context) {
    const { code, state } = context.query;

    if (process.server) {
      const res = await context.app.$axios
        .$post('auth/login/callback', {
          code,
          state
        })
        .then((data) => {
          if (data.result) {
            return true;
          } else {
            return false;
          }
        });

      if (!res) {
        context.redirect('/login/error');
      } else {
        context.store.commit('setUser', {
          code,
          korName: '테스트'
        });

        context.redirect('/login/success');
      }
    }

    return { code, state };
  }
};
</script>
