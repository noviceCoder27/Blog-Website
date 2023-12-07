import {Blogs} from './Blogs'
import { SearchBar } from './../components/SearchBar';
import { searchState } from './../store/atoms/searchAtom';
import { useRecoilValue } from 'recoil';



export const Home = () => {
  const search = useRecoilValue(searchState);
  return (
    <div>
      {!search && <Blogs />}
      {search && <SearchBar />}
    </div>
  )
}
