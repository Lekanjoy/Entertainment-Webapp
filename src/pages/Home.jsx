import React, {useState, useEffect} from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import Trending from "../components/Trending";

const Home = () => {
  const API_KEY = import.meta.env.VITE_REACT_APP_TMBDB_API_KEY
  const [trending, setTrending] = useState([])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      setTrending(data.results)
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })

  }, [])

  return (
    <main className="px-4">
      <h1 className="mt-6 mb-4 font-light text-xl">Trending</h1>
      <ScrollContainer
       vertical={false}
        className="w-full flex gap-x-4"
      >
        {
          trending.map(item => {
            return <Trending key={item.id} trending={item}/>
          })
        }
      </ScrollContainer>
    </main>
  );
};

export default Home;
