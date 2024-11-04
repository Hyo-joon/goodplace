import axios from 'axios';
import {useEffect, useState} from 'react';
import type {LatLng} from 'react-native-maps';
import Config from 'react-native-config';

import {numbers} from '../constants';
import useDebounce from './useDebounce';

type Meta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: {
    region: string[];
    keyword: string;
    selected_region: string;
  };
};

export type RegionInfo = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

type RegionResponse = {
  meta: Meta;
  documents: RegionInfo[];
};

function useSearchLocation(keyword: string, location: LatLng) {
  const [regionInfo, setRegionInfo] = useState<RegionInfo[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageParam, setPageParam] = useState(1);

  const debouncedSearchText = useDebounce(keyword, 300);

  const fetchNextPage = () => {
    setPageParam(prev => prev + 1);
  };

  const fetchPrevPage = () => {
    setPageParam(prev => prev - 1);
  };

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get<RegionResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${debouncedSearchText}&y=${location.latitude}&x=${location.longitude}&page=${pageParam}`,
          {
            headers: {
              Authorization: `KakaoAK afbb120d3344ab3b28370ea185422528`,
            },
          },
        );

        setHasNextPage(!data.meta.is_end);
        setRegionInfo(data.documents);
      } catch (error) {
        console.log('실패');
        setRegionInfo([]);
      }
    })();

    debouncedSearchText === '' && setPageParam(1);
  }, [debouncedSearchText, location, pageParam]);

  return {
    regionInfo,
    pageParam,
    fetchNextPage,
    fetchPrevPage,
    hasNextPage,
  };
}

export default useSearchLocation;
