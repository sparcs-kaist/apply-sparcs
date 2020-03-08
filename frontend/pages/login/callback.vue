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
  data() {
    return {
      code: ''
    };
  },

  async mounted() {
    const { code, state } = this.$route.query;

    const res = await this.$axios.$post('auth/login/callback', {
      code,
      state
    });

    if (!res.result) {
      this.$router.replace('/login/error');
    } else {
      this.$store.dispatch('login', res.payload);
      this.$router.replace('/apply');
    }

    this.code = code;
  }
};
</script>
