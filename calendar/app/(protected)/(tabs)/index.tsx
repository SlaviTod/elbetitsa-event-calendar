import { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { containers } from '@/styling/common';
import { useRequesterArgs } from '@/hooks/useRequesterArgs';
import { ApiEndpoints, ElbetitsaApiCalls, GetEventsResponse, PublicEvent } from '@/types/dist';
import { requester } from '@/requester/requester';
import { EventItem } from '@/components/EventItem/EventItem';
import { DataContext } from '@/contexts/DataContext';


export default function HomeScreen() {

  const { data, setPublicData } = useContext(DataContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { t } = useTranslation();

  const requestArgs = useRequesterArgs({ request: ElbetitsaApiCalls[ApiEndpoints.getPublicEvents] });

  const loadPublicEvents: () => Promise<void> = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res: GetEventsResponse = await requester({
        ...requestArgs,
        queryKeys: ['currentPage'],
        queries: {
          currentPage: page,
        }
      });
      if (res.events?.length === 0) {
        setHasMore(false);
      } else {
        setPage((st) => st + 1);
        setPublicData(res);
      }
    } catch (err) {
      console.log('Fetch events error', err);
    } finally {
      setLoading(false);
    }
  }, [hasMore, page, loading])

  useEffect(() => {
    loadPublicEvents();
  }, [loadPublicEvents])

  return (
    <SafeAreaView style={containers.mainContainer}>

      {!!data.events?.length &&
        <FlatList
          data={data.events}
          renderItem={({ item }: { item: PublicEvent }) => <EventItem item={item} key={item.id} />}
        />
      }

      {hasMore && <ThemedView style={styles.titleContainer}>
        <ThemedText>...{t('seeMore')}</ThemedText>
      </ThemedView>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
