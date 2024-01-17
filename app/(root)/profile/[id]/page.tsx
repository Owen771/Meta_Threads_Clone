// Note this can be any user profile, as user can view other user's profile

import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: {id: string }}) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id} // the user profile we're checking (can be the login user / other user)
        authUserId={user.id}    // the login user 
        profile_name={userInfo.name}
        profile_username={userInfo.username}
        profile_image={userInfo.image}
        profile_bio={userInfo.bio}
      />

      <div className="mt-9">
      </div>
    </section>
  )
}


export default Page;