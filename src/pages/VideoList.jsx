import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import Masonry from "react-masonry-css";

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const videosData = [
  {
    id: 1,
    category: "hsk1",
    title: "Қытай тілі_1_你好 (сәлем)",
    thumbnailUrl:
      "https://i.ytimg.com/vi/fzkwSl_N6aM/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLB0zwu43oNwi7yEOdoMAB8X0wGtnw",
    videoId:
      "https://www.youtube.com/watch?v=fzkwSl_N6aM&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=1",
  },
  {
    id: 2,
    category: "hsk1",
    title: "Қытай тілі_2_你好吗？ (Қалың қалай?)",
    thumbnailUrl:
      "https://i.ytimg.com/vi/yhcIJDo6zyY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCEVZgX-saLEJpbLB-MLuWNxKFqOg",
    videoId:
      "https://www.youtube.com/watch?v=yhcIJDo6zyY&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=2",
  },
  {
    id: 3,
    category: "hsk1",
    title: "Қытай тілі_3_你呢？我也很好 (-Сен ше? -Мен де өте жақсымын)",
    thumbnailUrl:
      "https://i.ytimg.com/vi/aGIc0M_CwZc/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCflxbGHJqZOW7PCOeTf5nI-qzV4A",
    videoId:
      "https://www.youtube.com/watch?v=yhcIJDo6zyY&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=3",
  },
  {
    id: 4,
    category: "hsk1",
    title: "Қытай тілі_4_谢谢，不用谢 (-Рахмет! -Оқасы жоқ!)",
    thumbnailUrl:
      "https://i.ytimg.com/vi/4BNBCwVB-P4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBmINEb3R5jx_bcQaz9qOtcxB_O8A",
    videoId:
      "https://www.youtube.com/watch?v=yhcIJDo6zyY&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=4",
  },
  {
    id: 5,
    category: "hsk2",
    title: "Қытай тілі_5_早上好！晚上好！(Қайырлы таң! Қайырлы кеш!)",
    thumbnailUrl:
      "https://i.ytimg.com/vi/y4Va3VFQO9Q/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAFDctehievLykXR_IqgerOahHd4A",
    videoId:
      "https://www.youtube.com/watch?v=yhcIJDo6zyY&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=5",
  },
  {
    id: 6,
    category: "hsk2",
    title: "Қытай тілі_6_你叫什么名字？(Сенің атың кім)",
    thumbnailUrl:
      "https://i.ytimg.com/vi/Urc3N2Gjru4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDs5ARrt28Gm7BDMGZmJ1ODIXrwCw",
    videoId:
      "https://www.youtube.com/watch?v=Urc3N2Gjru4&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=6",
  },
  {
    id: 7,
    category: "hsk2",
    title: "Қытай тілі_7_你会说汉语吗？(Сен қытайша сөйлей аласың ба?) Автор: bahashak.online - kaz 11 минут 3 секунды",
    thumbnailUrl:
      "https://i.ytimg.com/vi/uTCQR3zLjD8/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLByghDCu870TMrR6PcgR5JAQbYi4w",
    videoId:
      "https://www.youtube.com/watch?v=uTCQR3zLjD8&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=8",
  },
  {
    id: 8,
    category: "hsk2",
    title: "Қытай тілі_8_你会写汉字吗？(Сен қытай иероглифтерін жаза аласың ба?) Автор: bahashak.online - kaz 6 минут 46 секунд",
    thumbnailUrl:
      "https://i.ytimg.com/vi/LmqX2mlJWY4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCS8IKuxykDJndmKpBkZsAtocLqEQ",
    videoId:
      "https://www.youtube.com/watch?v=LmqX2mlJWY4&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=9",
  },
  {
    id: 9,
    category: "hsk3",
    title: "Қытай тілі_8_你会写汉字吗？(Сен қытай иероглифтерін жаза аласың ба?) Автор: bahashak.online - kaz 6 минут 46 секунд",
    thumbnailUrl:
      "https://i.ytimg.com/vi/oPwOVH-Gk8w/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDv3sSPgG1I1fSAYDe_badnoTjTvQ",
    videoId:
      "https://www.youtube.com/watch?v=oPwOVH-Gk8w&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=10",
  },
  {
    id: 10,
    category: "hsk3",
    title: "Қытай тілі_10_哈萨克语，俄语 (Қазақ тілі, Орыс тілі) Автор: bahashak.online - kaz 7 минут 41 секунда",
    thumbnailUrl:
      "https://i.ytimg.com/vi/zmpjbYkzpsY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBhgAbbktdWtCIAK4a5qAs8Z0qxYg",
    videoId:
      "https://www.youtube.com/watch?v=zmpjbYkzpsY&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=11",
  },
  {
    id: 11,
    category: "hsk3",
    title: "Қытай тілі_11_哈萨克语，俄语 (Ағылшын тілі, Түрік тілі) Автор: bahashak.online - kaz 8 минут 10 секунд",
    thumbnailUrl:
      "https://i.ytimg.com/vi/HGRkHxGrNDM/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC092_Py7MIRydjn8PUsv5ZBJv4cw",
    videoId:
      "https://www.youtube.com/watch?v=LmqX2mlJWY4&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=12",
  },
  {
    id: 12,
    category: "hsk3",
    title: "Қытай тілі_12_和，是，不是 (және, ия! жоқ!) Автор: bahashak.online - kaz 5 минут 9 секунд",
    thumbnailUrl:
      "https://i.ytimg.com/vi/Hm-6TH5sFzk/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBk10t0BrKjUr0qm9PvOg0TORN0HQ",
    videoId:
      "https://www.youtube.com/watch?v=LmqX2mlJWY4&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=13",
  },
  {
    id: 13,
    category: "hsk4",
    title: "Қытай тілі_13_сандар 1-5",
    thumbnailUrl:
      "https://i.ytimg.com/vi/UpXBKZ_Xj80/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAajrIWPkzEqPKQdVeFo98CAZtF6Q",
    videoId:
      "https://www.youtube.com/watch?v=LmqX2mlJWY4&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=15",
  },
  {
    id: 14,
    category: "hsk4",
    title: "Қытай тілі_14_сандар 6-10",
    thumbnailUrl:
      "https://i.ytimg.com/vi/LJM9tbdCxao/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLA7yXHtG3XAbi0MYVZ8FI7wXFmEsA",
    videoId:
      "https://www.youtube.com/watch?v=LmqX2mlJWY4&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=16",
  },
  {
    id: 15,
    category: "hsk4",
    title: "Қытай тілі_15_сандар 0,100",
    thumbnailUrl:
      "https://i.ytimg.com/vi/ckItJIb93Go/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBC3pH4ONjNVeht5LLvYjOX043kCw",
    videoId:
      "https://www.youtube.com/watch?v=LmqX2mlJWY4&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=17",
  },
  {
    id: 16,
    category: "hsk5",
    title: "Қытай тілі_16_对不起，没关系 (Кешіріңіз! –Ештеңе етпейді!)",
    thumbnailUrl:
      "https://i.ytimg.com/vi/Ym5WHDxaAJ8/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAfuc9wcYDClsW9A_kSG79XhEhKzA",
    videoId:
      "https://www.youtube.com/watch?v=LmqX2mlJWY4&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=18",
  },
  {
    id: 17,
    category: "hsk5",
    title: "Қытай тілі_17_普通话，上海话，广州话 (Путоңхуа, Шаңхай, Гуаңджоу диалекттері)",
    thumbnailUrl:
      "https://i.ytimg.com/vi/05qpSB_jGoU/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCDumVHdQ-YQeIXPXxtO24oQRlIRA",
    videoId:
      "https://www.youtube.com/watch?v=LmqX2mlJWY4&list=PLVRTKXBL8ToFGoqNrRvbLR_aWwXz9SK4L&index=19",
  },
];

