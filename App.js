import React, { Component, useState } from 'react';
import {
    Button, View, Text, TextView, StyleSheet, AsyncStorage,
    TouchableOpacity, ScrollView, Dimensions, Image, FlatList,
    SafeAreaView, RefreshControl
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';

//        <Button
//            onPress={() => navigation.navigate('Notifications')}
//            title="Go to notifications"
//        />

const ELEMENTS = [
    {
        id: "1",
        header: 'Title test #1',
        linkName: '#Tag1',
        linkNameSecond: '#Tag2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: "2",
        header: 'Title test #2',
        linkName: '#Tag1',
        linkNameSecond: '#Tag2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: "3",
        header: 'Title test #3',
        linkName: '#Tag1',
        linkNameSecond: '#Tag2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: "4",
        header: 'Title test #4',
        linkName: '#Tag1',
        linkNameSecond: '#Tag2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    }
];

let tasks = [
    {
        "question": "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą?",
        "answers": [
            {
                "content": "Lucjusz Cynna",
                "isCorrect": true
            },
            {
                "content": "Juliusz Cezar",
                "isCorrect": false
            },
            {
                "content": "Lucjusz Murena",
                "isCorrect": false
            },
            {
                "content": "Marek Krassus",
                "isCorrect": false
            }
        ],
        "duration": 10
    },
    {
        "question": "Które zwierzę jest największym płazem z poniższej puli?",
        "answers": [
            {
                "content": "Wąż boa",
                "isCorrect": false
            },
            {
                "content": "Waran",
                "isCorrect": false
            },
            {
                "content": "Żaba",
                "isCorrect": true
            },
            {
                "content": "Królik",
                "isCorrect": false
            }
        ],
        "duration": 10
    },
    {
        "question": "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą?",
        "answers": [
            {
                "content": "Lucjusz Cynna",
                "isCorrect": true
            },
            {
                "content": "Juliusz Cezar",
                "isCorrect": false
            },
            {
                "content": "Lucjusz Murena",
                "isCorrect": false
            },
            {
                "content": "Marek Krassus",
                "isCorrect": false
            }
        ],
        "duration": 17
    },
    {
        "question": "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą?",
        "answers": [
            {
                "content": "Lucjusz Cynna",
                "isCorrect": true
            },
            {
                "content": "Juliusz Cezar",
                "isCorrect": false
            },
            {
                "content": "Lucjusz Murena",
                "isCorrect": false
            },
            {
                "content": "Marek Krassus",
                "isCorrect": false
            }
        ],
        "duration": 20
    }
];

let RESULTS_DATA = [
    {
        id: 1,
        "nick": 'Marek',
        "score": 4,
        "total": 20,
        "type": 'historia',
        "date": '21-12-2019',
    },
    {
        id: 2,
        "nick": 'Roman',
        "score": 12,
        "total": 20,
        "type": 'historia',
        "date": '01-01-2020',
    },
    {
        id: 3,
        "nick": 'Hieronim',
        "score": 18,
        "total": 20,
        "type": 'historia',
        "date": '20-01-2020',
    },
    {
        id: 4,
        "nick": 'Marek',
        "score": 13,
        "total": 20,
        "type": 'historia',
        "date": '21-01-2020',
    },
];

function ListElement(props) {
    return (
        <View style={body.elementContainer}>
            <View style={body.element}>
                <Text style={body.header}>{props.header}</Text>
                    <View style={body.tags}>
                        <TouchableOpacity style={body.tag}>
                            <Text style={body.tagText}>{props.tags[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={body.tag}>
                            <Text style={body.tagText}>{props.tags[1]}</Text>
                        </TouchableOpacity>
                    </View>
                <Text style={body.content}>{props.body}</Text>
            </View>
        </View>
    );
}

function Header(props) {
     return (
        <View>
            <View style={header.container}>
                <Image
                    style={header.img}
                    source={require('./img/hamburger-icon.png')}
                />
                <Text style={header.text}>
                    { props.name }
                </Text>
            </View>

            <Text style={header.hr}></Text>
        </View>
     );
}

function Footer(props) {
    return (
        <View style={footer.container}>
            <View style={footer.content}>
                <Text style={footer.txt}>
                    Get to know your ranking result
                </Text>
                <TouchableOpacity
                    style={footer.cta}
                >
                    <Text
                        style={footer.ctaText}
                    >
                        Check!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const privacyContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const getIsAccepted = (navigation) => {
    AsyncStorage.getItem('privacy_accepted').then((isAcc) => {
        if(!(!!isAcc)) {
            navigation.navigate('Privacy');
        }
    });
};

const acceptPrivacyPolicy = (navigation) => {
    AsyncStorage.setItem('privacy_accepted', 'yes');
    navigation.navigate('Home');
};

function PrivacyAccept(props) {
    return (
            <TouchableOpacity style={test.answer}>
                <Text onPress={() => {acceptPrivacyPolicy(props.navigation);}} style={test.answerText}>Accept</Text>
            </TouchableOpacity>
    );
}

function PrivacyScreen({navigation}) {
    return (
        <ScrollView>
            <Header name="Welcome Page"/>

            <View style={body.container}>
                <Text style={privacy.header}>
                    Privacy Policy
                </Text>
                <Text style={privacy.content}>
                    {privacyContent}
                </Text>
                <PrivacyAccept navigation={navigation} />
             </View>
        </ScrollView>
    );
}

function ScoreScreen({ route, navigation }) {

console.log(route.params);
     return (
       <ScrollView>

        </ScrollView>
     );
}

function HomeScreen({ navigation }) {
    getIsAccepted(navigation);
  return (
    <ScrollView>
        <Header name="Home Page"/>

        <View style={body.container}>
            {

                ELEMENTS.map(element => {
                    return <ListElement
                                key={element.id}
                                header={element.header}
                                body={element.body}
                                tags={[element.linkName, element.linkNameSecond]}
                            />;
                })
            }
         </View>
        <Footer />
     </ScrollView>
  );
}

const RenderResult = (props) => {
    let styles = [body.tdBg];
    if (RESULTS_DATA.indexOf(props.item) % 2 == 0) {
        styles = [body.tdBgAccent];
    }
    return (
        <View style={[body.tr, styles]}>
            <View style={body.td}>
                <Text style={body.tdContent}>{props.item.nick}</Text>
            </View>
            <View style={body.td}>
                <Text style={body.tdContent}>{props.item.score}/{props.item.total}</Text>
            </View>
            <View style={body.td}>
                <Text style={body.tdContent}>{props.item.type}</Text>
            </View>
            <View style={body.td}>
                <Text style={body.tdContent}>{props.item.date}</Text>
            </View>
        </View>
    );
};

const RenderResultHead = () => {
    return (
        <View style={[body.tr]}>
            <View style={body.td}>
                <Text style={body.tdTitle}>Nick</Text>
            </View>
            <View style={body.td}>
                <Text style={body.tdTitle}>Points</Text>
            </View>
            <View style={body.td}>
                <Text style={body.tdTitle}>Type</Text>
            </View>
            <View style={body.td}>
                <Text style={body.tdTitle}>Date</Text>
            </View>
        </View>
    );
}

function ResultScreen({ navigation }) {
  const renderItem = ({item}) => (
        <RenderResult item={item}/>
  );

    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // RETRIEVE DATA
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View>
        <Header name="Results"/>


        <SafeAreaView style={body.table}>
            <RenderResultHead />
            <FlatList
                style={{display: 'flex'}}
                data={RESULTS_DATA}
                renderItem={renderItem}
                keyExtractor={item => RESULTS_DATA.indexOf(item).toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    </View>
  );
}

function Answer(props) {
    return (
            <TouchableOpacity
                style={test.answer}
                onPress={() => { props.callback(props.answerOption)} }
            >
                <Text style={test.answerText}>{props.content}</Text>
            </TouchableOpacity>
    );
}

class Timer extends React.Component {
    constructor(props: Object) {
      super(props);
      this.state = {
        timer: props.duration,
        nextQuestion: props.nextQuestion
      }
    }

    componentDidMount(){
      this.interval = setInterval(
        () => {
            if (this.state.timer === 0) {
                this.state.nextQuestion();
            } else {
                this.setState({
                    timer: this.state.timer - 1
                });
            }
        },
        1000
      );
    }

    componentWillUnmount(){
     clearInterval(this.interval);
    }


    UNSAFE_componentWillReceiveProps (newProps) {
      if( newProps.duration !== this.state.timer){
        clearInterval(this.interval);
        this.setState({
            timer: newProps.duration,
            nextQuestion: newProps.nextQuestion
        });

         this.interval = setInterval(
                () => {
            if (this.state.timer === 0) {
                this.state.nextQuestion();
            } else {
                this.setState({
                    timer: this.state.timer - 1
                });
            }
        }, 1000);
      }
    }

    render() {
      return (
        <View>
            <Text style={test.headerText}> Time: {this.state.timer} sec </Text>
        </View>
      )
    }
}

class ProgressBar extends React.Component {
    constructor(props: Object) {
      super(props);
      this.state = {
        timer: props.duration,
        duration: props.duration
      }
    }

    componentDidMount(){
      this.interval = setInterval(
        () => {

            if (this.state.timer === 0) {
                clearInterval(this.interval);
            } else {
                this.setState({ timer: this.state.timer - 1 });
            }
        },
        1000
      );
    }

    componentWillUnmount(){
     clearInterval(this.interval);
    }

    UNSAFE_componentWillReceiveProps (newProps) {
      if( newProps.duration !== this.state.timer){
        clearInterval(this.interval);
        this.setState({
            timer: newProps.duration,
            duration: newProps.duration
        });
          this.interval = setInterval(
            () => {
                    this.setState({
                        timer: this.state.timer - 1
                    });
            },
            1000
          );
      }
    }

    render() {
      return (
        <View style={test.progressBar}>
            <View style={[test.progress, {width: this.state.timer * 100 / this.state.duration * PROGRESS_BAR_WIDTH / 100}]}/>
        </View>
      )
    }
}

function TestScreen({ navigation }) {
    const [points, setPoints] = React.useState(0);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const countOfQuestions = tasks.length;
    const [quiz, setQuiz] = React.useState(tasks[0]);
    const [progress, setProgress] = React.useState(100);
    const [duration, setDuration] = React.useState(quiz.duration);


    const checkIsFinished = (answerOption) => {
            if (currentQuestion < countOfQuestions) {
                setCurrentQuestion(currentQuestion + 1);
                setQuiz(tasks[currentQuestion]);
                setDuration(tasks[currentQuestion + 1] ? tasks[currentQuestion + 1].duration: 0);
            }
    }

    const handleAnswerButtonClick = (answerOption) => {
        if (answerOption.isCorrect) {
            setPoints(parseInt(points) + 1);
        }

        checkIsFinished(answerOption);
    };

   const RESULT_VIEW = (
       <View>
            <Header name="Your result"/>
            <View style={test.container}>
                <Text style={test.headerText}>Scores:</Text>
                <Text style={test.headerText}>{points} / {countOfQuestions} pt</Text>
                <View style={body.container}>
                      {
                                       <TouchableOpacity style={drawer.buttonG} onPress={() => {
                                           navigation.navigate("Home")}
                                       }>
                                           <Text style={drawer.buttonText}>Go to Home</Text>
                                       </TouchableOpacity>
                      }
                </View>
            </View>
       </View>
   );

   const nextQuestion = () => {
        console.log('next');
        checkIsFinished();
   };

   const TEST_VIEW = (
        <View>
             <Header name="Test #3" />
                <View style={test.container}>
                    <View style={test.header}>
                        <Text style={test.headerText}> Question {currentQuestion + 1} of {countOfQuestions} </Text>
                        <Timer nextQuestion={nextQuestion} duration={duration}/>
                    </View>
                    <View style={test.questionContainer}>
                        <ProgressBar duration={duration}/>

                        <Text style={test.headerText}>
                            {
                                quiz.question
                            }
                        </Text>
                        <Text style={test.headerBody}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>
                    </View>
                    <View style={test.answerContainer}>
                        {
                            quiz.answers.map((answer, key) => {
                                    return <Answer
                                        answerOption={answer}
                                        callback={handleAnswerButtonClick}
                                        content={answer.content}
                                        key={key}
                                    />
                                }
                            )
                        }
                    </View>
                </View>
        </View>
   );

  return (
    <ScrollView>
            {
                (currentQuestion >= countOfQuestions) ? RESULT_VIEW : TEST_VIEW
            }
    </ScrollView>
  );
}

const Drawer = createDrawerNavigator();

function DrawerButton(props) {
    return (

            <TouchableOpacity style={drawer.buttonG} onPress={() => {
                props.navigation.navigate(props.target)}
            }>
                <Text style={drawer.buttonText}>{props.name}</Text>
            </TouchableOpacity>

    );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
        <View style={drawer.header}>
            <Text style={drawer.appName}>Quiz App</Text>
        </View>

        <View style={drawer.imgContainer}>
            <Image
                style={drawer.img}
                source={require('./img/placeholder.png')}
            />
        </View>

        <DrawerButton navigation={props.navigation} name="Home" target="Home"/>
        <DrawerButton navigation={props.navigation} name="Result" target="Result"/>

        <Text style={drawer.hr}></Text>

        <DrawerButton navigation={props.navigation} name="Test #1" target="Test"/>
        <DrawerButton navigation={props.navigation} name="Test #2" target="Test"/>
        <DrawerButton navigation={props.navigation} name="Test #3" target="Test"/>



    </DrawerContentScrollView>
  );
}

const SPLASH_SCREEN_TIME = 2000;
export default class App extends Component<{}> {
    constructor(){
        super();

        this.state = {
            isVisible : true,
        }
    }

    Hide_Splash_Screen = () => {
        this.setState({
            isVisible : false
        });
    }

    componentDidMount(){
        const that = this;
        setTimeout(() => {
            that.Hide_Splash_Screen();
        }, SPLASH_SCREEN_TIME);
    }

    render(){
        let Splash_Screen = (
            <View style={splashStyles.root}>
                <View style={splashStyles.child}>
                    <Image source={require('./img/loader.png')}
                        style={{width:'100%', height: '100%', resizeMode: 'contain'}}
                    />
                </View>
            </View>
        );

        let Drawer_Screen = (
            <Drawer.Navigator  drawerStyle={drawer.container} initialRouteName="Home"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen name="Privacy" component={PrivacyScreen} />
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Result" component={ResultScreen} />
                <Drawer.Screen name="Test" component={TestScreen} />
                <Drawer.Screen name="Score" component={ScoreScreen} />
            </Drawer.Navigator>
        );

      return (
        <NavigationContainer>
            {
                (this.state.isVisible === true) ? Splash_Screen : Drawer_Screen
            }
        </NavigationContainer>
      );
    }
}

const COLOR_WHITE = '#ffffff';
const COLOR_ACCENT = '#ff6961';
const COLOR_SECONDARY = '#ff9994';
const COLOR_BLACK = '#000000';
const COLOR_LINKS = '#45b6fe';
const BORDER_SIZE = 4;

// ELEMENTS' HEIGHT
const SCREEN_HEIGHT = Dimensions.get("window").height;
const HEADER_HEIGHT = 0.14 * SCREEN_HEIGHT;
const FOOTER_HEIGHT = 0.18 * SCREEN_HEIGHT;

const header = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: COLOR_ACCENT,
    height: HEADER_HEIGHT,
    justifyContent: 'space-between'
  },

  text: {
    fontSize: 40,
    color: COLOR_WHITE,
    fontWeight: 'bold'
  },

  hr: {
    height: BORDER_SIZE,
    alignSelf: 'stretch',
    backgroundColor: COLOR_BLACK
  },

  img: {
    width: 40,
    height: 40,
    padding: 10
  }
});

const footer = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BLACK,
    height: FOOTER_HEIGHT,
    padding: 0
  },

  content: {
    backgroundColor: COLOR_WHITE,
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    margin: BORDER_SIZE,
    alignItems: 'center'
  },

  cta: {
    marginTop: 10,
    backgroundColor: COLOR_SECONDARY,
    padding: 15,
    width: 120,
    borderRadius: 10
  },

  ctaText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  txt: {
    color: COLOR_BLACK
  }
});

