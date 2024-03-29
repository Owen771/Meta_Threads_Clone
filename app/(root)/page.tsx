import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchThreads(1, 30);
  const user = await currentUser();

  // DEBUG:
  console.log(result);
  // {
  //   threads: [
  //     {
  //       _id: new ObjectId('65a54c5c78e943121a7f0b2c'),
  //       text: 'Just testing',
  //       author: [Object],
  //       community: null,
  //       children: [],
  //       createdAt: 2024-01-15T15:16:44.847Z,
  //       __v: 0
  //     }
  //   ],
  //   hasNextPage: false
  // }

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.threads.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.threads.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""} 
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
