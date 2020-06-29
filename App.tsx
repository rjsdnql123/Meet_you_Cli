import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SmsAuthScreen from './src/screens/SmsAuthScreen';
import ChattingListScreen from './src/screens/ChattingListScreen';
import ChattingScreen from './src/screens/ChattingScreen';
import MiniGameScreen from './src/containers/MiniGameScreen';
import MyProfileScreen from './src/containers/MyProfileScreen';
import rootReducer from './src/reducers/index';
import { Provider } from 'react-redux';
import RecommendRander from './src/components/RecommendRander';
import Capp from './src/containers/App';
import Detail from './src/components/Detail';
import { createStore, compose } from 'redux';
import ProFileChange from './src/containers/ProFileChange';
import { Entypo, AntDesign } from '@expo/vector-icons';
declare global {
  interface Window {
    devToolsExtension: typeof compose;
  }
}

const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : (f) => f,
);

// //로그인, sms인증, 회원가입 스택
const AuthStack = createStackNavigator(
  {
    LogIn: {
      screen: LogInScreen,
    },
    SmsAuth: {
      screen: SmsAuthScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#28F1A6',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#333333',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff',
      },
    },
  },
);

// 메인 스택
const MainStack = createStackNavigator(
  {
    Main: {
      screen: Capp,
    },
    Details: {
      screen: Detail,
    },
    RecommendRander: {
      screen: RecommendRander,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#28F1A6',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#333333',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff',
      },
    },
  },
);

// 채팅 스택
const ChatsStack = createStackNavigator(
  {
    ChattingList: {
      screen: ChattingListScreen,
    },
    Chatting: {
      screen: ChattingScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#28F1A6',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#333333',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff',
      },
    },
  },
);

// 미니게임 스택
const MiniGameStack = createStackNavigator(
  {
    MiniGame: {
      screen: MiniGameScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#28F1A6',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#333333',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff',
      },
    },
  },
);

// 프로필 스택
const MyProfileStack = createStackNavigator(
  {
    MyProfile: {
      screen: MyProfileScreen,
    },
    ProFileChange: {
      screen: ProFileChange,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#28F1A6',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#333333',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff',
      },
    },
  },
);

// 로그인 성공 후 보여질 탭 네비게이터 생성
const TabStack = createBottomTabNavigator(
  {
    home: {
      screen: MainStack,
      navigationOptions: {
        tabBarIcon: () => (
          <Entypo name="home" size={24} color="palevioletred" />
        ),
      },
    },
    채팅: {
      screen: ChatsStack,
      navigationOptions: {
        tabBarIcon: () => (
          <AntDesign name="wechat" size={24} color="palevioletred" />
        ),
      },
    },
    미니게임: {
      screen: MiniGameStack,
      navigationOptions: {
        tabBarIcon: () => (
          <Entypo name="game-controller" size={24} color="palevioletred" />
        ),
      },
    },
    프로필: {
      screen: MyProfileStack,
      navigationOptions: {
        tabBarIcon: () => (
          <AntDesign name="profile" size={24} color="palevioletred" />
        ),
      },
    },
  },
  {
    //   initialRouteName: 'MainStack',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 12,
      },
    },
  },
);

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Tab: TabStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const AppContainer = createAppContainer(RootStack);

interface AppProps {}

interface AppState {
  userToken: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    console.disableYellowBox = true; // 앱이나 콘솔화면에 노란색 경고문구 뜨는거 꺼주는 코드
    return (
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppContainer></AppContainer>
        </SafeAreaView>
      </Provider>
    );
  }
}

export default App;
