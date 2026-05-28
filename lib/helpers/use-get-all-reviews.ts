"use client";

import { useCallback, useState } from "react";
import { getAllReviewsAction } from "../actions/reviews/action";
import { Review } from "../interfaces/review.interface";

export const useGetAllReviews = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const getAllReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const { success, data } = await getAllReviewsAction({
        page: 1,
        limit: 100,
      });
      if (success) {
        setReviews(data || []);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    reviews,
    getAllReviews,
  };
};
