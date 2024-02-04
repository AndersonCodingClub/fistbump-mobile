import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface BackgroundButtonProps {
    onPress: () => void;
    title?: string;
    isEnabled?: boolean;
    style: any;
    opacity?: any;
    fontSize?: any;
    fontWeight?: string;
}

const defaultProps = {
    title: '',
    isEnabled: true,
    opacity: 0.2,
    fontSize: 25,
    fontWeight: 'bold'
}

function BackgroundButton (propsIn: BackgroundButtonProps) {
    const props = {...defaultProps, ...propsIn}

    return(
        <TouchableOpacity activeOpacity={props.opacity} onPress={props.onPress} disabled={!props.isEnabled} style={props.style}>
            <Text style={[styles.buttonText, {fontSize: props.fontSize, fontFamily: (props.fontWeight == 'bold') ? 'Roobert-Bold' : 'Roobert-Regular'}]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: '#372F35',
        textAlign: 'center',
    }
});

export default BackgroundButton;