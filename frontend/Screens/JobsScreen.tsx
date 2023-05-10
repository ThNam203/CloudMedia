/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import SaveButton from '../components/ui/SaveButton';
import Colors from '../constants/Colors';
import Icon, {Icons} from '../components/ui/Icons';
import PostJobScreen from './PostJobScreen';
import MyJobsScreen from './MyJobsScreen';

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

const JobScreen = () => {
  const [jobs, setJobs] = useState(defaultJobs);
  const [postJob, setPostJob] = useState(false);
  const [myJobs, setMyJobs] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.white}}>
        <PostJobScreen isVisible={postJob} setVisible={setPostJob} />
        <MyJobsScreen isVisible={myJobs} setVisible={setMyJobs} />
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            borderBottomColor: Colors.gray,
            borderBottomWidth: 5,
          }}>
          <Pressable
            onPress={() => setMyJobs(!myJobs)}
            style={styles.btnHeader}
            android_ripple={{color: Colors.gray, borderless: false}}>
            <View style={{marginTop: 4, marginRight: 4}}>
              <Icon type={Icons.Feather} name="bookmark" size={30} />
            </View>
            <Text style={styles.textHeader}>My jobs</Text>
          </Pressable>
          <Pressable
            onPress={() => setPostJob(!postJob)}
            style={styles.btnHeader}
            android_ripple={{color: Colors.gray, borderless: false}}>
            <View style={{marginTop: 4, marginRight: 4}}>
              <Icon type={Icons.FontAwesome} name="edit" size={30} />
            </View>
            <Text style={styles.textHeader}>Post a job</Text>
          </Pressable>
        </View>
        <Text style={styles.textTitle}>Still hiring</Text>
        <Text style={styles.textTitle2}>Jobs you may have missed</Text>
        <Text
          style={[
            styles.textTitle2,
            {color: 'black', fontSize: 18, marginVertical: 20},
          ]}>
          {jobs.length} results
        </Text>
        {jobs.map(job => (
          <View key={job.id} style={styles.jobContainer}>
            <View style={{height: 70, justifyContent: 'center'}}>
              <Image style={{width: 60, height: 60}} source={{uri: job.logo}} />
            </View>
            <View style={styles.jobDescription}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text
                style={[
                  styles.jobTitle,
                  {color: 'black', fontSize: 18, fontWeight: 'normal'},
                ]}>
                {job.company}
              </Text>
              <Text style={{fontFamily: 'Roboto', color: '#585C60'}}>
                {job.location}
              </Text>
            </View>
            <View>
              <SaveButton />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default JobScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTitle: {
    fontSize: 24,
    fontFamily: 'Roboto',
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  textTitle2: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'normal',
    marginLeft: 10,
    color: '#585C60',
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
  btnHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 23,
    fontFamily: 'Roboto',
    color: 'black',
    fontWeight: 'bold',
  },
});
