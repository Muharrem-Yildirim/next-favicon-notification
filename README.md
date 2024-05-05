# next-favicon-notification

## Note

Original package made by [Mathss18](https://github.com/Mathss18/react-favicon-notification), I just adapted to Next.js for my project.

## Description

React context to show notification on favicon

## [Demo](https://react-favicon-notification.netlify.app)

### Installation

```bash
  npm i next-favicon-notification
```

### Usage

#### Importing context provider

```tsx
"use client";
import {
  FaviconNotificationContextProvider,
  useFaviconNotification,
} from "next-favicon-notification";
import { useEffect } from "react";
import favicon from "../public/favicon.png";

export function Home() {
  const [config, setConfig]: any = useFaviconNotification();

  useEffect(() => {
    setConfig({
      radius: 120,
      counter: 1,
      innerCircle: true,
      backgroundColor: "#ff00ff",
      fontColor: "#FFF",
      fontFamily: "Arial",
      fontWeight: "bold",
      url: favicon.src,
      position: "bottom-right",
      show: false,
    });
  }, [setConfig]);

  return (
    <div>
      <button
        onClick={() =>
          setConfig((prevState: any) => {
            return { ...prevState, show: !prevState.show };
          })
        }
      >
        Toggle
      </button>
    </div>
  );
}

const Wrapper = () => {
  return (
    <FaviconNotificationContextProvider>
      <Home />
    </FaviconNotificationContextProvider>
  );
};

export default Wrapper;
```

#### Use the custom hook to change the favicon notification config

```js
import { useFaviconNotification } from "next-favicon-notification";

const [config, setConfig] = useFaviconNotification();

function showNotificationIcon() {
  setConfig({ ...config, show: true });
}

function incrementNotification() {
  setConfig({ ...config, counter: config.counter + 1 });
}
```

# config properties

| property        |    default     | type          | description                                            |
| --------------- | :------------: | ------------- | ------------------------------------------------------ |
| counter         |      `0`       | number/string | show the counter inside the notifictaion circle        |
| innerCircle     |    `false`     | boolean       | hide counter and show a small inner circle             |
| backgroundColor |   `#DB0101`    | string        | set the background color                               |
| fontColor       |     `#FFF`     | string        | set the font color                                     |
| fontFamily      |    `Arial`     | string        | set the font family                                    |
| fontWeight      |     `bold`     | string        | set the font weigth                                    |
| url             |     `null`     | string/null   | set the url to get the favicon                         |
| position        | `bottom-right` | string        | set the position of the notification                   |
| show            |    `false`     | boolean       | true: show the notificaion. off: hide the notification |

**Warning:** Do not forget to set the show property to true in order to show the notification
