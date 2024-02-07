import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../colors';
import { useNavigation } from '@react-navigation/native';
import { ActivityContext } from '../ActivityContext';

export default function AddActivity() {
    const navigation = useNavigation();
    const { addToActivityArray } = useContext(ActivityContext);

    //store data related to the activity
    const [open, setOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [items, setItems] = useState([
      {label: 'Walking', value: 'walking'},
      {label: 'Running', value: 'running'},
      {label: 'Swimming', value: 'swimming'},
      {label: 'Weights', value: 'weights'},
      {label: 'Yoga', value: 'yoga'},
      {label: 'Cycling', value: 'cycling'},
      {label: 'Hiking', value: 'hiking'},
    ]);
    //store data related to the date
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showDate, setShowDate] = useState(false);
    //store data related to the duration
    const [duration, setDuration] = useState('');
    
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(false);
        setDate(currentDate);
      };
    
    const showMode = (currentMode) => {
        setShowDate(true);
        setMode(currentMode);
      };

    const showDatepicker = () => {
    showMode('date');
    };

    //format the date to be displayed
    const formatDate = (date) => {
      if (date) {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      } else {
        return ''; // Return empty string when date is null
      }
    };

    //Cancel button takes the user back to the previous screen (to the specific tab that they were viewing before).
    const cancelRedirect = () => {
      navigation.goBack();
    }

    //validate user's entries (e.g. no negative number or letters for duration, no empty submission,...)
    const validateData = () => {
      if (duration === '' || selectedActivity === null || isNaN(parseInt(duration)) || (parseInt(duration) < 0)
        || date === null || date === '' || date === undefined) {
          Alert.alert('Invalid input', 'Please check your input values', [
            {text: 'OK'},
          ]);
      }
      // When all validations passed, store the data to the context and redirect the user to the previous screen.
      addToActivityArray({ name: selectedActivity, duration, date });
      setSelectedActivity(null);
      setDuration('');
      setDate('');
      navigation.goBack();
      }

    return (
      <View style = {styles.container}>
        <Text style={styles.subtitle1}>Activity *</Text>
        <DropDownPicker
            placeholder="Select An Activity" 
            open={open}
            value={selectedActivity}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedActivity}
            setItems={setItems}
            containerStyle = {styles.dropDownContainer}
        />
        <Text style={styles.subtitle}>Duration (min) * </Text>
        <TextInput value={duration} onChangeText={setDuration} style={styles.durationContainer}/>
        <Text style={styles.subtitle}>Date</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateContainer}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
        </TouchableOpacity>
        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            display="inline"
            onChange={onChangeDate}
          />
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={cancelRedirect} style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={validateData} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
 
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  dateContainer: {
    backgroundColor: "white",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: 400, 
    height: 40,
    borderRadius: 5,
    borderWidth: 1, 
    borderColor: 'black', 
    paddingLeft: 10,
  },
  durationContainer: {
    backgroundColor: "white",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: 400, 
    height: 40,
    borderRadius: 5,
    borderWidth: 1, 
    borderColor: 'black', 
    paddingLeft: 10,
  },
  dropDownContainer: {
    width: 400, 
    marginTop: 3,
    borderRadius: 5,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: Colors.text,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 40,
    color: Colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 400,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
},
buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
}
})