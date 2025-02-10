<template>
  <section class="index hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-half has-text-centered">
            <img
              src="~assets/logo.png"
              alt="logo"
              style="width: 25%; height: 25%"
            />
            <h2 class="subtitle is-4">2025년도 봄학기 SPARCS 리크루팅</h2>
            <br />
            <div class="notification is-danger has-text-left">
              내부 상황에 따라 리크루팅 일정이 변동될 수 있습니다.
              <br />변동 시 SPARCS 공식 홈페이지 및 페이스북, 인스타그램을 통해
              알려드리겠습니다.
              <br /><u>2025년 2월 24일 오후 7시 ~ 오후 9시 00분과 2025년 2월 25일 오후 7시 ~ 오후 9시</u>에 진행되는 오픈동방에 참여하시면 동방을 구경하면서 현역 회원과 이야기를 나눠보실 수 있습니다.
              <br /><a href="https://url.kr/n9xc8j">FAQ 바로가기</a>
            </div>
            <div class="notification has-text-left">
              <template v-if="!overdue">
                {{ dueText }}에 2025년도 봄학기 SPARCS 리크루팅 지원서 작성이
                마감됩니다.
              </template>
              <template v-else>
                2025년도 봄학기 SPARCS 리크루팅 준비중입니다.
              </template>
            </div>
            <hr />
            <button
              v-if="!this.$store.state.user"
              class="button is-light"
              style="background-color: rgb(235, 161, 42); color: white"
              @click="login"
            >
              SPARCSSSO로 로그인
            </button>
            <div v-if="this.$store.state.user">
              <h1 style="margin-bottom: 1rem">
                SPARCSSSO로 로그인 되었습니다. (현재 사용자:
                {{ this.$store.state.user.name }})
              </h1>
              <button
                class="button is-light"
                style="background-color: rgb(235, 161, 42); color: white"
                @click="login"
              >
                <template v-if="overdue"> 지원서 확인하기 </template>
                <template v-else> 지원서 작성하기 </template>
              </button>
              <button class="button is-light" @click="logout">로그아웃</button>
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

<style scoped>
.index,
button {
  font-family: 'NanumBarunRoboto', sans-serif;
}
</style>

<script>
export default {
  computed: {
    overdue() {
      return this.$store.getters.overdue;
    },

    dueText() {
      return new Date(this.$store.state.due - 1000).toLocaleString('ko-KR', {
        hour12: false,
      });
    },
  },

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
      this.$store.dispatch('logout');
    },
  },
};
</script>
