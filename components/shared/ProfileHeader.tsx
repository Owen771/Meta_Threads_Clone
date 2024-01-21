import Image from "next/image";

interface Props {
  accountId: string;  // the user profile we're checking (can be the login user / other user)
  authUserId: string; // the login user 
  profile_name: string; 
  profile_username: string; 
  profile_image: string;
  profile_bio: string;
  type?: 'User' | 'Community';
}

const ProfileHeader = (
{ accountId, authUserId, profile_name, profile_username, profile_image, profile_bio, type}: Props
) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={profile_image}
              alt="Profile Image"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">{profile_name}</h2>
            <p className="text-base-medium text-gray-1">@{profile_username}</p>
          </div>
        </div>
      </div>

      {/* TODO: Community */}

      <p className="mt-6 max-w-lg text-base-regular text-light-2">{profile_bio}</p>

      {/* Tabs (Threads / Replies / Tagged) */}
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  )
}

export default ProfileHeader; 