import React from 'react';
import { StyleSheet, Text } from 'react-native';
import SectionTitle from './SectionTitle';
import TextLink from '../../components/base/TextLink';
import { Button } from '../../components/base/Buttons';
import useReset from '../../libs/updater/useReset';
import ScrollScreen from '../../components/Screen/ScrollScreen';
import useDeleteAllFavorites from '../../repository/favorites/useDeleteAllFavorites';

const AboutScreen = () => {
  const { isPending: delDataPending, run: runDelData } = useReset();
  const { isPending: delFavsPending, run: runDelFavs } = useDeleteAllFavorites();

  function handleDelete() {
    runDelData();
  }

  function handleDeleteFavs() {
    runDelFavs();
  }

  return (
    <ScrollScreen contentStyle={styles.contentContainer}>
      <SectionTitle>Data source</SectionTitle>
      <Text>
        Data provided by Johns Hopkins University Center for Systems Science and Engineering (JHU
        CSSE), Baltimore, Maryland, USA.
      </Text>
      <Text />
      <Text>
        All data, copyright 2020 Johns Hopkins University, all rights reserved, is provided to the
        public strictly for educational and academic research purposes.
      </Text>
      <Text />
      <Text>
        {'Please read '}
        <TextLink href="https://github.com/CSSEGISandData/COVID-19">
          about the data source and terms of use
        </TextLink>
        {`.`}
        {/* <TextLink href="https://systems.jhu.edu/research/public-health/ncov/">JHU</TextLink> */}
      </Text>
      <Text />
      <Text>
        The data contains daily case reports from Jan 22, 2020 for the coronavirus COVID-19.
      </Text>
      <Text />
      <Text />
      <Text>
        You can delete all data downloaded to this device. The next update will download fresh data.
      </Text>
      <Button title="Delete data" onPress={handleDelete} disabled={delDataPending} />
      <Text />
      <Text>You can delete all selected locations. Downloaded data will remain untouched.</Text>
      <Button title="Delete locations" onPress={handleDeleteFavs} disabled={delFavsPending} />
      <Text />
      <SectionTitle>Application</SectionTitle>
      <Text>Author: © 2020, coturiv.</Text>
      <Text />
      <SectionTitle>Privacy policy</SectionTitle>
      <Text>
        The app does not collect, save, publish or share any private or otherwise sensitive
        information about its users.
      </Text>
    </ScrollScreen>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'flex-start',
    padding: 16,
  },
});
