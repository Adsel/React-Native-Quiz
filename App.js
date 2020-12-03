import * as React from 'react';
import {
    Button, View, Text, TextView, StyleSheet,
    TouchableOpacity, ScrollView, Dimensions, Image
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
        id: 1,
        header: 'Title test #1',
        linkName: '#Tag1',
        linkNameSecond: '#Tag2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: 2,
        header: 'Title test #2',
        linkName: '#Tag1',
        linkNameSecond: '#Tag2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: 3,
        header: 'Title test #3',
        linkName: '#Tag1',
        linkNameSecond: '#Tag2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: 4,
        header: 'Title test #4',
        linkName: '#Tag1',
        linkNameSecond: '#Tag2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    }
];

const MAX_POINTS = 20;
const RESULTS = [
    {
        id: 1,
        nick: 'asdf',
        points: 4,
        date: '21-12-2019',
        type: 'test1'
    },
    {
        id: 2,
        nick: 'kfs',
        points: 14,
        date: '22-12-2019',
        type: 'test1'
    },
    {
        id: 3,
        nick: 'wer',
        points: 17,
        date: '24-12-2019',
        type: 'test1'
    },
    {
        id: 4,
        nick: 'qwert',
        points: 10,
        date: '21-12-2019',
        type: 'test1'
    }
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


function HomeScreen({ navigation }) {
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

//<Button onPress={() => navigation.goBack()} title="Go back home" />

function TableRow(props) {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignSelf: 'stretch' }} /> { /* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
            </View>
        );
}

function ResultScreen({ navigation }) {
    state = {
      tableHead: ['Nick', 'Point', 'Type', 'Date']
    }

  return (
    <ScrollView>
        <Header name="Results"/>

        <Table style={body.table} borderStyle={{borderWidth: 3, borderColor: COLOR_BLACK}}>
            <Row style={body.tdTitleBg} textStyle={body.tdTitle} data={state.tableHead} />
            {
                RESULTS.map((element, index) => {

                    const styles = index % 2 == 0 ? body.tdBgAccent: body.tdBg;
                    return <Row
                        key={element.id}
                        style={styles}
                        textStyle={body.td}
                        data={[
                            element.nick, element.points, element.type, element.date
                        ]}
                    />;
                })
            }
            <Rows data={state.tableData} />
        </Table>
    </ScrollView>
  );
}

function Answer(props) {
    return (
            <TouchableOpacity style={test.answer}>
                <Text style={test.answerText}>{props.content}</Text>
            </TouchableOpacity>
    );
}

function TestScreen({ navigation }) {
  return (
    <ScrollView>
      <Header name="Test #3" />
      <View style={test.container}>
        <View style={test.header}>
            <Text style={test.headerText}> Question 3 of 10 </Text>
            <Text style={test.headerText}> Time: 28 sec </Text>
        </View>
        <View style={test.questionContainer}>
            <View style={test.progressBar}>
                <View style={test.progress}/>
            </View>

            <Text style={test.headerText}>This is some example of a long question to fill the content?</Text>
            <Text style={test.headerBody}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
        </View>
        <View style={test.answerContainer}>
            <Answer content="Answer A" />
            <Answer content="Answer B" />
            <Answer content="Answer C" />
            <Answer content="Answer D" />
        </View>
      </View>
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

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator  drawerStyle={drawer.container} initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Result" component={ResultScreen} />
        <Drawer.Screen name="Test" component={TestScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
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

const ANSWER_HEADER_MARGIN_TOP = 20;
const PROGRESS_WIDTH = '80%';
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
        zIndex: 4
    },

    progress: {
        width: PROGRESS_WIDTH,
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

const body = StyleSheet.create({
    container: {
        backgroundColor: COLOR_WHITE,
        padding: 30
    },

    table: {
        backgroundColor: COLOR_WHITE,
        margin: 30
    },

    td: {
        padding: 5,
        paddingTop: 15,
        paddingBottom: 15,
        color: COLOR_BLACK
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
