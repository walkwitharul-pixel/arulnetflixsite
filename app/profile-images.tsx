"use client"

import ProfileImageGenerator from "@/components/profile-image-generator"

export default function ProfileImagesPage() {
  const profileTypes = ["Stalker", "Investor", "Recruiter", "Community", "Adventurer"]

  return (
    <div className="p-8 bg-black min-h-screen">
      <h1 className="text-white text-2xl mb-8">Profile Image Generator</h1>
      <div className="grid grid-cols-5 gap-4">
        {profileTypes.map((type) => (
          <div key={type} className="flex flex-col items-center">
            <ProfileImageGenerator profileType={type} />
            <p className="text-white mt-2">{type}</p>
          </div>
        ))}
      </div>
      <p className="text-white mt-8">
        Check the browser console for image data URLs. Right-click on each URL and select "Open in new tab" to download.
      </p>
    </div>
  )
}
