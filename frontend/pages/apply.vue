<template>
  <section class="apply hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-half">
            <h2 class="subtitle is-4">지원서 작성</h2>
            <hr />

            <h3 class="subtitle is-5">지원자 정보</h3>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">이름</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input class="input" type="text" :value="name" disabled />
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">학번</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input class="input" type="text" :value="numb" disabled />
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
                    type="text"
                    placeholder="학과를 입력해주세요"
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
                type="tel"
                placeholder="전화번호를 입력해주세요."
              />
            </div>

            <div class="form-item">
              <p class="form-desc">
                지원 분야를 선택해주세요.
              </p>
              <div class="control">
                <label class="radio">
                  <input type="radio" name="type" value="developer" />
                  개발자
                </label>
                <label class="radio">
                  <input type="radio" name="type" value="designer" />
                  디자이너
                </label>
              </div>
            </div>

            <hr />

            <div class="form-item">
              <p class="form-desc">
                자기소개를 작성해주세요.
              </p>
              <div class="control">
                <textarea class="textarea" name="introduce" placeholder="여기에 입력해주세요">
                </textarea>
              </div>
            </div>

            <div class="form-item">
              <p class="form-desc">
                SPARCS에 들어온다면 어떤 일을 하고 싶으신가요?
              </p>
              <div class="control">
                <textarea class="textarea" name="workToDo" placeholder="여기에 입력해주세요">
                </textarea>
              </div>
            </div>

            <div class="form-item">
              <p class="form-desc">
                개발 및 디자인과 관련된 경험이나 관심을 갖게 된 계기가 있다면
                자유롭게 작성해주세요.
              </p>
              <div class="control">
                <textarea class="textarea" name="motivation" placeholder="여기에 입력해주세요">
                </textarea>
              </div>
            </div>

            <hr />

            <div class="form-item">
              <p class="form-desc">
                SPARCS는 매주 월요일 오후 9시에 동아리방에서 정모를 진행합니다.
                참여하실 수 있나요?
              </p>
              <div class="control">
                <label class="radio">
                  <input type="radio" name="meetup" value="true" />
                  네, 참여할 수 있습니다.
                </label>
                <label class="radio">
                  <input type="radio" name="meetup" value="false" />
                  아니오, 참여할 수 없습니다.
                </label>
              </div>
            </div>

            <div class="form-item">
              <p class="form-desc">
                SPARCS에 들어오신 후 4학기 이상 활동 하실 수 있나요?
              </p>
              <div class="control">
                <label class="radio">
                  <input type="radio" name="activeForFour" value="developer" />
                  네, 활동할 수 있습니다.
                </label>
                <label class="radio">
                  <input type="radio" name="activeForFour" value="designer" />
                  아니오, 활동할 수 없습니다.
                </label>
              </div>
            </div>

            <hr />

            <div class="form-item">
              COVID-19로 인해 면접 일정은 3월 16일에 안내드리겠습니다.
              <br />
              현재는 4/6(월) ~ 4/10(금) 오후 7시 ~ 오후 11시 사이에 진행할
              예정입니다.
            </div>

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
      numb: '20190000'
    };
  }
};
</script>

<style scoped>
.form-item {
  margin-bottom: 2rem;
}

.form-desc {
  margin-bottom: 10px;
}

.apply,
input,
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

input[disabled] {
  background: #dadada;
}

input[disabled]:hover {
  background: #dadada;
}

::selection {
  background: rgba(168, 201, 255, 0.65);
}
</style>
