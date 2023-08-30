import React, { useState } from "react";
import s from "../MyProfile.module.scss";
import Image from "next/image";
import { GetResponse } from "@/api/profile.api";
import { useTranslations } from "next-intl";
import { ProfileWrapper } from "./ProfileWrapper";
import { InfiniteScrollMyPosts } from "./InfiniteScrollMyPosts";
import { PostFix } from "./PostFix";
import { PostModal } from "@/components/Modals/PostModal";

type Props = {
  setShowSubscriptionsModal: (value: boolean) => void;
  setShowSubscribersModal: (value: boolean) => void;
  paidAccount: boolean;
  userData: GetResponse;
};
export const Profile: React.FC<Props> = ({
  setShowSubscriptionsModal,
  setShowSubscribersModal,
  paidAccount,
  userData,
}) => {
  const t = useTranslations("MyProfilePage");
  const [openPostModal, setOpenPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number>();
  const [modalHeader, setModalHeader] = useState("");
  const [userPosts, setUserPosts] = useState(0);

  const getUserPosts = (postsAmount: number) => {
    setUserPosts(postsAmount);
  };

  if (userData) sessionStorage.setItem("userId", userData.id.toString());

  return (
    <>
      <div className={s.profile}>
        <div>
          <Image
            src={`${userData?.avatars[0] ? userData.avatars[0].url : "/img/create-post/no-image.png"}`}
            alt={"avatar"}
            width={204}
            height={204}
            className={s.profile__avatar}
          />
        </div>
        <ProfileWrapper
          data={userData}
          t={t}
          setShowSubscriptionsModal={setShowSubscriptionsModal}
          setShowSubscribersModal={setShowSubscribersModal}
          paidAccount={paidAccount}
          userPosts={userPosts}
        />
      </div>
      <div className={s.profile__posts}>
        <InfiniteScrollMyPosts
          setOpen={setOpenPostModal}
          setSelectedPost={setSelectedPost}
          getUserPosts={getUserPosts}
        />
      </div>

      {openPostModal && (
        <PostModal width={"972px"} onClose={() => setOpenPostModal(false)}>
          <PostFix
            onClose={() => setOpenPostModal(false)}
            postId={selectedPost}
            avatar={userData?.avatars[0]?.url}
            userName={userData?.userName}
            setOpenPostModal={setOpenPostModal}
          />
        </PostModal>
      )}

      {/*{openPostModal && (
        <EditPostModal
          title={modalHeader}
          width={"1200px"}
          onClose={() => {
            setOpenPostModal(false);
          }}
          isOkBtn={false}
        >
          <Post
            setModalHeader={setModalHeader}
            postId={selectedPost}
            avatar={userData?.avatars[0].url}
            userName={userData?.userName}
            setOpen={setOpenPostModal}
          />
        </EditPostModal>
      )}*/}
    </>
  );
};
