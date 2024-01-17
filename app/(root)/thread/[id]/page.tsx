import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// This is the page - {domain+port}/thread/{thread_id}
const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  // Not onboarded user can't see thread detail
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      {/* Original thread */}
      <div>
        <ThreadCard
          currentUserId={user?.id || ""}
          key={thread._id}
          id={thread._id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      {/* Form to write comment */}
      <div className="mt-7">
        <Comment 
          threadId={thread.id}
          currentUserImg={userInfo.image}
          // Just in case it's a special mongodb object, wrap it with stringify()
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      {/* Exist comments */}
      <div className="mt-10">
        {thread.children.map((c: any) => (
          <ThreadCard
            currentUserId={user?.id || ""}
            key={c._id}
            id={c._id}
            parentId={c.parentId}
            content={c.text}
            author={c.author}
            community={c.community}
            createdAt={c.createdAt}
            comments={c.children}
            isComment
          />
        ))}
      </div>

    </section>
  )
};

export default Page;
