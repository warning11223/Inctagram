import React, { useState } from "react";
import { Modal } from "../../../../components/Modal/Modal";
import s from "../MyProfile.module.scss";
import Image from "next/image";
import { UnsubscribeModal } from "../UnsubscribeModal/UnsubscribeModal";

type Props = {
  setShowSubscriptionsModal: (value: boolean) => void;
};

export const SubscriptionsModal: React.FC<Props> = ({ setShowSubscriptionsModal }) => {
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);

  return (
    <>
      <Modal
        title={"2 218 Subscriptions"}
        isShowBtnOk={false}
        maxWidth={"644px"}
        onClose={() => setShowSubscriptionsModal(false)}
      >
        <div className={s.modal}>
          <input type="text" className={s.modal__input} placeholder={"Search"} />
          <Image className={s.modal__icon} src={"/img/modal/search.svg"} alt={"search"} width={20} height={20} />
        </div>
        {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
          return (
            <div key={index} className={s.modal__content}>
              <div className={s.modal__content__left}>
                <Image
                  src={"/img/modal/avatar.png"}
                  alt={"avatar"}
                  width={36}
                  height={36}
                  className={s.modal__content__avatar}
                />
                <p>URLProfiele</p>
              </div>
              <div className={s.modal__content__right}>
                <button className={s.modal__content__unsubscribe} onClick={() => setShowUnsubscribeModal(true)}>
                  Unsubscribe
                </button>
              </div>
            </div>
          );
        })}
      </Modal>
      {showUnsubscribeModal && <UnsubscribeModal setShowUnsubscribeModal={setShowUnsubscribeModal} />}
    </>
  );
};
