import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { putPassword, selectPutPasswordState } from '../profileEditSlice';

import {
  ProfilePasswordEditSchema,
  TProfilePasswordEditSchema,
} from '@/types/formSchemas/ProfilePasswordEditSchema';

import * as S from './PasswordForm.styled';

const PasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfilePasswordEditSchema>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(ProfilePasswordEditSchema),
  });

  const { isLoading, error } = useAppSelector(selectPutPasswordState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (
    formData: TProfilePasswordEditSchema
  ): Promise<void> => {
    if (!isLoading) {
      const response = await dispatch(putPassword(formData)).unwrap();

      if (response) navigate('/');
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
      <S.InputContainer>
        <S.InputItem>
          <S.StyledInputLabel htmlFor="edit-password">Password</S.StyledInputLabel>
          <S.StyledInputText
            {...register('password', { required: 'Password is required' })}
            id="edit-password"
            type="password"
            placeholder="••••••••"
          />
          <S.StyledErrorMessage $isVisible={Boolean(errors.password)}>
            {errors.password?.message}
          </S.StyledErrorMessage>
        </S.InputItem>
        <S.InputItem>
          <S.StyledInputLabel htmlFor="edit-password-confirmation">
            Confirm Password
          </S.StyledInputLabel>
          <S.StyledInputText
            {...register('passwordConfirmation')}
            id="edit-password-confirmation"
            type="password"
            placeholder="••••••••"
          />
          <S.StyledErrorMessage $isVisible={Boolean(errors.passwordConfirmation)}>
            {errors.passwordConfirmation?.message}
          </S.StyledErrorMessage>
        </S.InputItem>
      </S.InputContainer>
      <S.StyledErrorMessage $isVisible={Boolean(error)}>
        An error has occurred while submitting the form
      </S.StyledErrorMessage>
      <S.SaveButton type="submit" value="Save" />
    </S.Form>
  );
};

export default PasswordForm;
