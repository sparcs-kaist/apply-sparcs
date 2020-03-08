<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-half has-text-centered">
            <img
              src="~assets/logo.png"
              alt="logo"
              style="width: 25%; height: 25%;"
            />
            <h2 class="subtitle is-4">2020 봄학기 SPARCS 리크루팅</h2>
            <br />
            <div class="notification is-danger has-text-left">
              COVID-19 확산 상황에 따라 리크루팅 일정이 변동될 수 있습니다.
              <br />변동 시 SPARCS 공식 홈페이지 및 페이스북을 통해
              알려드리겠습니다.
            </div>
            <div class="notification has-text-left">
              [3/9 00:00] 2020 봄학기 SPARCS 리크루팅 지원서 작성이
              시작되었습니다.
            </div>
            <hr />
            <button
              v-if="!this.$store.state.user"
              class="button is-light"
              style="background-color: rgb(235, 161, 42); color: white;"
              @click="login"
            >
              SPARCSSSO로 로그인
            </button>
            <div v-if="this.$store.state.user">
              <h1 style="margin-bottom: 1rem;">
                SPARCSSSO로 로그인 되었습니다. (현재 사용자:
                {{ this.$store.state.user.nameKor }})
              </h1>
              <button
                class="button is-light"
                style="background-color: rgb(235, 161, 42); color: white;"
                @click="login"
              >
                지원서 작성하기
              </button>
              <button class="button is-light" @click="logout">
                로그아웃
              </button>
            </div>
            <hr />
            <a class="button is-light" href="https://sparcs.org">
              Back to SPARCS.org
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    login() {
      this.$axios
        .$post('auth/login')
        .then((data) => {
          window.location = data.payload.url;
        })
        .catch(() => {
          alert('로그인에 실패하였습니다.');
        });
    },
    logout() {
      this.$store.commit('user', null);
    }
  }
};
</script>
