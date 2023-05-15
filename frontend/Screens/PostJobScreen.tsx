/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon, {Icons} from '../components/ui/Icons';
import ListViewModal from '../components/ui/ListViewModal';
import DatePicker from 'react-native-date-picker';
import {RootState} from '../reducers/Store';
import {useSelector} from 'react-redux';
import {post1Job} from '../api/job_api';
function PostJobScreen(props: any) {
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);

  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [workplaceType, setWorkplaceType] = useState('On-site');
  const [wpopen, setWPOpen] = useState(false);
  const [jobType, setJobType] = useState('Full-time');
  const [jopen, setJOpen] = useState(false);
  const toggleModal = () => {
    props.setVisible(!props.isVisible);
  };
  const list1 = [{title: 'On-site'}, {title: 'Hybrid'}, {title: 'Remote'}];
  const list2 = [
    {title: 'Full-time'},
    {title: 'Part-time'},
    {title: 'Contract'},
    {title: 'Temporary'},
    {title: 'Other'},
    {title: 'Volunteer'},
    {title: 'Internship'},
  ];

  const handlePost = () => {
    const data = {
      title: title,
      description: jobDescription,
      workplaceType: workplaceType,
      employeeLocation: jobLocation,
      jobType: jobType,
      deadline: date,
      company: {
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/f/f1/Pornhub-logo.svg',
        name: companyName,
        linkToWebsite: 'pornhub.hihi',
      },
    };
    post1Job(data, uid, token)
      .then((response: any) => {
        if (response.status === 200) {
          console.log(response.data);
        } else {
          console.log(response.response.status);
          throw new Error(response.response.data.errorMessage);
        }
      })
      .catch(error => {
        console.error(error);
      });
    props.setVisible(false);
  };

  return (
    <Modal
      onBackdropPress={() => props.setVisible(false)}
      onBackButtonPress={() => props.setVisible(false)}
      isVisible={props.isVisible}
      style={{margin: 0}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ListViewModal
          listData={list1}
          isVisible={wpopen}
          setVisible={setWPOpen}
          title={'Choose the workplace type'}
          selectedItem={workplaceType}
          setSelectedItem={setWorkplaceType}
        />
        <ListViewModal
          listData={list2}
          isVisible={jopen}
          setVisible={setJOpen}
          title={'Choose the job type'}
          selectedItem={jobType}
          setSelectedItem={setJobType}
        />
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={styles.modalContent}>
          <View style={{height: 70}} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.title}>Tell us who you're hiring</Text>
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 20, color: 'black', fontSize: 16}}>
              Job title*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
                color: 'black',
                fontSize: 16,
              }}
              value={title}
              onChangeText={setTitle}
              placeholder="Add job title"
            />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 30, color: 'black', fontSize: 16}}>
              Company
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
                color: 'black',
                fontSize: 16,
              }}
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Add company"
            />
          </View>
          <Pressable
            android_ripple={{color: '#ccc'}}
            style={{paddingHorizontal: 10, overflow: 'hidden'}}
            onPress={() => setWPOpen(!wpopen)}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'black', fontSize: 16}}>
                Workplace type*
              </Text>
              <TouchableOpacity onPress={() => setWPOpen(!wpopen)}>
                <Image
                  style={{height: 28, width: 28}}
                  source={require('../assets/images/la_pen.png')}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
                color: 'black',
                fontSize: 16,
              }}>
              {workplaceType}
            </Text>
          </Pressable>
          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 20, color: 'black', fontSize: 16}}>
              Job Location*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
                color: 'black',
                fontSize: 16,
              }}
              value={jobLocation}
              onChangeText={setJobLocation}
              placeholder="Add job location"
            />
          </View>
          <Pressable
            android_ripple={{color: '#ccc'}}
            style={{paddingHorizontal: 10, overflow: 'hidden'}}
            onPress={() => setJOpen(!jopen)}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'black', fontSize: 16}}>Job type*</Text>
              <TouchableOpacity onPress={() => setJOpen(!jopen)}>
                <Image
                  style={{height: 28, width: 28}}
                  source={require('../assets/images/la_pen.png')}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
                color: 'black',
                fontSize: 16,
              }}>
              {jobType}
            </Text>
          </Pressable>
          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 20, color: 'black', fontSize: 16}}>
              Job Description*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
                color: 'black',
                fontSize: 16,
              }}
              value={jobDescription}
              onChangeText={setJobDescription}
              placeholder="Add job description"
            />
          </View>
          <Pressable
            android_ripple={{color: '#ccc'}}
            style={{paddingHorizontal: 10, overflow: 'hidden'}}
            onPress={() => setOpen(!open)}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'black', fontSize: 16}}>Deadline*</Text>
              <TouchableOpacity onPress={() => setOpen(!open)}>
                <Image
                  style={{height: 28, width: 28}}
                  source={require('../assets/images/la_pen.png')}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
                color: 'black',
                fontSize: 16,
              }}>
              {date.toISOString().split('T')[0]}
            </Text>
          </Pressable>
          <View style={{height: 100}} />
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <TouchableOpacity onPress={handlePost}>
          <View
            style={{
              borderRadius: 30,
              backgroundColor: '#1664b1',
              paddingHorizontal: 20,
              paddingVertical: 6,
              elevation: 5,
              marginRight: 20,
            }}>
            <Text style={styles.bottomText}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.topView}>
        <View style={{margin: 20, flexDirection: 'row'}}>
          <TouchableOpacity onPress={toggleModal} style={{marginTop: 3}}>
            <Icon type={Icons.AntDesign} name="close" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export default PostJobScreen;
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: 'black',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  bottomText: {
    color: 'white',
    fontSize: 18,
  },
  topView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 10,
  },
});
