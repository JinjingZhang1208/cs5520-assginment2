import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../colors';
import { useNavigation } from '@react-navigation/native';
import PressableButton from '../components/PressableButton';
import { writeToDB } from '../firebase-files/firestoreHelper';
import { collection, onSnapshot } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { deleteFromDB } from '../firebase-files/firestoreHelper';
import { AntDesign } from '@expo/vector-icons';
import { database } from '../firebase-files/firebaseSetup';
import { updateInDB } from '../firebase-files/firestoreHelper';
import Checkbox from 'expo-checkbox';

export default function AddActivity() {
    const navigation = useNavigation();

    const route = useRoute();
    const { activity } = route.params || {};

    const [refreshData, setRefreshData] = useState(false); 

    const [isEditting, setIsEditting] = useState(activity ? 'Edit' : 'AddActivity');

    const handleDelete = () => {
      Alert.alert(
        'Delete',
        'Are you sure you want to delete this activity?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              await deleteFromDB(activity.id);
              setRefreshData(prevState => !prevState); // Trigger data refresh
              navigation.goBack();
            },
            style: 'destructive',
          },
        ]
      );
    };

    useEffect(() => {
      // Customize the header with the delete button
      navigation.setOptions({
        headerRight: () => (
          <PressableButton
              customStyle={{ marginRight: 15, backgroundColor: Colors.bottomBar}}
              onPress={handleDelete}
            >
              <AntDesign name="delete" size={24} color="white" />
            </PressableButton>
        ),
      });
    }, []);

    //store the id of the activity that the user wants to edit
    const [activityId, setActivityId] = useState(null); 
      
    // Store data related to the activity
    const [open, setOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [items, setItems] = useState([
      {label: 'Walking', value: 'Walking'},
      {label: 'Running', value: 'Running'},
      {label: 'Swimming', value: 'Swimming'},
      {label: 'Weights', value: 'Weights'},
      {label: 'Yoga', value: 'Yoga'},
      {label: 'Cycling', value: 'Cycling'},
      {label: 'Hiking', value: 'Hiking'},
    ]);
    // Store data related to the date
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showDate, setShowDate] = useState(false);
    // Store data related to the duration
    const [duration, setDuration] = useState('');
    const [isChecked, setChecked] = useState(false);
    
    useEffect(() => {
      if (activity) {
        setActivityId(activity.id);
        setSelectedActivity(activity.name);
        setDuration(activity.duration);
        setDate(activity.date.toDate());
      }
    }, [activity, refreshData]);

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

    // Format the date to be displayed
    const formatDate = (date) => {
      if (date) {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      } else {
        return ''; 
      }
    };

    // Cancel button takes the user back to the previous screen (to the specific tab that they were viewing before).
    const cancelRedirect = () => {
      navigation.goBack();
    }

    // Validate user's entries (e.g. no negative number or letters for duration, no empty submission,...)
    const validateData = async () => {
      const durationNumber = parseInt(duration);
      if (
        duration.trim() === '' || // Check for empty or whitespace duration
        selectedActivity === null || // Check if an activity is selected
        isNaN(durationNumber) || // Check if duration is not a number
        durationNumber < 0 || // Check if duration is less than 0
        duration !== durationNumber.toString() || // Check if duration contains non-numeric characters
        date === null || // Check if date is null
        date === '' || // Check if date is empty
        date === undefined // Check if date is undefined
      ) {
        Alert.alert('Invalid input', 'Please check your input values', [
          {text: 'OK'},
        ]);
      } else {
        // Create a new activity object
        const newActivity = {
          name: selectedActivity,
          duration: duration, 
          date: new Date(date),
          // By default, set the activity as not special
          // special: false,
          special: isChecked,
        };
    
        // Check if the selected activity is running or weights and the duration is greater than 60 minutes
        if ((selectedActivity.toLowerCase() === 'running' || selectedActivity.toLowerCase() === 'weights') && durationNumber > 60) {
          newActivity.special = true; // Mark the activity as special
        }
       
        if (isEditting === 'Edit') {
          Alert.alert(
            'Important',
            'Are you sure you want to save these changes?',
            [
              {
                text: 'No',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: async () => {
                  try {
                    await updateInDB(activity.id, newActivity);
                    // After the update operation is completed, navigate back
                    navigation.goBack();
                  } catch (error) {
                    // Handle any errors that occur during the update operation
                    console.error('Error updating activity:', error);
                  }
                },
                style: 'destructive',
              },
            ]
          ); 
          if (isChecked === true && activity.special === true) {
            newActivity.special = false;
            setChecked(false);
          }
        } else {
          // Store the new activity in the database
          const newActivityId = await writeToDB(newActivity);
          setActivityId(newActivityId);
          // Reset state values
          setSelectedActivity(null);
          setDuration('');
          setDate('');
          setChecked(false);
          // Trigger data refresh
          setRefreshData(prevState => !prevState);
          navigation.goBack();
        }
      }
    };
          
    const [activityArray, setActivityArray] = useState([]);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(database, 'activities'), (querySnapshot) => {
        const activitiesData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          activitiesData.push({ id: doc.id, name: data.name, duration: data.duration, date: data.date, special: data.special }); 
        });
        setActivityArray(activitiesData);
      });
    
      return () => unsubscribe();
    }, []);

    return (
      <View style = {styles.container}>
        <Text style={styles.subtitle}>Activity *</Text>
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
        <PressableButton onPress={showDatepicker} customStyle={styles.dateContainer}>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </PressableButton>
        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            display="inline"
            onChange={onChangeDate}
          />
        )}
      {isEditting === 'Edit' && activity.special === true ? (
          <View style={styles.section}>
            <Checkbox 
              style={styles.checkbox} 
              value={isChecked} 
              onValueChange={setChecked}
            />
            <Text style={styles.paragraph}>This item is marked as special. Select the checkbox if you would like to approve it.</Text>
          </View>
        ) : null}

        <View style={styles.buttonContainer}>
          <PressableButton onPress={cancelRedirect} customStyle={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </PressableButton>
          <PressableButton onPress={validateData} customStyle={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </PressableButton>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', 
    alignItems: 'center',
    flex: 1,
  },
  dateContainer: {
    backgroundColor: "white",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: '80%',
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
    width: '80%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1, 
    borderColor: 'black', 
    paddingLeft: 10,
  },
  dropDownContainer: {
    width: '80%',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '55%',
    marginTop: '52%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: Colors.border,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    width: '80%',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  checkbox: {
    margin: 8,
  },
}); 

