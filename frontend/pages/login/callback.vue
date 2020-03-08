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
      const res = await context.app.$axios.$post('auth/login/callback', {
        code,
        state
      });
      console.log('callback check', res);

      if (!res.result) {
        context.redirect('/login/error');
      } else {
        console.log('callback check true', res.payload.token);
        context.res.setHeader('Set-Cookie', [`PHPSESSID=${res.payload.token}`]);
        context.redirect('/apply');
      }
    }

    return { code, state };
  }
};
</script>
