import styled from "@emotion/styled";

const SigninNSignupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;

  .loginInner {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    background-color: #fff;
  }

  .bg {
    width: 50%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)),
      url("https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg");
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    position: relative;

    .welcomeContainer {
      width: 100%;
      position: absolute;
      bottom: 100px;
      left: 0;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 20px;
      box-sizing: border-box;

      .welcomeInnerContainer {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .welcomeTxt {
          white-space: nowrap;
          margin-right: 10px;
          font-family: "Inter" sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: 30px;
          line-height: 36px;
          letter-spacing: -0.408px;
          color: #000000;
        }
      }

      .subTxt {
        font-family: "Inter" sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 22px;
        letter-spacing: -0.408px;
        color: #455154;
      }
    }
  }

  .rightbg {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)),
      url("https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg");
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .right {
    min-height: 100vh;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    & > .innerContainer {
      background-color: rgba(255, 255, 255, 0.9);
      padding: 2rem !important;
      border-radius: 5px;
      width: 95%;
      max-width: 500px;
      margin: 20px auto;
      align-self: center;
      position: relative;
      box-sizing: border-box;
      overflow: auto;

      .continueBtn {
        text-transform: none;
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: -0.408px;
        color: #ffffff;
        background-color: #703ef0;
      }
      .btn {
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 22px;
        letter-spacing: -0.408px;
        color: #455154;
        text-transform: none;
        border-color: #dddddd;
      }

      .btnBorder {
        border-color: #999999 !important;
      }

      .PhoneInputInput {
        display: none;
      }
    }
  }
`;

export default SigninNSignupContainer;
