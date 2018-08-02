# LockIt - Frontend JS Coding Challenge

To start app:
1. run `yarn install`
2. run `yarn start`

There are open issues while using npm. 
Sometimes there is a note in the terminal to "npm i" but that has also created issues. This message clears by on reload. 
For yarn installation see https://yarnpkg.com/

#### App Requirements

![](https://meta.filipstepien.com/LockIt.png)

#### GraphCool 

Graph cool provides a quick back end and GraphQL endpoint set up using either a Schema view or a CMS style input interface. In this app it was used to store user home location and app posts. The app uses appolo-client to make API calls to this end point

![](https://meta.filipstepien.com/LockIt.Schema.png)

####App notes

The app uses setInterval() and clearInterval() for updating location. In a production application native methods can be used, as described in https://facebook.github.io/react-native/docs/geolocation.html However, I did not eject so currently there is no to iOS and Android Native code/permissions. 