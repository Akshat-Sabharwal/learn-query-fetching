import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "./Loader";
import { useEffect, useState } from "react";
import { Post } from "./Post";

export const Stats = () => {
  const client = useQueryClient();
  const [queries, setQueries] = useState(() =>
    client.getQueriesData({ queryKey: ["posts"] }),
  );

  useEffect(() => {
    const unsubscribe = client.getQueryCache().subscribe(() => {
      setQueries(client.getQueriesData({ queryKey: ["posts"] }));
    });

    return unsubscribe;
  }, [client]);

  return (
    <section className="flex flex-col px-6 w-full max-w-[40vw] max-h-[100vh]">
      <h1 className="text-gray-700 text-3xl mb-10">Cached Queries</h1>
      <div className="overflow-y-scroll border-2 border-gray-300 rounded-lg p-4 w-full h-full">
        {queries?.map((el) => (
          <div
            key={el[0].join("")}
            className="w-full rounded-md p-3 bg-gray-700 mb-6 text-gray-100 overflow-y-scroll"
          >
            Query Keys:
            <span className="flex gap-3 my-2">
              {el[0].map((key) => (
                <span
                  key={key}
                  className="bg-gray-300 text-gray-800 px-1 rounded-md"
                >
                  {key}
                </span>
              ))}
            </span>
            Query Data:
            <span className="flex gap-3 my-2 overflow-x-scroll">
              {el[1]?.map((post) => (
                <Post
                  styles={"overflow-y-scroll overflow-x-auto min-w-64 max-h-48"}
                  key={post.id}
                  title={post.title}
                  body={post.body}
                  tags={post.tags}
                />
              ))}
            </span>
          </div>
        ))}
      </div>
      <div>
        <button
          className="mt-4 px-3 py-2 text-lg text-gray-100 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-800"
          onClick={() => client.clear()}
        >
          Clear Cache
        </button>
      </div>
    </section>
  );
};
