import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

// Charge des données à chaque affichage de l'écran et expose les états de chargement
export function useApiData(fetchData) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await fetchData());
      setError('');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  const retry = useCallback(() => {
    setIsLoading(true);
    setError('');
    load();
  }, [load]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await load();
    setIsRefreshing(false);
  }, [load]);

  // Rechargement silencieux au retour sur l'écran
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return { data, error, isLoading, isRefreshing, retry, refresh };
}
