import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(3);

  useEffect(() => {
    axios
      .get("https://picsum.photos/v2/list?page=2&limit=30")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const fetchMoreData = () => {
    axios
      .get(`https://picsum.photos/v2/list?page=${index}&limit=30`)
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data]);

        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };
  function SkeletonLoader() {
    return (
      <div className="bg-white overflow-hidden shadow-lg rounded-lg animate-pulse">
        <div className="w-full h-48 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-4 w-3/4 bg-gray-300 mb-2"></div>
          <div className="h-4 w-1/4 bg-gray-300"></div>
        </div>
      </div>
    );
  }
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={SkeletonLoader()} 
    >
      <div className="bg-gray-100 ">
        {/* <header className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-bold text-gray-800">Unsplash Gallery</h1>
        </header> */}
        <main className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white overflow-hidden shadow-lg rounded-lg"
              >
                <img
                  src={item.download_url}
                  alt={item.author}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </InfiniteScroll>
  );
}
