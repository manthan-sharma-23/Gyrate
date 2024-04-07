import Loading from "@/components/ui/Loading";
import { useGetUser } from "@/features/hooks/user/useGetUser";

const Home = () => {
  const { user, loading } = useGetUser();
  console.log(user);
  if (loading) {
    <div className="h-screen w-screen">
      <Loading />
    </div>;
  }
  return <div className="h-full w-full text-white"></div>;
};

export default Home;
