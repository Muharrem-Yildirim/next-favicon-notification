import { createContext, useContext, useState, useEffect } from "react";

const initialConfig = {
  radius: 14,
  counter: 0,
  innerCircle: false,
  backgroundColor: "#DB0101",
  fontColor: "#FFF",
  fontFamily: "Arial",
  fontWeight: "bold",
  url: null,
  position: "bottom-right",
  show: false,
};

const FaviconContextNotification = createContext({});

const FaviconNotificationContextProvider = ({ children }) => {
  const [config, setConfig] = useState(initialConfig);

  const changeFavicon = () => {
    if (!config.url) return;
    if (!config.show) {
      drawOriginalFavicon();
      return;
    }
    var favicon = new Image();
    favicon.crossOrigin = "anonymous";

    favicon.onload = function () {
      var oldLink =
        document.querySelector<HTMLLinkElement>("link[rel~='icon']");

      var canvas = document.createElement("canvas");
      canvas.width = favicon.width;
      canvas.height = favicon.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(favicon, 0, 0);

      const [POS_X, POS_Y] = getPosition(config.position, canvas);

      // === Draw the circle ===
      drawCircle(ctx, POS_X, POS_Y);

      // === Draw the text ===
      if (config.counter !== null && config.counter !== undefined) {
        drawText(ctx, POS_X, POS_Y);
      }

      if (canvas) {
        oldLink.href = canvas.toDataURL();
      }
    };
    favicon.src = config.url;
  };

  const drawOriginalFavicon = () => {
    var link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (link && config.url) link.href = config.url;
  };

  const getPosition = (positionLabel, canvas) => {
    var positionX = 0;
    var positionY = 0;
    switch (positionLabel) {
      case "top-left":
        positionX = canvas.width / 2 - (canvas.width - config.radius * 2) / 2;
        positionY = canvas.height / 2 - (canvas.height - config.radius * 2) / 2;
        break;
      case "top-right":
        positionX = canvas.width / 2 + (canvas.width - config.radius * 2) / 2;
        positionY = canvas.height / 2 - (canvas.height - config.radius * 2) / 2;
        break;
      case "bottom-right":
        positionX = canvas.width / 2 + (canvas.width - config.radius * 2) / 2;
        positionY = canvas.height / 2 + (canvas.height - config.radius * 2) / 2;
        break;
      case "bottom-left":
        positionX = canvas.width / 2 - (canvas.width - config.radius * 2) / 2;
        positionY = canvas.height / 2 + (canvas.height - config.radius * 2) / 2;
        break;
      case "center":
        positionX = canvas.width / 2;
        positionY = canvas.height / 2;
        break;
      default:
        positionX = canvas.width / 2;
        positionY = canvas.height / 2;
        break;
    }

    return [positionX, positionY];
  };

  const drawCircle = (ctx, positionX, positionY) => {
    ctx.beginPath();
    ctx.arc(positionX, positionY, config.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = config.backgroundColor;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  };

  const drawInnerCircle = (ctx, positionX, positionY) => {
    ctx.beginPath();
    ctx.arc(positionX, positionY, config.radius / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = config.fontColor;
    ctx.strokeStyle = config.fontColor;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  };

  const drawText = (ctx, positionX, positionY) => {
    if (config.counter > 9 || config.innerCircle) {
      drawInnerCircle(ctx, positionX, positionY);
      return;
    }
    ctx.beginPath();
    ctx.font = `${config.fontWeight} ${config.radius * 2}px ${
      config.fontFamily
    }`;
    ctx.fillStyle = config.fontColor;
    ctx.fillText(
      config.counter + "",
      positionX - config.radius / 2,
      positionY + config.radius / 2 + config.radius / 4
    );
    ctx.strokeStyle = config.fontColor;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  };

  useEffect(() => {
    changeFavicon();
  }, [config]);

  return (
    <FaviconContextNotification.Provider value={[config, setConfig]}>
      {children}
    </FaviconContextNotification.Provider>
  );
};

export const useFaviconNotification = () => {
  return useContext(FaviconContextNotification);
};

export default FaviconNotificationContextProvider;
