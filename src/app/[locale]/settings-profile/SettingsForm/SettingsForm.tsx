import { useForm } from "react-hook-form";
import s from "./SettingsForm.module.scss";
import { PrimaryBtn } from "../../../../components/PrimaryBtn/PrimaryBtn";
import { DatePick } from "../../../../components/DatePicker/DatePick";
import React, { useState } from "react";
import { PutProfileBody, useLazyGetProfileQuery, usePutProfileMutation } from "../../../../api/profile.api";
import { StatusCode } from "../../../../api/auth.api";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Loader } from "../../../../components/Loader/Loader";
import { GetDefaultValuesForm } from "../../../../utils/GetDefaultValuesForm";
import { SettingsFormSchema } from "../../../../features/schemas/SettingsFormSchema";

type Props = {
  userBirthday: Date | undefined;
  translate: any;
};

export const SettingsForm: React.FC<Props> = ({ userBirthday, translate }) => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [updateProfile, { isLoading }] = usePutProfileMutation();
  const [getUserProfile] = useLazyGetProfileQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues: GetDefaultValuesForm,
    resolver: yupResolver(SettingsFormSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const result: PutProfileBody = {
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      city: data.city,
      dateOfBirth: new Date(dateOfBirth),
      aboutMe: data.aboutMe,
    };

    updateProfile(result)
      .unwrap()
      .then(() => {
        getUserProfile();
        toast.success("Profile successfully updated");
      })
      .catch((err) => {
        if (err.status === StatusCode.badRequest) {
          setError(err.data.messages[0]?.field, { message: err.data.messages[0]?.message });
        }
      });
  });

  return (
    <>
      <form onSubmit={onSubmit} className={s.form}>
        <div className={s.form__itemWrapper}>
          <label className={s.form__label}>{translate("username")}</label>
          <input
            id={"settings-profile-userName"}
            {...register("userName", { required: true, minLength: 5, maxLength: 15 })}
            className={`${errors.userName ? s.form__textInput__error : s.form__textInput}`}
          />
          {errors.userName && <p className={s.form__error}>{errors.userName.message}</p>}
        </div>

        <div className={s.form__itemWrapper}>
          <label className={s.form__label}>{translate("firstname")}</label>
          <input
            id={"settings-profile-firstName"}
            {...register("firstName", { required: true, minLength: 2, maxLength: 15 })}
            className={`${errors.firstName ? s.form__textInput__error : s.form__textInput}`}
          />
          {errors.firstName && <p className={s.form__error}>{errors.firstName.message}</p>}
        </div>

        <div className={s.form__itemWrapper}>
          <label className={s.form__label}>{translate("lastname")}</label>
          <input
            id={"settings-profile-lastName"}
            {...register("lastName", { required: true, minLength: 2, maxLength: 15 })}
            className={`${errors.lastName ? s.form__textInput__error : s.form__textInput}`}
          />
          {errors.lastName && <p className={s.form__error}>{errors.lastName.message}</p>}
        </div>

        <div className={s.form__itemWrapper}>
          <label className={s.form__label}>{translate("birthday")}</label>
          <DatePick setDate={setDateOfBirth} userBirthday={userBirthday} />
        </div>

        <div className={s.form__itemWrapper}>
          <label className={s.form__label}>{translate("city")}</label>
          <input
            id={"settings-profile-city"}
            {...register("city", { required: true, minLength: 3, maxLength: 20 })}
            className={`${errors.city ? s.form__textInput__error : s.form__textInput}`}
          />
          {errors.city && <p className={s.form__error}>{errors.city.message}</p>}
        </div>

        <div className={s.form__itemWrapper}>
          <label className={s.form__label}>{translate("aboutMe")}</label>
          <textarea
            id={"settings-profile-aboutMe"}
            {...register("aboutMe", { required: true, minLength: 10, maxLength: 100 })}
            className={`${errors.aboutMe ? s.form__textarea__error : s.form__textarea}`}
          />
          {errors.aboutMe && <p className={s.form__textareaError}>{errors.aboutMe.message}</p>}
        </div>

        <div className={s.form__btn} id={"settings-profile-btn-container"}>
          <PrimaryBtn>{translate("saveBtn")}</PrimaryBtn>
        </div>
      </form>
      {isLoading && <Loader />}
    </>
  );
};

type FormValues = {
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  aboutMe: string | undefined;
};
