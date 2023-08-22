<template>
  <section class="apply hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <nuxt-link to="/"> 뒤로 가기 </nuxt-link>
        <div class="columns is-centered is-vcentered">
          <form ref="form" class="column is-half" @submit.prevent="submitForm">
            <h2 v-if="!submitted" class="subtitle is-4">지원서 작성</h2>
            <template v-else>
              <h2 class="subtitle is-4">지원서 확인 및 수정</h2>
              <div class="form-item">
                지원서가 성공적으로 제출되었습니다.
                <br />
                지원서 접수 기간이 끝날 때까지는 자유롭게 수정하실 수 있습니다.
              </div>
            </template>
            <hr />

            <h3 class="subtitle is-5">지원자 정보</h3>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">이름</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input
                    class="input"
                    name="name"
                    type="text"
                    :value="name"
                    readonly
                  />
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">학번</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input
                    class="input"
                    name="stdNo"
                    type="text"
                    :value="stdNo"
                    readonly
                  />
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">이메일</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input
                    class="input"
                    name="email"
                    type="text"
                    :value="email"
                    readonly
                  />
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">학과</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input
                    class="input"
                    name="dept"
                    type="text"
                    placeholder="학과를 입력해주세요"
                    :readonly="overdue"
                  />
                </div>
              </div>
            </div>

            <hr />

            <h3 class="subtitle is-5">추가 항목 작성</h3>

            <div class="form-item">
              <p class="form-desc">
                전화번호를 입력해주세요. 면접일자 공지를 위해 반드시 필요합니다.
              </p>
              <input
                class="input"
                name="phone"
                type="tel"
                placeholder="전화번호를 입력해주세요."
                :readonly="overdue"
              />
            </div>

            <div class="form-item">
              <p class="form-desc">지원 분야를 선택해주세요.</p>
              <div class="control">
                <label class="radio" :disabled="overdue">
                  <input
                    type="radio"
                    name="applyType"
                    value="developer"
                    :disabled="overdue"
                  />
                  개발자
                </label>
                <label class="radio" :disabled="overdue">
                  <input
                    type="radio"
                    name="applyType"
                    value="designer"
                    :disabled="overdue"
                  />
                  디자이너
                </label>
                <label class="radio" :disabled="overdue">
                  <input
                    type="radio"
                    name="applyType"
                    value="planner"
                    :disabled="overdue"
                  />
                  기획자
                </label>
              </div>
            </div>

            <hr />

            <div class="form-footer-item" style="font-weight: bold">
              모든 항목은 {{ TEXT_LENGTH_THRESHOLD }}자 이상 작성해주세요.
            </div>

            <div class="form-item">
              <p class="form-desc">자기소개를 작성해주세요.</p>
              <div class="control">
                <textarea
                  v-model="introduction"
                  class="textarea"
                  name="introduction"
                  placeholder="여기에 입력해주세요"
                  :readonly="overdue"
                >
                </textarea>
              </div>
              <span class="word-count"
                >{{ wordCount.introduction }}자 작성
                <span
                  v-if="shouldWarnWordCount.introduction"
                  class="length-warning"
                  >(미달)</span
                >
              </span>
            </div>

            <div class="form-item">
              <p class="form-desc">
                SPARCS에 들어온다면 어떤 일을 하고 싶으신가요?
              </p>
              <div class="control">
                <textarea
                  v-model="workToDo"
                  class="textarea"
                  name="workToDo"
                  placeholder="여기에 입력해주세요"
                  :readonly="overdue"
                >
                </textarea>
              </div>
              <span class="word-count"
                >{{ wordCount.workToDo }}자 작성
                <span v-if="shouldWarnWordCount.workToDo" class="length-warning"
                  >(미달)</span
                >
              </span>
            </div>

            <div class="form-item">
              <p class="form-desc">
                개발, 디자인, 기획 또는 행사 진행과 관련된 경험이나 관심을 갖게 된 계기가 있다면
                자유롭게 작성해주세요.
              </p>
              <div class="control">
                <textarea
                  v-model="motivation"
                  class="textarea"
                  name="motivation"
                  placeholder="여기에 입력해주세요"
                  :readonly="overdue"
                >
                </textarea>
              </div>
              <span class="word-count"
                >{{ wordCount.motivation }}자 작성
                <span
                  v-if="shouldWarnWordCount.motivation"
                  class="length-warning"
                  >(미달)</span
                >
              </span>
            </div>

            <hr />

            <div class="form-item">
              <p class="form-desc">
                (교양분관 이용이 가능하다면) SPARCS는 매주 월요일 오후 9시에
                동아리방에서 정모를 진행합니다. 참여하실 수 있나요?
              </p>
              <div class="control">
                <label class="radio" :disabled="overdue">
                  <input
                    type="radio"
                    name="meetup"
                    value="true"
                    :disabled="overdue"
                  />
                  네, 참여할 수 있습니다.
                </label>
                <label class="radio" :disabled="overdue">
                  <input
                    type="radio"
                    name="meetup"
                    value="false"
                    :disabled="overdue"
                  />
                  아니오, 참여할 수 없습니다.
                </label>
              </div>
            </div>

            <div class="form-item">
              <p class="form-desc">
                SPARCS에 들어오신 후 4학기 이상 활동 하실 수 있나요?
              </p>
              <div class="control">
                <label class="radio" :disabled="overdue">
                  <input
                    type="radio"
                    name="activeForFour"
                    value="true"
                    :disabled="overdue"
                  />
                  네, 활동할 수 있습니다.
                </label>
                <label class="radio" :disabled="overdue">
                  <input
                    type="radio"
                    name="activeForFour"
                    value="false"
                    :disabled="overdue"
                  />
                  아니오, 활동할 수 없습니다.
                </label>
              </div>
            </div>

            <hr />

            <div class="form-footer-item">
              면접 일정은 개별적으로 안내드립니다.
              <br />
              현재는 8월 31일(목) ~ 9월 3일(일) 사이에 진행할 예정입니다.
            </div>

            <div v-if="wordsAreShort" class="form-footer-item">
              <span class="length-warning"
                >글자수 조건이 충족되지 못했습니다. 현재 상태로 최종
                제출하신다면 자동으로 탈락됩니다. </span
              >(저장은 가능합니다)
            </div>

            <button v-if="!overdue" class="button is-primary" type="submit">
              <template v-if="submitted"> 업데이트 </template>
              <template v-else> 제출 </template>
            </button>
            <div v-else>
              <template v-if="!submitted">
                제출기한이 종료되었습니다.
              </template>
              <template v-else>
                현재 제출된 상태이며, 제출기한이 종료되어 더 이상 업데이트는
                불가능합니다. <br />
                제출하신 지원서는 계속 확인하실 수 있습니다.
              </template>
            </div>

            <transition name="fade">
              <span
                v-if="sending"
                class="status"
                :class="{ 'is-failed': failed }"
              >
                {{ status }}
              </span>
            </transition>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      status: '',
      failed: false,
      sending: false,
      submitted: false,
      introduction: '',
      workToDo: '',
      motivation: '',
      TEXT_LENGTH_THRESHOLD: 100,
    };
  },
  computed: {
    time() {
      return this.$store.state.time;
    },
    name() {
      return this.$store.state.user.name;
    },
    stdNo() {
      return this.$store.state.user.stdNo;
    },
    email() {
      return this.$store.state.user.email;
    },
    overdue() {
      return this.$store.getters.overdue;
    },
    wordCount() {
      return {
        introduction: this.introduction.trim().length,
        workToDo: this.workToDo.trim().length,
        motivation: this.motivation.trim().length,
      };
    },
    shouldWarnWordCount() {
      const inShortRange = (v) => v > 0 && v < this.TEXT_LENGTH_THRESHOLD;
      return {
        introduction: inShortRange(this.wordCount.introduction),
        workToDo: inShortRange(this.wordCount.workToDo),
        motivation: inShortRange(this.wordCount.motivation),
      };
    },
    wordsAreShort() {
      return (
        this.shouldWarnWordCount.introduction ||
        this.shouldWarnWordCount.workToDo ||
        this.shouldWarnWordCount.motivation
      );
    },
  },
  async mounted() {
    const res = await this.$axios.$get('/apply', {
      headers: {
        Authorization: this.$store.state.user.token,
      },
      params: {
        stdNo: this.stdNo,
        email: this.email,
      },
    });
    if (!res.result) return;
    this.submitted = true;
    Object.keys(res.payload).forEach((name) => {
      const value = res.payload[name];
      const elem = this.$refs.form.querySelector(`[name="${name}"]`);
      if (!elem) return;
      if (elem.getAttribute('type') === 'radio') {
        const matchingElem = this.$refs.form.querySelector(
          `[name="${name}"][value="${value}"]`
        );
        if (matchingElem) matchingElem.checked = true;
        return;
      }
      elem.value = value;
    });
    this.introduction = res.payload.introduction;
    this.workToDo = res.payload.workToDo;
    this.motivation = res.payload.motivation;
  },
  methods: {
    async submitForm(event) {
      if (this.failed) this.sending = false;
      if (this.overdue) return;
      if (this.sending) return;
      this.sending = true;
      this.failed = false;
      const formElements = event.target.elements;
      const formData = new FormData(event.target);
      const jsonData = Object.create(null);
      for (const [key, value] of formData.entries()) {
        if (
          formElements[key] instanceof RadioNodeList &&
          (value === 'true' || value === 'false')
        ) {
          jsonData[key] = value === 'true';
        } else {
          jsonData[key] = value;
        }
      }
      this.status = '제출 중...';
      let result;
      if (!this.submitted) {
        result = await this.$axios.$post('/apply', jsonData, {
          headers: {
            Authorization: this.$store.state.user.token,
          },
        });
      } else {
        result = await this.$axios.$put('/apply', jsonData, {
          headers: {
            Authorization: this.$store.state.user.token,
          },
        });
      }
      if (!result.result) {
        this.status = `제출 실패! (${result.message})`;
        this.failed = true;
        return;
      }
      this.status = '제출 완료';
      this.submitted = true;
      setTimeout(() => {
        this.sending = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.form-item {
  margin-bottom: 2rem;
}
.form-footer-item {
  margin-bottom: 1rem;
  word-break: keep-all;
}
.form-desc {
  margin-bottom: 10px;
  word-break: keep-all;
}
.apply,
input,
button,
textarea {
  font-family: 'NanumBarunRoboto', sans-serif;
}
.radio:hover input[type='radio'] {
  background: #dadada;
  border-color: #dadada;
}
.radio:hover input[type='radio']:checked {
  background: #2979ff;
  border-color: #f1f2f3;
}
input[type='radio'] {
  appearance: none;
  width: 15px;
  height: 15px;
  border: 3px solid;
  background: #e5e5e5;
  border-color: #e5e5e5;
  border-radius: 100%;
  outline: none;
  transition: background 0.4s ease, border-color 0.4s ease;
}
input[type='radio']:checked {
  background: #2979ff;
  border-color: #f1f2f3;
}
textarea,
input[type='text'],
input[type='tel'] {
  background: #f3f3f3;
  border: 1px solid transparent;
  transition: background 0.4s ease, border-color 0.4s ease;
}
textarea:hover,
input[type='text']:hover,
input[type='tel']:hover {
  background: #f6f6f6;
}
textarea:focus,
input[type='text']:focus,
input[type='tel']:focus {
  box-shadow: none;
  border-color: #2979ff;
}
input[readonly],
textarea[readonly] {
  cursor: not-allowed;
  background: #dadada;
}
input[readonly]:hover,
textarea[readonly]:hover {
  background: #dadada;
}
input[readonly]:focus,
textarea[readonly]:focus {
  border-color: transparent;
}
span.word-count {
  width: 100%;
  text-align: end;
}
.button.is-primary {
  background: #2979ff;
  transition: background 0.4s ease;
}
.button.is-primary:hover {
  background: #2196f3;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.status {
  color: #2979ff;
}
.status.is-failed,
.length-warning {
  color: #f44336;
  word-break: keep-all;
}
::selection {
  background: rgba(168, 201, 255, 0.65);
}
</style>
