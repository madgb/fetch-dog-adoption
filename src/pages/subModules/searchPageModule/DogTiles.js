import React from "react";

export default function DogTiles({dogs}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {dogs.map(({id, img, name, breed}) => (
        <div
          key={id}
          className="p-4 bg-white shadow rounded flex flex-col items-center"
        >
          <img
            src={img}
            alt={name}
            className="w-32 h-32 object-cover rounded-full mb-2"
          />
          <h2 className="font-bold">{name}</h2>
          <p>{breed}</p>
        </div>
      ))}
    </div>
  );
}
