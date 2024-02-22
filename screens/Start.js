import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
// import Button from '../components/Button'
import Colors from '../colors'
import { useNavigation } from '@react-navigation/native'; 
import PressableButton from '../components/PressableButton';
import { database } from '../firebase-files/firebaseSetup'; 

export default function Start() {
    const navigation = useNavigation(); 
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phonenumberError, setPhonenumberError] = useState(''); 
    const [inputEmpty, setInputEmpty] = useState(true);  
        
    const emailHandler = (inputEmail) => {
        setEmail(inputEmail);
        setEmailError('');
        // setInputEmpty(false);
        setInputEmpty(inputEmail.trim().length === 0 && phonenumber.trim().length === 0);
    }

    const phonenumberHandler = (inputPhonenumber) => {    
        setPhonenumber(inputPhonenumber);
        setPhonenumberError('');
        // setInputEmpty(false);
        setInputEmpty(email.trim().length === 0 && inputPhonenumber.trim().length === 0);
    } 

    const handleReset = () => {
        setEmail('');
        setPhonenumber('');
        setEmailError('');
        setPhonenumberError('');
        setInputEmpty(true);
    }
    
    const handleStartButton = () => { 
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const phoneRegex = /^[0-9]{10}$/;
        //check if email and phone number are valid
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
        }

        if (!phoneRegex.test(phonenumber)) {
            setPhonenumberError('Please enter a valid phone number.');
        }

        if (emailRegex.test(email) && phoneRegex.test(phonenumber)) {
            navigation.navigate("AllActivity");
        }
    }

    return (
        <View style = {styles.container}>
            <Text style={styles.word}>Email Address</Text>
            <TextInput onChangeText={emailHandler} style={styles.input} value={email}/>
            {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
            <Text style={styles.word}>Phone Number</Text>
            <TextInput onChangeText={phonenumberHandler} style={styles.input} value={phonenumber}/>
            {phonenumberError ? <Text style={styles.errorMessage}>{phonenumberError}</Text> : null}
            <View style={styles.buttonContainer}>
                {/* <Button title="Reset" onPress={handleReset} />
                <Button title="Start" onPress={handleStartButton} disabled={inputEmpty} /> */}
                <PressableButton
                    customStyle={{ backgroundColor: Colors.border }}
                    onPress={handleReset}>
                        <Text style={styles.buttonText}>Reset</Text>
                </PressableButton>
                <PressableButton onPress={handleStartButton} disabled={inputEmpty} customStyle={{ backgroundColor: Colors.border }}>
                    <Text style={inputEmpty ? styles.disabledButtonText : styles.buttonText}>Start</Text>
                </PressableButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 20, 
    },
    input: {
        borderWidth: 2, 
        borderColor: Colors.border, 
        borderRadius: 5, 
        padding: 15,
        width: '90%',
        marginVertical: 10, 
    },
    word: {
        fontSize: 18,
        textAlign: 'center', 
        marginRight: 220,
        marginBottom: 5, 
        color: Colors.text,
    },
    errorMessage: {
        marginBottom: 10,
        marginTop: 10,
    },
    buttonText: { 
        color: 'white', 
        fontSize: 20 
    },
    disabledButtonText: {
        color: 'grey',
        fontSize: 20,
    },
})