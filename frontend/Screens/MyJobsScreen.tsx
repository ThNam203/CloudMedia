/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon, {Icons} from '../components/ui/Icons';
import MyJobsSetting from '../components/ui/MyJobsSetting';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
function MyJobsScreen(props: any) {
  const {isVisible, setVisible} = props;

  const jobs = useSelector((state: RootState) => state.jobs.arr);

  const defaultJobs = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Facebook',
      location: 'Menlo Park, CA',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Apple',
      location: 'Cupertino, CA',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Apple-logo.png/640px-Apple-logo.png',
    },
  ];

  const [myJobsSetting, setMyJobsSetting] = useState(false);
  const toggleModal = () => {
    setVisible(!isVisible);
  };

  return (
    <Modal
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      backdropOpacity={0.4}
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      isVisible={isVisible}
      style={{margin: 0}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MyJobsSetting
          isVisible={myJobsSetting}
          setVisible={setMyJobsSetting}
        />
        <View style={styles.modalContent}>
          <View style={{height: 70}} />
          {jobs.map(job => (
            <View key={job._id} style={styles.jobContainer}>
              <View style={{height: 70, justifyContent: 'center'}}>
                <Image
                  style={{width: 60, height: 60}}
                  source={
                    job.company?.logoUrl
                      ? {uri: job.company?.logoUrl}
                      : require('../assets/images/Spiderman.jpg')
                  }
                  resizeMode="stretch"
                />
              </View>
              <View style={styles.jobDescription}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text
                  style={[
                    styles.jobTitle,
                    {color: 'black', fontSize: 18, fontWeight: 'normal'},
                  ]}>
                  {job.company?.name}
                </Text>
                <Text style={{fontFamily: 'Roboto', color: '#585C60'}}>
                  {job.employeeLocation}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => setMyJobsSetting(!myJobsSetting)}>
                  <Icon type={Icons.Entypo} name={'dots-three-vertical'} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.topView}>
        <View style={{margin: 20, flexDirection: 'row'}}>
          <TouchableOpacity onPress={toggleModal} style={{marginTop: 3}}>
            <Icon type={Icons.Ionicons} name="arrow-back" />
          </TouchableOpacity>
          <Text style={[styles.title, {marginLeft: 30}]}>My Jobs</Text>
        </View>
      </View>
    </Modal>
  );
}
export default MyJobsScreen;
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
  jobContainer: {
    flexDirection: 'row',
    margin: 10,
    height: 90,
  },
  jobDescription: {
    marginLeft: 10,
    width: 260,
    height: 90,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: 'black',
  },
});
