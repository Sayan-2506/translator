import React from "react";

const VideoCard = ({ videoData, setWatchVideo, watchVideo }) => {
  const handleClick = () => {
    if (!localStorage.getItem('videoId' + videoData.id)) {
        localStorage.setItem('videoId' + videoData.id, videoData)
        if (!watchVideo.includes(videoData)) {
            setWatchVideo((prev) => {
                return [...prev, videoData];
              });
        }
    }

    window.open(`${videoData.videoId}`, "_blank");
  };

  return (
    <div className="m-2 mb-5" onClick={handleClick}>
      <div className="relative cursor-pointer w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out">
        <img
          className="rounded-lg w-full border border-gray-300"
          src={`${videoData.thumbnailUrl}`}
          alt="user-post"
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <p className="flex gap-2 mt-2 items-center font-bold">
            {videoData.title.length > 30 ? videoData.title.slice(0, 25) + "..." : videoData.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
