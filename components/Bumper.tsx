import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import BackgroundButton from './BackgroundButton';

interface BumperProps {
    location: string;
    title: string;
    subtext?: string;
    onPress: () => void;
    fontSize?: any;
}

const defaultProps = {
    subtext: '',
    fontSize: 35
}

function configureStyles (location: any, subtext: string) {
    if (location == "bottom") {
        styles.fistbumpButtonLocation = {bottom: 0}
    } else if (location == "top") {
        styles.fistbumpButtonLocation = {top: 0}
    } else {
        throw("Bumper location must be 'top' or 'bottom'");
    }

    if (subtext == '') {
        styles.fistbumpButtonSubText = {        
        fontFamily: 'Roobert',
        color: '#372F35',
        textAlign: 'center',
        fontSize: 0,
        marginTop: 0,
        flex: 3
        };
    }
}

function Bumper (propsIn: BumperProps) {
    const props = {...defaultProps, ...propsIn}
    configureStyles(props.location, props.subtext);

    return (
        <TouchableOpacity activeOpacity={1} onPress={props.onPress} style={[styles.fistbumpButton, styles.fistbumpButtonLocation]}>
            <Text style={[styles.fistbumpButtonTitle, {fontSize: props.fontSize} ]}>{props.title}</Text>
            <Text style={styles.fistbumpButtonSubText}>{props.subtext}</Text>
        </TouchableOpacity>    
    );
}

const styles = StyleSheet.create({
    fistbumpButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#BCB4F7',
        width: '100%',
        borderRadius: 25,
        paddingTop: 40,
        paddingBottom: 40,
        justifyContent: 'flex-start'
    },

    fistbumpButtonLocation: {},

    fistbumpButtonTitle: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        flex: 3,
    },

    fistbumpButtonSubText: {
        fontFamily: 'Roobert',
        color: '#372F35',
        textAlign: 'center',
        fontSize: 25,
        marginTop: 0,
        flex: 3,
    },
});

export default Bumper;