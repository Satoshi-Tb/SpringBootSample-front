import { useUserDetail } from "@/components/usecase/useUserDetail";
import { useRouter } from "next/router";

export const Detail = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { userData, hasError, isLoading } = useUserDetail(
    (userId as string) || undefined
  );

  return <div>詳細</div>;
};
