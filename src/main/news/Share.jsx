import {
  TelegramShareButton,
  WhatsappShareButton,
  VKShareButton,
  TwitterShareButton,
  OKShareButton,
  FacebookShareButton,
  VKIcon,
  TelegramIcon,
  WhatsappIcon,
  TwitterIcon,
  OKIcon,
  FacebookIcon,
} from "react-share";

const Share = ({ shareRes, title }) => {
  return (
    <div>
      {/* VK Share Button */}
      <VKShareButton title={title} url={shareRes}>
        <VKIcon></VKIcon>
      </VKShareButton>

      {/* Telegram Share Button */}
      <TelegramShareButton title={title} url={shareRes}>
        <TelegramIcon></TelegramIcon>
      </TelegramShareButton>

      {/* Whatsapp Share Button */}
      <WhatsappShareButton title={title} url={shareRes}>
        <WhatsappIcon></WhatsappIcon>
      </WhatsappShareButton>

      {/* Twitter Share Button */}
      <TwitterShareButton title={title} url={shareRes}>
        <TwitterIcon></TwitterIcon>
      </TwitterShareButton>

      {/* Facebook Share Button */}
      <FacebookShareButton title={title} url={shareRes}>
        <FacebookIcon></FacebookIcon>
      </FacebookShareButton>

      {/* OK Share Button */}
      <OKShareButton title={title} url={shareRes}>
        <OKIcon></OKIcon>
      </OKShareButton>
    </div>
  );
};

export default Share;
