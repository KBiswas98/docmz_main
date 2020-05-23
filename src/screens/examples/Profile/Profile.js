import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  useWindowDimensions,
  PermissionsAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AnimInput from '../../../components/molecules/AnimInput/AnimInput';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {UploadProfilePic} from '../../../redux/action/patientAccountAction';

function Profile() {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.AuthReducer);
  const {patient} = useSelector(state => state.PatientAccountReducer);
  const dimen = useWindowDimensions();
  const screenWidth = dimen.width;
  const [inputFields, setInputFields] = useState({
    name: '',
    phone: '',
    email: '',
    sex: '',
    dob: '',
    bloodGroup: '',
    height: '',
    weight: '',
  });
  useEffect(() => {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    const {
      firstName,
      lastName,
      phone,
      email,
      sex,
      dob,
      bloodGroup,
      height,
      weight,
    } = patient;
    // console.log(patient.name);
    // console.log(patient.phone);
    // console.log(patient.email);
    // console.log(patient.sex);
    // console.log(patient.dob);
    // console.log(patient.bloodGroup);
    // console.log(patient.height);
    // console.log(patient.weight);
    setInputFields({
      name: `${firstName} ${lastName}`,
      phone,
      email,
      sex,
      dob,
      bloodGroup,
      height,
      weight,
    });
  }, []);
  const onChoosePicture = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    console.log(granted);
    if (granted) {
      PickImage();
    } else {
      askPermission();
    }
  };
  const askPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'DocMz needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        PickImage();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const PickImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        // const path = response.fileName;
        // setData({...data, imagePath: path});
        dispatch(UploadProfilePic(data.id, response));
        // console.log(
        //   '###################---------------------------------#############################################--------------------------------------###',
        // );
        // console.log(data.id);
        // console.log(
        //   '###################---------------------------------#############################################--------------------------------------###',
        // );
        // console.log(response);
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 5,
            paddingBottom: 5,
          }}>
          <TouchableOpacity
            style={{
              width: '10%',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'stretch',
            }}
            // onPress={}
          >
            <FontAwesome size={30} color={'#ff1f75'} name="angle-left" />
          </TouchableOpacity>
          <Text style={{fontSize: 18, marginLeft: 15}}>Profile</Text>
        </View>
        <View
          style={{
            flex: 4,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 8,
            paddingBottom: 8,
          }}>
          <TouchableOpacity onPress={onChoosePicture}>
            <View
              style={{
                height: 150,
                width: 150,
                borderRadius: 150,
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={require('../../../assets/jpg/person1.jpg')}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  height: 30,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(80,80,80,0.3)',
                }}>
                <Text style={{color: '#f2f2f2', fontSize: 12}}>Upload</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 10,
            paddingLeft: 25,
            paddingRight: 25,
            paddingTop: 8,
            paddingBottom: 8,
          }}>
          <AnimInput
            placeholder="Name"
            value={inputFields.name}
            style={{Container: {marginBottom: 5, borderBottomWidth: 0.5}}}
          />
          <AnimInput
            placeholder="Contact Number"
            value={inputFields.phone}
            style={{Container: {marginBottom: 5, borderBottomWidth: 0.5}}}
          />
          <AnimInput
            placeholder="Email Id"
            value={inputFields.email}
            style={{Container: {marginBottom: 5, borderBottomWidth: 0.5}}}
          />
          <AnimInput
            placeholder="Gender"
            value={inputFields.sex}
            style={{Container: {marginBottom: 5, borderBottomWidth: 0.5}}}
          />
          <AnimInput
            placeholder="Date of Birth"
            value={inputFields.dob}
            style={{Container: {marginBottom: 5, borderBottomWidth: 0.5}}}
          />
          <AnimInput
            placeholder="Blood Group"
            value={inputFields.bloodGroup}
            style={{Container: {marginBottom: 5, borderBottomWidth: 0.5}}}
          />
          <AnimInput
            placeholder="Height"
            value={inputFields.height}
            style={{Container: {marginBottom: 5, borderBottomWidth: 0.5}}}
          />
          <AnimInput
            placeholder="Weight"
            value={inputFields.weight}
            style={{Container: {marginBottom: 5, borderBottomWidth: 0.5}}}
          />

          <TouchableOpacity
            style={{
              width: screenWidth * 0.6,
              height: 52,
              backgroundColor: '#ff1f75',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 40,
              borderRadius: 15,
              elevation: 3,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Text style={{color: '#f1f1f1'}}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;
