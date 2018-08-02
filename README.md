# LockIt - Frontend JS Coding Challenge

To start app:
1. run `yarn install`
2. run `yarn start`

![](https://meta.filipstepien.com/LockIt.png)

There are open issues while using npm. 
Sometimes there is a note in the terminal to "npm i" but that has also created issues. This message clears by on reload. 
For yarn installation see https://yarnpkg.com/

The app uses setInterval() and clearInterval() for updating location. In a production application native methods can be used, as described in https://facebook.github.io/react-native/docs/geolocation.html However, I did not eject so currently there is no to iOS and Android Native code/permissions. 