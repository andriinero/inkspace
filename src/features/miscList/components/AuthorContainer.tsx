import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import useHomePageStatus from "@/hooks/useHomeLoadingStatus";

import {
  fetchAuthors,
  selectMiscAuthorList,
  selectFetchMiscAuthorsState,
} from "../miscListSlice";
import { addNotification } from "@/features/pushNotification/pushNotificationSlice";

import { PushNotificationType } from "@/types/entityData/StatusNotificationData";
import { ErrorData } from "@/types/fetchResponse/error/ErrorData";
import { WaterfallSlideIn } from "@/styles/animations/WaterfallSlideIn";

import AuthorItem from "./AuthorItem";
import MiscListLoader from "@/components/loaders/MiscListLoader";
import * as S from "./AuthorContainer.styled";

const AuthorContainer = () => {
  const authorList = useAppSelector(selectMiscAuthorList);
  const isLoading = useHomePageStatus();
  const { error } = useAppSelector(selectFetchMiscAuthorsState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAuthors()).unwrap();
      } catch (err) {
        dispatch(
          addNotification(
            (err as ErrorData).message,
            PushNotificationType.ERROR,
          ),
        );
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <S.Wrapper>
      {isLoading ? (
        <MiscListLoader />
      ) : error ? (
        <MiscListLoader />
      ) : (
        <>
          <S.Header>Who to follow</S.Header>
          <S.AuthorList
            variants={WaterfallSlideIn.container}
            initial="hidden"
            animate="visible"
          >
            {authorList.map((a) => (
              <AuthorItem key={a._id} {...a} />
            ))}
          </S.AuthorList>
        </>
      )}
    </S.Wrapper>
  );
};

export default AuthorContainer;
