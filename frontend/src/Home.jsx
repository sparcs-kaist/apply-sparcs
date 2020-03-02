import React from "react";

function Home() {
  return (
    <section
      className="hero is-fullheight"
      style={
        {
          /*backgroundColor: "rgb(235, 161, 42)"*/
        }
      }
    >
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered is-vcentered">
            <div className="column is-half has-text-centered">
              <img
                src="logo.png"
                alt="logo"
                style={{
                  width: "25%",
                  height: "25%"
                  /*filter: "brightness(0) invert(1)"*/
                }}
              />
              <h2 className="subtitle is-4">2020년 봄학기 SPARCS 리크루팅</h2>
              <br />
              <div className="notification is-danger has-text-left">
                COVID-19 확산 상황에 따라 리크루팅 일정이 변동될 수 있습니다.
                <br />
                변동 시 SPARCS 공식 홈페이지 및 페이스북을 통해
                알려드리겠습니다.
              </div>
              <hr />
              <div className="notification has-text-left">
                지금은 지원서 접수 기간이 아닙니다.
                <br />
                2020년 3월 9일(월) 0시 ~ 3월 20일(금) 23시 59분까지 지원서 작성이 가능합니다.
              </div>
              {/*
              <button
                className="button is-light"
                disabled={true}
                style={{
                  backgroundColor: "rgb(235, 161, 42)",
                  color: "black",
                  marginTop: "3rem",
                  fontSize: "1.25rem",
                }}
              >
                지금은 리크루팅 기간이 아닙니다.
              </button>
              */}
              <br />
              <a
                className="button is-light"
                style={{
                  backgroundColor: "rgb(235, 161, 42)",
                  color: "white",
                  marginTop: "1rem"
                }}
                href="https://sparcs.org"
              >
                Back to SPARCS.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
