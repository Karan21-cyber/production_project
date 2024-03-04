export const mail_template = (username: string) => {
  return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Reset Password</title>
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
              background-color: #FFF;
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
            style="width: 800px; margin: auto; margin-top: 20px; background-color: #101C24;"
          >
            <table
              style="
                width: 100%;
                border-bottom: 1px solid #243F51;
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
              <h1 style="margin-bottom: 24px; text-align: center; color: #FFF">
                  Design Consultation Invitation
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
                <p style="padding-bottom: 16px; line-height: 24px; color: #FFF; font-weight: 500;">
                  Hello ${username},
                </p>
                <p style="padding-bottom: 16px; line-height: 24px; color:#FFF;font-weight: 400;">
                  We hope this message finds you well. We are pleased to inform you that your request for a consultation call has been scheduled. Our dedicated representative will be available to address all your inquiries and curiosities during the call. 
                </p>
                <p style="padding-bottom: 16px; line-height: 24px; color:#FFF; font-weight: 400;">
                  The call has been schedule as per your requested date and time  <span style="font-weight: 700;">${new Date()}</span>                       
              </p>
              <p style=" line-height: 24px; color:#FFF ;font-weight: 400;">
                  You can join the call by clicking the provided link below.                       
              </p>
              <p
              style="padding-bottom: 16px; line-height: 24px; color: #FFF;font-weight: 400;"
              >
                  Link: <a href="Https://microsoftteams.com/3456mets/call" style="font-weight: 700;line-height: 24px; color: #FFF">https://microsoftteams.com/3456mets/call</a>
              </p>
      
              <p
              style="padding-bottom: 16px; line-height: 24px; color: #FFF;font-weight: 400;"
              >Should you have any unforeseen circumstances or need to reschedule, please reach out to us at your earliest convenience.</p>
      
              
              <p
              style="
                font-size: 16px;
                line-height: 24px;
                color: #FFF;
                font-weight: 400;
              "
            >
            We look forward to a productive and insightful discussion.
            </p>
            <p
            style="font-weight: 400;padding-top: 20px; line-height: 24px; color: #FFF"
            >
            Best regards, 
            </p>
          </div>
            </div>
      
           
            <div
              class="info"
              style="
                border-top: 1px solid #243F51;
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
                  color: #FFF;
                "
              >
              Kabel Interiors
              </h3>
              <p
                style="
                  font-size: 12px;
                  line-height: 18px;
                  font-weight: 400;
                  color: #FFF;
                "
              >
              71 ST. Nicholas Drive, Washington 
              </p>
              <a
                href="https://eurekatraders.org"
                style="
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 20px;
                  color: #FFF;
                  text-decoration: none;
                  border-bottom: 1px solid #0c164b;
                "
                >kabelinteriors.org</a
              >
            </div>
          </div>
        </body>
      </html>`;
};
