import React from "react";

import aboutMeImage from "@/assets/avatar.png";

function ProfileImage(): React.JSX.Element {
  return (
    <figure className="col-2 text-text-primary dark:text-text-primary-dark h-fit mx-8">
      <img
        src={aboutMeImage}
        alt="Me and my dog, Margot"
        className="h-full object-cover max-h-50 justify-self-center"
      />
    </figure>
  );
}

export default ProfileImage;
