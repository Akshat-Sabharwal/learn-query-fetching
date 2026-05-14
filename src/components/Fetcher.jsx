import { useCallback, useReducer, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "./Loader";
import { Post } from "./Post";

const reducerFn = (state, action) => {
  switch (action.type) {
    case "disable-queries":
      return { ...state, disableQueries: !state.disableQueries };

    case "poll":
      return { ...state, pollInterval: action.payload };
  }
};

export const Fetcher = () => {
  const [options, dispatch] = useReducer(reducerFn, {
    disableQueries: false,
    pollInterval: null,
  });

  const [search, setSearch] = useState("");
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["posts", search],
    queryFn: () =>
      fetch(`https://dummyjson.com/posts/search?q=${search}`)
        .then((res) => res.json())
        .then((res) => res.posts),
    enabled: !options.disableQueries,
    refetchInterval: () => options.pollInterval * 1000 ?? Infinity,
  });

  return (
    <div className="flex flex-col gap-8 pr-8 w-full max-w-[60vw] h-full border-r-4 border-gray-200">
      <div className="flex w-full gap-6">
        <input
          className="w-full bg-white text-gray-800 border-3 rounded-md border-gray-400 px-3 py-1.5 text-lg focus:outline-none focus:shadow-[0_0_0_5px_#d1d5db]"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isFetching && <Loader size="sm" />}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="bg-white border-gray-200 border-3 p-3 rounded-lg flex flex-col gap-4 h-full overflow-y-scroll">
          {data?.map((el) => (
            <Post key={el.id} title={el.title} body={el.body} tags={el.tags} />
          ))}
        </section>
      )}
      <div className="flex gap-4">
        <span className="flex gap-3 items-center">
          <label
            htmlFor="disable"
            className="text-lg text-gray-700 cursor-pointer"
          >
            Disable Queries
          </label>
          <input
            type="checkbox"
            id="disable"
            className="size-5 outline-none border-3 border-gray-400 cursor-pointer"
            value={options.disableQueries}
            onChange={(e) => dispatch({ type: "disable-queries" })}
          />
        </span>
        <span className="flex gap-3 items-center">
          <label htmlFor="poll" className="text-lg text-gray-700">
            Polling Interval
          </label>
          <input
            type="number"
            id="poll"
            className="w-12 pl-1 outline-none border-1 border-gray-400"
            value={options.pollInterval ?? Infinity}
            onChange={(e) =>
              dispatch({ type: "poll", payload: e.target.value })
            }
          />
        </span>
      </div>
    </div>
  );
};