const videosCategory = [
  {
    title: "HSK 1",
    slug: "hsk1",
  },
  {
    title: "HSK 2",
    slug: "hsk2",
  },
  {
    title: "HSK 3",
    slug: "hsk3",
  },
  {
    title: "HSK 4",
    slug: "hsk4",
  },
  {
    title: "HSK 5",
    slug: "hsk5",
  },
];

const VideoList = () => {
  const [watchVideo, setWatchVideo] = useState([]);

  const [activeClass, handleActive] = useState(0);
  const [videos, setProducts] = useState(videosData);

  const handleProducts = (category, i) => {
    const filteredProducts = videosData.filter(
      (item) => item.category === category
    );
    setProducts(filteredProducts);
    handleActive(i);
  };

  useEffect(() => {
    videos.map((video) => {
      if (localStorage.getItem(`videoId${video.id}`)) {
        setWatchVideo((prev) => {
          return [...prev, video];
        });
      }
    });
  }, [watchVideo]);
  useEffect(() => {
    handleProducts(videosCategory[0].slug, 0);
    videos.map((video) => {
      if (localStorage.getItem(`videoId${video.id}`)) {
        setWatchVideo((prev) => {
          return [...prev, video];
        });
      }
    });
  }, []);
  return (
    <div className="mt-5">
      <div>
        <h1 className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-center">
          Сабақтар
        </h1>

        <ul className="tabs mt-8">
          {videosCategory.map((item, i) => {
            return (
              <li
                key={i}
                className={`tab__item ${activeClass === i && "active"}`}
                onClick={() => handleProducts(item.slug, i)}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
        <Masonry
          className="flex animate-slide-fwd mt-5"
          breakpointCols={breakpointObj}
        >
          {videos.slice(0, 11).map((item) => {
            return (
              <VideoCard
                key={item.id}
                videoData={item}
                watchVideo={watchVideo}
                setWatchVideo={setWatchVideo}
                className="w-max"
              />
            );
          })}
        </Masonry>
      </div>
      {watchVideo.length > 0 && (
        <div className="mt-8">
          <h1 className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-center">
            Қаралған сабақтар
          </h1>
          <Masonry
            className="flex animate-slide-fwd mt-5"
            breakpointCols={breakpointObj}
          >
            {watchVideo
              .filter((value, index) => watchVideo.indexOf(value) === index)
              .map((video) => (
                <VideoCard key={video.id} videoData={video} className="w-max" />
              ))}
          </Masonry>
        </div>
      )}
    </div>
  );
};

export default VideoList;
