import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  closeModal,
  putPersonalDetails,
  selectPutPersonalDetailsState,
} from '@/features/profile/profileSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';
import { selectProfileBio } from '@/features/profile/profileSlice';

import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

import FormWrapper from './FormWrapper';
import * as S from './BioForm.styled';

const BioFormSchema = z.object({
  bio: z.string().max(280, 'Bio must contain at most 280 characters'),
});
type TBioFormSchema = z.infer<typeof BioFormSchema>;

const BioForm = () => {
  const bio = useAppSelector(selectProfileBio) as string;

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<TBioFormSchema>({
    resolver: zodResolver(BioFormSchema),
    defaultValues: { bio },
  });

  const dispatch = useAppDispatch();

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleFormSubmit = async (formData: TBioFormSchema): Promise<void> => {
    if (!isSubmitting)
      try {
        const response = await dispatch(putPersonalDetails(formData)).unwrap();

        if (response) {
          dispatch(
            addNotification(
              'profile bio updated successfully',
              PushNotificationType.SUCCESS
            )
          );
          dispatch(closeModal());
        }
      } catch (err) {
        const error = err as ErrorData;

        dispatch(
          addNotification(
            error.errors![0].msg || error.message,
            PushNotificationType.ERROR
          )
        );
        dispatch(closeModal());
      }
  };

  const isSubmitDisabled = !isDirty || isSubmitting;

  return (
    <FormWrapper>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <S.InputWrapper>
          <S.StyledInputLabel htmlFor="edit-bio">Bio</S.StyledInputLabel>
          <S.StyledInputText id="edit-bio" {...register('bio')} />
          <S.InputDescription>Your profile bio</S.InputDescription>
          <S.StyledErrorMessage $isVisible={Boolean(errors.bio)}>
            {errors.bio?.message}
          </S.StyledErrorMessage>
        </S.InputWrapper>
        <S.ControlsWrapper>
          <S.CancelButton onClick={handleModalClose} type="button" value="Cancel" />
          <S.SubmitButton disabled={isSubmitDisabled} type="submit" value="Save" />
        </S.ControlsWrapper>
      </S.Form>
    </FormWrapper>
  );
};

export default BioForm;
