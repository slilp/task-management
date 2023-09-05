// main
import React, { useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";

// component
import NavBar from "components/organisms/NavBar";
import TabStatusSection from "views/home/components/TabStatusSection";
import HelloSection from "views/home/components/HelloSection";
import ScrollToTop from "components/organisms/ScrollToTop";
import TaskContentSection from "views/home/components/TaskContentSection";

// util
import { TaskStatus } from "views/home/utils/type";

function Home() {
  const [tabStatus, setTabStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Task Management</title>
      </Head>
      <NavBar />
      <section className="container mx-auto py-5 px-3">
        <div className="flex flex-col items-center">
          <HelloSection
            name={session?.user?.name || "-"}
            pic={session?.user?.image || "/astronaut.png"}
          />
          <TabStatusSection tabStatus={tabStatus} setTabStatus={setTabStatus} />
        </div>
        {[TaskStatus.TODO, TaskStatus.DOING, TaskStatus.DONE].map((tab) => {
          if (tab !== tabStatus) return null;
          return (
            <TaskContentSection
              key={`task-content-section-${tab}`}
              tabStatus={tab}
            />
          );
        })}
      </section>
      <ScrollToTop />
    </>
  );
}

export default Home;
