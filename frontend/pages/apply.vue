<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-half">
            <h2 class="subtitle is-4">지원서 작성</h2>
            <hr />

            <h3 class="subtitle is-5">지원자 정보</h3>

            <div class="field is-horizontal">
              <div class="field-labe is-normal">
                <label class="label">이름</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control" style="margin-left: 1rem;">{{ name }}</p>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-labe is-normal">
                <label class="label">학번</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control" style="margin-left: 1rem;">{{ name }}</p>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-labe is-normal">
                <label class="label">학과</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control" style="margin-left: 1rem;">{{ name }}</p>
                </div>
              </div>
            </div>

            <hr />

            <h3 class="subtitle is-5">추가 항목 작성</h3>

            <div class="form-item">
              <p style="margin-bottom: 0.5rem;">
                전화번호를 입력해주세요. 면접일자 공지를 위해 반드시 필요합니다.
              </p>
              <input
                class="input"
                type="tel"
                placeholder="전화번호를 입력해주세요."
              />
            </div>

            <div class="form-item">
              <p style="margin-bottom: 0.5rem;">
                지원 분야를 선택해주세요.
              </p>
              <input
                class="input"
                type="tel"
                placeholder="전화번호를 입력해주세요."
              />
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
  data() {
    return {
      name: '테스트',
      numb: '20190000',
      dep: '전산학부'
    };
  }
};
</script>

<style>
.form-item {
  margin-bottom: 1rem;
}
</style>
