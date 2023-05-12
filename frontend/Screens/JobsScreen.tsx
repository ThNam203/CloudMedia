/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import SaveButton from '../components/ui/SaveButton';
import Colors from '../constants/Colors';
import Icon, {Icons} from '../components/ui/Icons';
import PostJobScreen from './PostJobScreen';
import MyJobsScreen from './MyJobsScreen';
import JobDetailModal from '../components/ui/JobDetailModal';

const defaultJobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png',
    dateAgo: '1 month a go',
    workplaceType: 'On-site',
    jobType: 'Full-time',
    jobDescription: `We are looking for a highly skilled and motivated Software Engineer to join our team at Google. As a Software Engineer, you will work closely with other engineers and developers to design, develop, and maintain software systems and applications.

Responsibilities:

Design, develop, and maintain software systems and applications
Collaborate with other engineers and developers to design and implement new features and functionality
Write clean, efficient, and well-documented code
Troubleshoot and debug software issues
Perform code reviews and provide feedback to other team members
Stay up-to-date with emerging trends and technologies in software engineering
Requirements:

Bachelor's degree in Computer Science or related field
Strong knowledge of programming languages such as Java, Python, or C++
Experience with software development tools such as Git, JIRA, or Jenkins
Experience with web development frameworks such as React, Angular, or Vue.js
Excellent problem-solving and analytical skills
Strong communication and teamwork skills
At Google, we value diversity and are committed to creating an inclusive environment for all employees. We offer competitive compensation packages, comprehensive benefits, and opportunities for professional growth and development. If you are a talented and motivated Software Engineer looking for an exciting new challenge, we want to hear from you!`,
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Facebook',
    location: 'Menlo Park, CA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
    dateAgo: '1 month a go',
    workplaceType: 'Hybrid',
    jobType: 'Part-time',
    jobDescription: 'hello',
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'Apple',
    location: 'Cupertino, CA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Apple-logo.png/640px-Apple-logo.png',
    dateAgo: '1 month a go',
    workplaceType: 'Remote',
    jobType: 'Full-time',
    jobDescription: 'hello',
  },
];

const JobScreen = () => {
  const [jobs, setJobs] = useState(defaultJobs);
  const [postJob, setPostJob] = useState(false);
  const [myJobs, setMyJobs] = useState(false);
  const [jobDetail, setJobDetail] = useState(false);
  const [jobSelected, setJobSelected] = useState(jobs[0]);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.white}}>
        <PostJobScreen isVisible={postJob} setVisible={setPostJob} />
        <MyJobsScreen isVisible={myJobs} setVisible={setMyJobs} />
        <JobDetailModal
          isVisible={jobDetail}
          setVisible={setJobDetail}
          jobData={jobSelected}
        />
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
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                setJobDetail(!jobDetail);
                setJobSelected(job);
              }}>
              <View style={{height: 70, justifyContent: 'center'}}>
                <Image
                  style={{width: 60, height: 60}}
                  source={{uri: job.logo}}
                />
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
            </TouchableOpacity>
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
