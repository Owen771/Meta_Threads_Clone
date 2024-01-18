import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

import ThreadCard from "../cards/ThreadCard";

interface Props {
  currentUserId: string; // the login user id
  accountId: string;     // the user id of the profile that we're checking
  accountType: string;   // what does this field mean?? and what else might be except "User"
}

const ThreadsTab = async (
{ currentUserId, accountId, accountType }: Props
) => {
  // Fetch specific Threads that only belong to this specific user (or a specific community)
  let result = await fetchUserPosts(accountId); 
  if (!result) redirect('/');

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
          <ThreadCard
            currentUserId={currentUserId}
            key={thread._id}
            id={thread._id}
            parentId={thread.parentId}
            content={thread.text}
            author={
              accountType === 'User'
              ? { name: result.name, image: result.image, id: result.id}
              : { name: thread.author.name, image: result.image, id: result.id} 
            } 
            community={thread.community} // TODO: whether we're the owner of community
            createdAt={thread.createdAt}
            comments={thread.children}
        />
      ))}

    </section>
  )
}

export default ThreadsTab;