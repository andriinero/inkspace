import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  closeModal,
  putPersonalDetails,
  selectProfileBio,
} from '@/features/profile/profileSlice';
import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';

import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import type { ErrorData } from '@/types/fetchResponse/error/ErrorData';

import * as S from './BioForm.styled';
import FormWrapper from './FormWrapper';
import ProfileLabel from '../general/ProfileLabel';
import ProfileInput from '../general/ProfileInput';
import InputDescription from '@/components/general/InputDesciption';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import CancelButton from '@/components/general/CancelButton';
import SubmitButton from '@/components/general/SubmitButton';

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
            addPushNotification(
              'profile bio updated successfully',
              PushNotificationType.SUCCESS,
            ),
          );
          dispatch(closeModal());
        }
      } catch (err) {
        const error = err as ErrorData;

        dispatch(
          addPushNotification(
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
          <ProfileLabel htmlFor="edit-bio">Bio</ProfileLabel>
          <ProfileInput id="edit-bio" {...register('bio')} />
          <InputDescription>Your profile bio</InputDescription>
          <ErrorMessage $isVisible={Boolean(errors.bio)}>
            {errors.bio?.message}
          </ErrorMessage>
        </S.InputWrapper>
        <S.ControlsWrapper>
          <CancelButton onClick={handleModalClose} type="button">
            Cancel
          </CancelButton>
          <SubmitButton disabled={isSubmitDisabled} type="submit">
            Save
          </SubmitButton>
        </S.ControlsWrapper>
      </S.Form>
    </FormWrapper>
  );
};

export default BioForm;
