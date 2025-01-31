import React, { useState, useEffect, useCallback } from "react";

import DogTiles from "./subModules/searchPageModule/DogTiles";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Select from "../atoms/Select";

const debounce = (func, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const SearchPage = ({ toggleFavorite, favorites }) => {
  const [dogs, setDogs] = useState([]);
  const [breedFilter, setBreedFilter] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [breeds, setBreeds] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [from, setFrom] = useState(0);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    fetchBreeds();
  }, []);
  
  const fetchBreeds = async () => {
    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setBreeds(data);
    } catch (error) {
      console.error("Error fetching breeds", error);
    }
  };

  const fetchDogs = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams();

      if (breedFilter.length) {
        breedFilter.forEach((breed) => queryParams.append("breeds", breed));
      }
      if (zipCodes.length) {
        zipCodes.forEach((zip) => queryParams.append("zipCodes", zip));
      }
      if (ageMin) queryParams.append("ageMin", ageMin);
      if (ageMax) queryParams.append("ageMax", ageMax);
      queryParams.append("size", pageSize);
      queryParams.append("sort", `breed:${sortOrder}`);
      if (from) queryParams.append("from", from);

      const response = await fetch(
        `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const searchData = await response.json();
      setNextPage(searchData.next);

      const detailsResponse = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(searchData.resultIds),
          credentials: "include",
        }
      );

      if (!detailsResponse.ok) {
        throw new Error(
          `Error: ${detailsResponse.status} ${detailsResponse.statusText}`
        );
      }

      const dogsData = await detailsResponse.json();
      setDogs(dogsData);
    } catch (error) {
      console.error("Error fetching dogs", error);
    }
  }, [breedFilter, zipCodes, ageMin, ageMax, sortOrder, pageSize, from]);

  const debouncedFetchDogs = useCallback(debounce(fetchDogs, 700), [
    breedFilter,
    zipCodes,
    ageMin,
    ageMax,
    sortOrder,
    pageSize,
    from,
  ]);

  useEffect(() => {
    const handler = setTimeout(() => {
      debouncedFetchDogs();
    }, 300);

    return () => clearTimeout(handler);
  }, [debouncedFetchDogs]);

  const removeBreed = (breed) => {
    setBreedFilter(breedFilter.filter((b) => b !== breed));
  };

  const getNextFromValue = (nextPage) => {
    if (!nextPage) return 0;
    const urlParams = new URLSearchParams(nextPage.split("?")[1]);
    return urlParams.get("from") || 0;
  };

  const optionalInputLists = [
    {
      id: "zip-code-input",
      type: "text",
      placeholder: "[Optional] Zip Codes (comma separated)",
      value: zipCodes.join(","),
      onChange: (e) => setZipCodes(e.target.value.split(",")),
      className: "mb-2 p-2 border rounded w-full",
    },
    {
      id: "min-age-input",
      type: "number",
      placeholder: "[Optional] Min Age",
      value: ageMin,
      onChange: (e) => setAgeMin(e.target.value),
      className: "mb-2 p-2 border rounded w-full",
    },
    {
      id: "max-age-input",
      type: "number",
      placeholder: "[Optional] Max Age",
      value: ageMax,
      onChange: (e) => setAgeMax(e.target.value),
      className: "mb-2 p-2 border rounded w-full",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search for Dogs</h1>
      {optionalInputLists.map(
        ({ id, type, placeholder, value, onChange, className }) => (
          <Input
            key={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={className}
          />
        )
      )}
      <Select
        multiple={true}
        onChange={(e) => {
          const selectedBreeds = [...e.target.selectedOptions].map(
            (o) => o.value
          );
          setBreedFilter((prev) => [...new Set([...prev, ...selectedBreeds])]);
        }}
        className="mb-2 p-2 border rounded w-full"
      >
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </Select>

      <div className="flex flex-wrap gap-2 mb-4">
        {breedFilter.map((breed) => (
          <div
            key={breed}
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
          >
            <span className="mr-2">{breed}</span>
            <Button
              onClick={() => removeBreed(breed)}
              className="text-red-500"
              children="x"
            />
          </div>
        ))}
      </div>
      <Button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        children={`Sort by Breed (${sortOrder})`}
      />

      <label className="block mb-2">Results per Page:</label>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="mb-4 p-2 border rounded w-full"
      >
        {[10, 25, 50, 100].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <Button
        onClick={() => {
          const nextFromValue = getNextFromValue(nextPage);
          setFrom(Number(nextFromValue));
        }}
        disabled={!nextPage}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
        children="Next Page"
      />
      <DogTiles
        dogs={dogs}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />
    </div>
  );
};

export default SearchPage;
