import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  closeModal,
  putPersonalDetails,
  selectProfileEmail,
} from "@/features/profile/profileSlice";
import { addNotification } from "@/features/pushNotification/pushNotificationSlice";

import { PushNotificationType } from "@/types/entityData/StatusNotificationData";
import { ErrorData } from "@/types/fetchResponse/error/ErrorData";

import * as S from "./EmailForm.styled";
import FormWrapper from "./FormWrapper";

const EmailFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(3, "Email must contain at least 3 characters")
    .max(100, "Email must contain at most 100 characters"),
});
type TEmailFormSchema = z.infer<typeof EmailFormSchema>;

const EmailForm = () => {
  const email = useAppSelector(selectProfileEmail) as string;

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<TEmailFormSchema>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: { email },
  });

  const dispatch = useAppDispatch();

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleFormSubmit = async (
    formData: TEmailFormSchema,
  ): Promise<void> => {
    if (!isSubmitting)
      try {
        const response = await dispatch(putPersonalDetails(formData)).unwrap();
        if (response) {
          dispatch(
            addNotification(
              "email updated successfully",
              PushNotificationType.SUCCESS,
            ),
          );
          dispatch(closeModal());
        }
      } catch (err) {
        const error = err as ErrorData;

        dispatch(
          addNotification(
            error.errors![0].msg || error.message,
            PushNotificationType.ERROR,
          ),
        );
        dispatch(closeModal());
      }
  };

  const isSubmitDisabled = !isDirty || isSubmitting;

  return (
    <FormWrapper>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <S.InputWrapper>
          <S.StyledInputLabel htmlFor="edit-email">Email</S.StyledInputLabel>
          <S.StyledInputText id="edit-email" {...register("email")} />
          <S.InputDescription>Your personal email</S.InputDescription>
          <S.StyledErrorMessage $isVisible={Boolean(errors.email)}>
            {errors.email?.message}
          </S.StyledErrorMessage>
        </S.InputWrapper>
        <S.ControlsWrapper>
          <S.CancelButton
            onClick={handleModalClose}
            type="button"
            value="Cancel"
          />
          <S.SubmitButton
            disabled={isSubmitDisabled}
            type="submit"
            value="Save"
          />
        </S.ControlsWrapper>
      </S.Form>
    </FormWrapper>
  );
};

export default EmailForm;
