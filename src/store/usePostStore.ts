import {ResponsePost} from '../api';
import {create} from 'zustand';

interface PostState {
  detailPost: ResponsePost | null;
  setPost: (detailPost: ResponsePost) => void;
}

const usePostStore = create<PostState>(set => ({
  detailPost: null,
  setPost: (detailPost: ResponsePost) => {
    set({detailPost});
  },
}));

export default usePostStore;
