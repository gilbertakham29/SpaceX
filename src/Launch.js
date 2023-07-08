import React from 'react';
import {useQuery, gql} from '@apollo/client';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {StyleSheet} from 'react-native';
const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
      }
    }
  }
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  launchContainer: {
    marginBottom: 20,
  },
  missionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  yearText: {
    fontSize: 16,
    marginTop: 5,
    color: 'yellow',
  },
  detailsText: {
    fontSize: 15,
    marginTop: 5,
    color: 'white',
  },
  backgroundImage: {
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const Launches = () => {
  const {loading, error, data} = useQuery(LAUNCHES_QUERY);

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }
  if (error) {
    return <Text style={styles.error}>Error : {error.message}</Text>;
  }
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          src="https://cdn.vox-cdn.com/thumbor/MrQZtguYZFStgLXalC2ZAqSZV0U=/0x0:3000x2000/1400x1400/filters:focal(1500x1000:1501x1001)/cdn.vox-cdn.com/uploads/chorus_asset/file/13604227/39051469552_13703e6b2e_o.jpg"
          style={[styles.fixed, styles.backgroundImage]}
        />
        <ScrollView>
          {data.launchesPast.map(launch => (
            <View key={launch.mission_name} style={styles.launchContainer}>
              <Text style={styles.missionText}>
                Mission: {launch.mission_name}
              </Text>
              <Text style={styles.yearText}>
                Year: {launch.launch_date_local}
              </Text>
              <Text style={styles.detailsText}>
                Details: {launch.rocket.rocket_name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Launches;
