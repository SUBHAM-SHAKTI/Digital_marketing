import React, { useMemo, useState } from "react";
import {
  Users,
  FileCheck2,
  AlertTriangle,
  Megaphone,
  IndianRupee,
  Search,
  CalendarDays,
  Bell,
  Menu,
  CheckCircle2,
  FolderOpen,
  Target,
  X,
} from "lucide-react";

import ClientCard from "../components/ClientCard";
import StatCard from "../components/StatCard";

// ======================================================
// DASHBOARD
// ======================================================

const Dashboard = ({
  clients = [],
  selectedMonth = "September 2026",
  setSelectedMonth,
  onOpenClient,
  setMobileOpen,
}) => {
  // ====================================================
  // SEARCH
  // ====================================================

  const [searchTerm, setSearchTerm] =
    useState("");

  // ====================================================
  // MONTH OPTIONS
  // ====================================================

  const monthOptions = useMemo(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentYear =
      new Date().getFullYear();

    const years = [
      currentYear - 1,
      currentYear,
      currentYear + 1,
      currentYear + 2,
    ];

    const result = [];

    years.forEach((year) => {
      months.forEach((month) => {
        result.push(
          `${month} ${year}`
        );
      });
    });

    return result;
  }, []);

  // ====================================================
  // GET CLIENT MONTH WORK
  // ====================================================

  const getClientMonthData = (
    client
  ) => {
    const target =
      Number(client?.monthlyTarget) ||
      22;

    // Selected month work

    const monthWorks =
      client?.works?.filter(
        (work) =>
          work.month === selectedMonth
      ) || [];

    // Only Posted Reel/Post counts
    // toward monthly target

    const postedContent =
      monthWorks.filter(
        (work) =>
          work.status === "Posted" &&
          (work.type === "Reel" ||
            work.type === "Post")
      );

    // Reels

    const reels =
      postedContent.filter(
        (work) =>
          work.type === "Reel"
      ).length;

    // Posts

    const posts =
      postedContent.filter(
        (work) =>
          work.type === "Post"
      ).length;

    // Total posted content

    const completed =
      reels + posts;

    // Remaining

    const remaining = Math.max(
      target - completed,
      0
    );

    // Progress

    const progress =
      target > 0
        ? Math.min(
            (completed / target) *
              100,
            100
          )
        : 0;

    // Instagram

    const instagram =
      postedContent.filter(
        (work) =>
          work.instagram === true ||
          Boolean(
            work.instagramUrl
          )
      ).length;

    // Facebook

    const facebook =
      postedContent.filter(
        (work) =>
          work.facebook === true ||
          Boolean(
            work.facebookUrl
          )
      ).length;

    // Meta ads

    const monthAds =
      client?.ads?.filter(
        (ad) =>
          ad.month === selectedMonth
      ) || [];

    // Running ads

    const runningAds =
      monthAds.filter(
        (ad) =>
          ad.status === "Running"
      ).length;

    // Ad budget

    const adBudget =
      monthAds.reduce(
        (total, ad) =>
          total +
          (Number(ad.budget) ||
            0),
        0
      );

    // Actual ad spend

    const adSpend =
      monthAds.reduce(
        (total, ad) =>
          total +
          (Number(ad.spend) ||
            0),
        0
      );

    return {
      target,
      monthWorks,
      completed,
      reels,
      posts,
      remaining,
      progress,
      instagram,
      facebook,
      monthAds,
      runningAds,
      adBudget,
      adSpend,
    };
  };

  // ====================================================
  // DASHBOARD TOTALS
  // ====================================================

  const dashboardStats =
    useMemo(() => {
      let totalTarget = 0;

      let completedContent = 0;

      let runningAds = 0;

      let totalAdBudget = 0;

      let totalAdSpend = 0;

      let behindClients = 0;

      let completedClients = 0;

      clients.forEach(
        (client) => {
          const data =
            getClientMonthData(
              client
            );

          totalTarget +=
            data.target;

          completedContent +=
            data.completed;

          runningAds +=
            data.runningAds;

          totalAdBudget +=
            data.adBudget;

          totalAdSpend +=
            data.adSpend;

          if (
            data.completed <
            data.target
          ) {
            behindClients += 1;
          } else {
            completedClients += 1;
          }
        }
      );

      const overallProgress =
        totalTarget > 0
          ? Math.min(
              (completedContent /
                totalTarget) *
                100,
              100
            )
          : 0;

      return {
        totalClients:
          clients.length,

        totalTarget,

        completedContent,

        behindClients,

        completedClients,

        runningAds,

        totalAdBudget,

        totalAdSpend,

        overallProgress,
      };
    }, [
      clients,
      selectedMonth,
    ]);

  // ====================================================
  // BEHIND CLIENTS
  // ====================================================

  const behindClients =
    useMemo(() => {
      return clients
        .map((client) => ({
          ...client,

          monthData:
            getClientMonthData(
              client
            ),
        }))
        .filter(
          (client) =>
            client.monthData
              .completed <
            client.monthData.target
        )
        .sort(
          (a, b) =>
            b.monthData.remaining -
            a.monthData.remaining
        );
    }, [
      clients,
      selectedMonth,
    ]);

  // ====================================================
  // SEARCH CLIENTS
  // ====================================================

  const filteredClients =
    useMemo(() => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      if (!search) {
        return clients;
      }

      return clients.filter(
        (client) =>
          client?.name
            ?.toLowerCase()
            .includes(search) ||
          client?.instagram
            ?.toLowerCase()
            .includes(search) ||
          client?.facebook
            ?.toLowerCase()
            .includes(search)
      );
    }, [
      clients,
      searchTerm,
    ]);

  // ====================================================
  // FORMAT MONEY
  // ====================================================

  const formatMoney = (
    amount
  ) => {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(amount || 0);
  };

  // ====================================================
  // OPEN CLIENT
  // ====================================================

  const handleOpenClient = (
    client
  ) => {
    if (onOpenClient) {
      onOpenClient(client);
    }
  };

  // ====================================================
  // UI
  // ====================================================

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =================================================
          TOP HEADER
      ================================================== */}

      <header
        className="
          sticky top-0 z-30
          border-b
          border-slate-200
          bg-white/95
          backdrop-blur-xl
        "
      >
        <div
          className="
            flex min-h-20
            items-center
            justify-between
            gap-4
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* LEFT */}

          <div className="flex items-center gap-3">
            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() =>
                setMobileOpen?.(
                  true
                )
              }
              className="
                flex h-10 w-10
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-600
                lg:hidden
              "
            >
              <Menu size={21} />
            </button>

            <div>
              <h1
                className="
                  text-xl
                  font-bold
                  text-slate-900
                  sm:text-2xl
                "
              >
                Digital Marketing
                Dashboard
              </h1>

              <p
                className="
                  mt-1 hidden
                  text-xs
                  text-slate-500
                  sm:block
                "
              >
                Manage monthly
                content, client
                work and Meta Ads.
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">
            {/* MONTH */}

            <div className="relative">
              <CalendarDays
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-indigo-600
                "
              />

              <select
                value={
                  selectedMonth
                }
                onChange={(
                  event
                ) =>
                  setSelectedMonth?.(
                    event.target
                      .value
                  )
                }
                className="
                  max-w-[190px]
                  appearance-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  py-2.5
                  pl-10
                  pr-8
                  text-xs
                  font-semibold
                  text-slate-700
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-50
                  sm:text-sm
                "
              >
                {monthOptions.map(
                  (month) => (
                    <option
                      key={month}
                      value={month}
                    >
                      {month}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* NOTIFICATION */}

            <div className="relative hidden sm:block">
              <button
                type="button"
                className="
                  flex h-11 w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-500
                  transition
                  hover:bg-slate-50
                "
              >
                <Bell
                  size={19}
                />
              </button>

              {dashboardStats
                .behindClients >
                0 && (
                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    flex h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    px-1
                    text-[10px]
                    font-bold
                    text-white
                  "
                >
                  {
                    dashboardStats.behindClients
                  }
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* =================================================
          MAIN
      ================================================== */}

      <main
        className="
          space-y-7
          p-4
          sm:p-6
          lg:p-8
        "
      >
        {/* =================================================
            MONTH TITLE
        ================================================== */}

        <section
          className="
            flex flex-col
            justify-between
            gap-4
            sm:flex-row
            sm:items-end
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Target
                size={18}
                className="text-indigo-600"
              />

              <p
                className="
                  text-sm
                  font-semibold
                  text-indigo-600
                "
              >
                Monthly Overview
              </p>
            </div>

            <h2
              className="
                mt-1
                text-2xl
                font-bold
                text-slate-900
              "
            >
              {selectedMonth}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Track all client
              content and advertising
              work.
            </p>
          </div>

          {/* OVERALL */}

          <div
            className="
              rounded-2xl
              border
              border-indigo-100
              bg-indigo-50
              px-5 py-3
            "
          >
            <p
              className="
                text-xs
                font-semibold
                text-indigo-500
              "
            >
              Overall Progress
            </p>

            <p
              className="
                mt-1
                text-xl
                font-bold
                text-indigo-700
              "
            >
              {
                dashboardStats.completedContent
              }
              /
              {
                dashboardStats.totalTarget
              }

              <span
                className="
                  ml-2
                  text-sm
                  font-semibold
                "
              >
                {Math.round(
                  dashboardStats.overallProgress
                )}
                %
              </span>
            </p>
          </div>
        </section>

        {/* =================================================
            STATS
        ================================================== */}

        <section
          className="
            grid gap-4
            sm:grid-cols-2
            xl:grid-cols-5
          "
        >
          <StatCard
            title="Total Clients"
            value={
              dashboardStats.totalClients
            }
            subtitle={`${dashboardStats.completedClients} completed target`}
            icon={Users}
          />

          <StatCard
            title="Content Posted"
            value={
              dashboardStats.completedContent
            }
            target={
              dashboardStats.totalTarget
            }
            subtitle="Reels + Posts"
            icon={FileCheck2}
            progress={
              dashboardStats.overallProgress
            }
          />

          <StatCard
            title="Clients Behind"
            value={
              dashboardStats.behindClients
            }
            subtitle="Need attention"
            icon={AlertTriangle}
          />

          <StatCard
            title="Running Ads"
            value={
              dashboardStats.runningAds
            }
            subtitle="Active Meta campaigns"
            icon={Megaphone}
          />

          <StatCard
            title="Ad Spend"
            value={formatMoney(
              dashboardStats.totalAdSpend ||
                dashboardStats.totalAdBudget
            )}
            subtitle={`Budget ${formatMoney(
              dashboardStats.totalAdBudget
            )}`}
            icon={IndianRupee}
          />
        </section>

        {/* =================================================
            TARGET PROGRESS
        ================================================== */}

        <section
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div>
              <h3
                className="
                  text-base
                  font-bold
                  text-slate-900
                "
              >
                Overall Monthly
                Target
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                {
                  dashboardStats.totalClients
                }{" "}
                clients × 22
                content target
              </p>
            </div>

            <div className="text-right">
              <p
                className="
                  text-2xl
                  font-bold
                  text-indigo-600
                "
              >
                {Math.round(
                  dashboardStats.overallProgress
                )}
                %
              </p>

              <p
                className="
                  text-[10px]
                  text-slate-400
                "
              >
                completed
              </p>
            </div>
          </div>

          <div
            className="
              mt-5
              h-3
              overflow-hidden
              rounded-full
              bg-slate-100
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-indigo-600
                transition-all
                duration-700
              "
              style={{
                width: `${dashboardStats.overallProgress}%`,
              }}
            />
          </div>

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              text-xs
            "
          >
            <span className="text-slate-500">
              {
                dashboardStats.completedContent
              }{" "}
              posted
            </span>

            <span className="font-semibold text-slate-700">
              {Math.max(
                dashboardStats.totalTarget -
                  dashboardStats.completedContent,
                0
              )}{" "}
              remaining
            </span>
          </div>
        </section>

        {/* =================================================
            ALERTS
        ================================================== */}

        {behindClients.length >
          0 ? (
          <section
            className="
              overflow-hidden
              rounded-3xl
              border
              border-red-100
              bg-white
              shadow-sm
            "
          >
            {/* ALERT HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-red-100
                bg-red-50/70
                px-5 py-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex h-10 w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-100
                    text-red-600
                  "
                >
                  <AlertTriangle
                    size={20}
                  />
                </div>

                <div>
                  <h3
                    className="
                      font-bold
                      text-slate-900
                    "
                  >
                    Monthly Work
                    Alerts
                  </h3>

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    {
                      behindClients.length
                    }{" "}
                    clients are below
                    target
                  </p>
                </div>
              </div>

              <span
                className="
                  rounded-full
                  bg-red-100
                  px-3 py-1
                  text-xs
                  font-bold
                  text-red-600
                "
              >
                {
                  behindClients.length
                }{" "}
                Pending
              </span>
            </div>

            {/* ALERT CLIENTS */}

            <div
              className="
                grid gap-3
                p-4
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {behindClients
                .slice(0, 6)
                .map(
                  (client) => (
                    <button
                      key={
                        client.id
                      }
                      type="button"
                      onClick={() =>
                        handleOpenClient(
                          client
                        )
                      }
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        rounded-2xl
                        border
                        border-slate-100
                        bg-slate-50
                        p-4
                        text-left
                        transition
                        hover:border-red-200
                        hover:bg-red-50/50
                      "
                    >
                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >
                        <p
                          className="
                            truncate
                            text-sm
                            font-bold
                            text-slate-800
                          "
                        >
                          {
                            client.name
                          }
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-slate-500
                          "
                        >
                          {
                            client
                              .monthData
                              .completed
                          }
                          /
                          {
                            client
                              .monthData
                              .target
                          }{" "}
                          completed
                        </p>

                        {/* MINI BAR */}

                        <div
                          className="
                            mt-2
                            h-1.5
                            overflow-hidden
                            rounded-full
                            bg-slate-200
                          "
                        >
                          <div
                            className="
                              h-full
                              rounded-full
                              bg-red-500
                            "
                            style={{
                              width: `${client.monthData.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div
                        className="
                          shrink-0
                          text-right
                        "
                      >
                        <p
                          className="
                            text-lg
                            font-bold
                            text-red-600
                          "
                        >
                          {
                            client
                              .monthData
                              .remaining
                          }
                        </p>

                        <p
                          className="
                            text-[9px]
                            uppercase
                            text-slate-400
                          "
                        >
                          Remaining
                        </p>
                      </div>
                    </button>
                  )
                )}
            </div>
          </section>
        ) : (
          <section
            className="
              flex
              items-center
              gap-4
              rounded-3xl
              border
              border-emerald-100
              bg-emerald-50
              p-5
            "
          >
            <CheckCircle2
              size={30}
              className="text-emerald-600"
            />

            <div>
              <h3
                className="
                  font-bold
                  text-emerald-800
                "
              >
                All Targets
                Completed
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-emerald-600
                "
              >
                All clients have
                completed their
                monthly content
                targets.
              </p>
            </div>
          </section>
        )}

        {/* =================================================
            CLIENT FOLDERS HEADER
        ================================================== */}

        <section>
          <div
            className="
              mb-5
              flex flex-col
              justify-between
              gap-4
              md:flex-row
              md:items-center
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <FolderOpen
                  size={20}
                  className="text-indigo-600"
                />

                <h2
                  className="
                    text-xl
                    font-bold
                    text-slate-900
                  "
                >
                  Client Folders
                </h2>
              </div>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                {
                  filteredClients.length
                }{" "}
                of{" "}
                {clients.length}{" "}
                clients
              </p>
            </div>

            {/* SEARCH */}

            <div
              className="
                relative
                w-full
                md:w-80
              "
            >
              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={
                  searchTerm
                }
                onChange={(
                  event
                ) =>
                  setSearchTerm(
                    event.target
                      .value
                  )
                }
                placeholder="Search client..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  py-3
                  pl-11
                  pr-10
                  text-sm
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-50
                "
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() =>
                    setSearchTerm(
                      ""
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    rounded-lg
                    p-1
                    text-slate-400
                    hover:bg-slate-100
                  "
                >
                  <X
                    size={16}
                  />
                </button>
              )}
            </div>
          </div>

          {/* =================================================
              CLIENT CARDS
          ================================================== */}

          {filteredClients.length >
          0 ? (
            <div
              className="
                grid gap-5
                md:grid-cols-2
                xl:grid-cols-3
                2xl:grid-cols-4
              "
            >
              {filteredClients.map(
                (client) => (
                  <ClientCard
                    key={
                      client.id
                    }
                    client={
                      client
                    }
                    selectedMonth={
                      selectedMonth
                    }
                    onOpen={
                      handleOpenClient
                    }
                  />
                )
              )}
            </div>
          ) : (
            <div
              className="
                flex min-h-[300px]
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-dashed
                border-slate-300
                bg-white
                p-8
                text-center
              "
            >
              <Search
                size={40}
                className="text-slate-300"
              />

              <h3
                className="
                  mt-4
                  font-bold
                  text-slate-700
                "
              >
                Client Not Found
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >
                Try searching with
                another client name.
              </p>

              <button
                type="button"
                onClick={() =>
                  setSearchTerm("")
                }
                className="
                  mt-4
                  rounded-xl
                  bg-indigo-600
                  px-4 py-2
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Show All Clients
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;