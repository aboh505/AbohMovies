import React from "react";

export default function MediaCard({ title, image, video }) {
  return (
    <div className="max-w-[310px] rounded-xl border border-[#99aabb] bg-white shadow-xl shadow-[#e3f2ff] p-3 transition-all duration-200 hover:scale-[1.05] hover:shadow-md">
      <video
        className="rounded-xl object-cover"
        src={video}
        controls
        muted
        preload="metadata"
      />
      <h3 className="mt-3 font-semibold text-center text-lg">{title}</h3>
      <img
        className="mt-1 rounded-xl object-cover"
        src={image}
        alt={title}
        loading="lazy"
      />
    </div>
  );
}
