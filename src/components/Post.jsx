export const Post = ({ title, body, tags, styles }) => {
  return (
    <article className={"bg-gray-100 rounded-lg p-4 " + styles}>
      <h4 className="text-gray-800 text-xl">{title}</h4>
      <p className="text-gray-600 text-md">{body}</p>
      <span className="flex gap-2 mt-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-700 text-gray-100 px-2 py-1 text-sm rounded-sm"
          >
            {tag}
          </span>
        ))}
      </span>
    </article>
  );
};
