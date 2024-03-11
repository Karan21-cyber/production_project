"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail_template = void 0;
const mail_template = ({ name, id }) => {
    return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>verification mail</title>
      <link
        href="https://fonts.googleapis.com/css?family=Manrope:200,300,regular,500,600,700,800"
        rel="stylesheet"
      />
      <link href="https://fonts.cdnfonts.com/css/lato" rel="stylesheet" />
      <style>
        *,
        *::after,
        *::before {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        body {
          font-family: "Manrope", sans-serif !important;
          background-color: #f4f4f4;
          text-align: center;
        }
        .logo-wrapper::after {
          content: "";
          display: table;
          clear: both;
        }
        .eureka-border {
          border-top: 1px solid #d9d9d9;
        }
        .logo-wrapper {
          margin: 0 auto; /* Center horizontally */
        }
        .main-content {
          background-color: #fff;
          width: 800px !important;
          margin: 0 auto; /* Center horizontally */
          margin-top: 24px; /* Add top margin for separation */
          padding: 20px; /* Add padding for spacing */
        }
        @media screen and (max-width: 648px) {
          .main-content {
            width: 500px !important;
            /* margin: auto !important; */
          }
  
          .main-banner {
            padding-left: 30px !important;
          }
  
          .product-card {
            width: 100%;
            float: none !important;
            margin-bottom: 10px !important;
          }
  
          .product-card div {
            width: 200px !important;
            margin: auto;
          }
  
          .product-content {
            height: 100% !important;
          }
        }
      </style>
    </head>
    <body>
      <div
        class="main-content"
        style="
          width: 800px;
          margin: auto;
          margin-top: 20px;
          background-color: #101c24;
        "
      >
        <table
          style="
            width: 100%;
            border-bottom: 1px solid #243f51;
            padding-bottom: 10px;
            padding-top: 16px;
          "
        >
          <tbody style="text-align: center">
            <tr>
              <td class="main-banner">
                <img
                  src="https://d1v3w1uttbir9x.cloudfront.net/d7c47e1e3d322b531fbee8980b352de1"
                  alt=""
                  height="64px"
                  width="242px"
                  style="
                    width: 100%;
                    padding-right: 4px;
                    float: right;
                    object-fit: contain;
                  "
                  class="logo"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="content" style="margin-top: 24px; margin-bottom: 24px">
          <h1 style="margin-bottom: 24px; text-align: center; color: #fff">
            Verification mail
          </h1>
          <div
            class="paragraph"
            style="
              font-family: Lato;
              text-align: left;
              line-height: 24px;
              font-size: 16px;
            "
          >
            <p
              style="
                padding-bottom: 16px;
                line-height: 24px;
                color: #fff;
                font-weight: 500;
              "
            >
              Hello ${name},
            </p>
            <p
              style="
                padding-bottom: 16px;
                line-height: 24px;
                color: #fff;
                font-weight: 400;
              "
            >
              We hope this message finds you well. To ensure the security and
              integrity of your account, we require your assistance in completing
              a brief verification process. Your cooperation is crucial in
              maintaining the safety of your information and preventing
              unauthorized access.
            </p>
            <p
              style="
                padding-bottom: 16px;
                line-height: 24px;
                color: #fff;
                font-weight: 400;
              "
            >
              <span style="font-weight: 700">
                Please follow the steps below to verify your account:</span
              >
            </p>
            <p style="line-height: 24px; color: #fff; font-weight: 400">
              Click on the verification Button:
            </p>
  
            <div
              style="
                padding-bottom: 16px;
                line-height: 24px;
                position: relative;
                font-weight: 400;
                height: 80px;
              "
            >
              <a
                href="https://pp-app-teal.vercel.app/verification/${id}"
                target="_blank"
                style="
                  cursor: pointer;
                  background-color: aqua;
                  width: 200px;
                  padding-inline: 16px;
                  padding-block: 10px;
                  text-align: center;
                  border-radius: 8px;
                  position: absolute;
                  top: 20%;
                  left: 50%;
                  translate: -50%;
                "
              >
                Verify
              </a>
            </div>
            <p
              style="
                padding-bottom: 16px;
                line-height: 24px;
                color: #fff;
                font-weight: 400;
              "
            >
              In some case you are unable to verify your mail within 15 minutes
              you need to re-submit your registration form.
            </p>
  
            <p
              style="
                font-size: 16px;
                line-height: 24px;
                color: #fff;
                font-weight: 400;
              "
            >
              We look forward to a productive and insightful discussion.
            </p>
            <p
              style="
                font-weight: 400;
                padding-top: 20px;
                line-height: 24px;
                color: #fff;
              "
            >
              Best regards,
            </p>
          </div>
        </div>
  
        <div
          class="info"
          style="
            border-top: 1px solid #243f51;
            padding-top: 5px;
            text-align: center;
            width: 100%;
          "
        >
          <h3
            style="
              font-weight: 500;
              font-size: 24px;
              line-height: 24px;
              margin-bottom: 4px;
              color: #fff;
            "
          >
            Space World
          </h3>
          <p
            style="
              font-size: 12px;
              line-height: 18px;
              font-weight: 400;
              color: #fff;
            "
          >
            32 Koteshowr Kathmandu, Nepal
          </p>
          <a
            href="https://eurekatraders.org"
            style="
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              color: #fff;
              text-decoration: none;
              border-bottom: 1px solid #0c164b;
            "
            >spaceworld.com</a
          >
        </div>
      </div>
    </body>
  </html>  
  `;
};
exports.mail_template = mail_template;
