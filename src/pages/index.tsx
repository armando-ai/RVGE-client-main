import { type NextPage } from "next";
import Head from "next/head";
import { Navigation } from "src/components/navigation";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Profile</title>
        <meta
          name="description"
          content="nSight Customer Relations done easy"
        />
      </Head>
      <main className="min-h-screen bg-slate-900">
        <Navigation />
      </main>
    </>
  );
};

export default Dashboard;