const PROGRESS_BAR_WIDTH = 350;
const ANSWER_HEADER_MARGIN_TOP = 20;
const ANSWER_WIDTH = '46%';
const ANSWER_MARGI_TOP = 20;

const test = StyleSheet.create({
    container: {
        backgroundColor: COLOR_WHITE,
        padding: 30
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    headerText: {
        marginTop: ANSWER_HEADER_MARGIN_TOP,
        color: COLOR_BLACK,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },

    headerBody: {
        marginTop: ANSWER_HEADER_MARGIN_TOP,
        color: COLOR_BLACK,
        fontSize: 12,
        textAlign: 'left'
    },

    questionContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    progressBar: {
        marginTop: ANSWER_HEADER_MARGIN_TOP,
        backgroundColor: COLOR_BLACK,
        height: 10,
        borderRadius: 3,
        width: PROGRESS_BAR_WIDTH,
        zIndex: 4,

    },

    progress: {
        backgroundColor: COLOR_ACCENT,
        zIndex: 5,
        height: 8,
        top: 1
    },

    answerContainer: {
        marginTop: ANSWER_HEADER_MARGIN_TOP,
        padding: 30,
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 3,
        flexWrap: 'wrap',
        borderColor: COLOR_BLACK,
        flex: 1,
        justifyContent: 'space-between'
    },

    answer: {
        padding: 10,
        backgroundColor: COLOR_SECONDARY,
        borderColor: COLOR_ACCENT,
        borderWidth: 3,
        borderRadius: 3,
        width: ANSWER_WIDTH,
        margin: 5
    },

    answerText: {
        color: COLOR_BLACK,
        textAlign: 'center'
    }
});

const RESULT_TD_WIDTH = '25%';
const body = StyleSheet.create({
    container: {
        backgroundColor: COLOR_WHITE,
        padding: 30
    },

    table: {
        backgroundColor: COLOR_WHITE,
        margin: 30
    },

    tr: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: COLOR_BLACK,
        borderWidth: 2
    },

    td: {
        padding: 5,
        paddingTop: 15,
        paddingBottom: 15,
        width: RESULT_TD_WIDTH,
    },

    tdContent: {
        color: COLOR_BLACK,
    },

    tdBg: {
        backgroundColor: COLOR_WHITE
    },

    tdBgAccent: {
        backgroundColor: COLOR_SECONDARY
    },

    tdTitle: {
        padding: 5,
        fontWeight: 'bold',
        color: COLOR_BLACK,
        paddingTop: 15,
        paddingBottom: 15,
    },

    elementContainer: {
        marginTop: 14,
        marginBottom: 14,
        backgroundColor: COLOR_BLACK,
        padding: 2
    },

    element: {
        backgroundColor: COLOR_WHITE,
        padding: 16
    },

    header: {
        fontSize: 18,
        color: COLOR_BLACK,
        fontWeight: 'bold'
    },

    tags: {
        marginTop: 14,
        marginBottom: 14,
        display: 'flex',
        flexDirection: 'row'
    },

    tag: {
        marginRight: 6,
        color: COLOR_WHITE,
        backgroundColor: COLOR_SECONDARY,
        borderRadius: 10,
        padding: 6
    },

    tagText: {
        color: COLOR_WHITE
    },

    content: {
        color: COLOR_BLACK
    }
});

