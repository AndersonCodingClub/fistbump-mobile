import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import BackgroundButton from './BackgroundButton';

interface BumperProps {
    location: string;
    title: string;
    subtext?: string;
    image?: string;
    onPress: () => void;
    fontSize?: any;
}

const defaultProps = {
    subtext: '',
    image: '',
    fontSize: 35
}

function Bumper (propsIn: BumperProps) {
    const props = {...defaultProps, ...propsIn}

    return (
        <BackgroundButton fontSize={props.fontSize} title={"Daily Fistbump:"} style={styles.fistbumpButton} onPress={props.onPress} opacity={1}>
            <Text style={styles.fistbumpButtonSubText}>gdfhdfhsdfh</Text>
        </BackgroundButton>
    );
}

const styles = StyleSheet.create({
    fistbumpButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#BCB4F7',
        width: '100%',
        borderRadius: 25,
        paddingTop: 50,
        paddingBottom: 50,
        justifyContent: 'flex-start'
    },

    fistbumpButtonSubText: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        flex: 3,
    },
});

export default Bumper;