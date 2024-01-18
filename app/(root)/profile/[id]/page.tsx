// Note this can be any user profile, as user can view other user's profile

import Image from "next/image";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ThreadsTab from "@/components/shared/ThreadsTab";

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
        {/* defaultValue means by default select which one??? */}
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              // Like a btn to switch tab
              <TabsTrigger key={tab.label} value={tab.value} className="tab"> 
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {/* Total Threads number 
                (adding condition to ensure the element only showed in the place that fit the condition,
                  i.e Threads can see the number, but Replies, Tagged won't show) */}
                {tab.label === 'Threads' && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger> 
            ))}
          </TabsList>

          {/* Showing Threads that posted by this user */}
          {profileTabs.map((tab) => ( 
            <TabsContent 
              key={`content-${tab.label}`} 
              value={tab.value} 
              className="w-full text-light-1"
            >
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))}

        </Tabs>

      </div>
    </section>
  )
}

export default Page;