const DRAWER_MARGIN_TOP = 30;
const HEADER_WIDTH = '100%';
const PLACEHOLDER_WIDTH = '90%';
const PLACEHOLDER_MARGIN_WIDTH = '5%';
const drawer = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: COLOR_SECONDARY,
        display: 'flex'
    },

    header: {
        width: HEADER_WIDTH,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
    },

    appName: {
       color: COLOR_BLACK,
       fontSize: 24,
       fontWeight: 'bold',
       color: COLOR_BLACK,
       padding: 0,
       margin: 0,
       textAlign: 'center'
    },

    imgContainer: {
        backgroundColor: COLOR_WHITE,
        marginTop: DRAWER_MARGIN_TOP
    },

    hr: {
      height: BORDER_SIZE,
      alignSelf: 'stretch',
      backgroundColor: COLOR_BLACK,
      marginTop: DRAWER_MARGIN_TOP
    },

    img: {
        width: PLACEHOLDER_WIDTH,
        margin: PLACEHOLDER_MARGIN_WIDTH,
    },

    buttonG: {
        backgroundColor: COLOR_WHITE,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: COLOR_BLACK,
        marginTop: DRAWER_MARGIN_TOP / 2
    },

    buttonText: {
        color: COLOR_BLACK,
        fontSize: 14,
        padding: 10,
        textAlign: 'center'
    }
});

const privacy = StyleSheet.create({
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLOR_BLACK
    },

    content: {
        color: COLOR_BLACK,
        marginTop: ANSWER_HEADER_MARGIN_TOP,
        marginBottom: ANSWER_HEADER_MARGIN_TOP
    }
});

const splashStyles = StyleSheet.create({
        root: {
            zIndex: 998,
            justifyContent: 'center',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
        },

        child: {
            zIndex: 999,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR_ACCENT,
            flex:1,
        },
});