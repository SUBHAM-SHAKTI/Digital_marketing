import React, { useMemo, useState } from "react";

import {
  ArrowLeft,
  CalendarDays,
  Plus,
  Film,
  Image,
  Megaphone,
  ExternalLink,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Target,
  IndianRupee,
  PlayCircle,
  FileText,
  Layers3,
  Clock3,
  Pencil,
  Users,
  Menu,
  Eye,
  PauseCircle,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

import AddWorkModal from "../components/AddWorkModal";
import AddAdModal from "../components/AddAdModal";
import StatCard from "../components/StatCard";

// ======================================================
// CLIENT FOLDER
// ======================================================

const ClientFolder = ({
  client,
  selectedMonth = "September 2026",
  setSelectedMonth,
  onBack,

  // CONTENT
  onAddWork,
  onUpdateWork,
  onDeleteWork,

  // META ADS
  onAddAd,
  onUpdateAd,
  onDeleteAd,

  setMobileOpen,
}) => {
  // ====================================================
  // STATE
  // ====================================================

  const [activeTab, setActiveTab] =
    useState("content");

  const [showWorkModal, setShowWorkModal] =
    useState(false);

  const [showAdModal, setShowAdModal] =
    useState(false);

  // Selected item for editing
  const [editingWork, setEditingWork] =
    useState(null);

  const [editingAd, setEditingAd] =
    useState(null);

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

    const options = [];

    for (
      let year = currentYear - 2;
      year <= currentYear + 2;
      year++
    ) {
      months.forEach((month) => {
        options.push(
          `${month} ${year}`
        );
      });
    }

    return options;
  }, []);

  // ====================================================
  // CLIENT NOT FOUND
  // ====================================================

  if (!client) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <AlertTriangle
            size={42}
            className="mx-auto text-orange-500"
          />

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Client not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Dashboard par wapas jaakar
            client select karo.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ====================================================
  // SAFE DATA
  // ====================================================

  const target =
    Number(client?.monthlyTarget) || 22;

  const works = Array.isArray(
    client?.works
  )
    ? client.works
    : [];

  const ads = Array.isArray(client?.ads)
    ? client.ads
    : [];

  // ====================================================
  // MONTH WORKS
  // ====================================================

  const monthWorks = works
    .filter(
      (work) =>
        work?.month === selectedMonth
    )
    .sort((a, b) => {
      return (
        new Date(b?.date || 0) -
        new Date(a?.date || 0)
      );
    });

  // Reel + Post
  const contentWorks =
    monthWorks.filter(
      (work) =>
        work?.type === "Reel" ||
        work?.type === "Post"
    );

  // IMPORTANT:
  // Only Posted Reel/Post count
  const postedWorks =
    contentWorks.filter(
      (work) =>
        work?.status === "Posted"
    );

  // ====================================================
  // POST / REEL COUNTS
  // ====================================================

  const reelCount =
    postedWorks.filter(
      (work) =>
        work?.type === "Reel"
    ).length;

  const postCount =
    postedWorks.filter(
      (work) =>
        work?.type === "Post"
    ).length;

  const totalPosted =
    reelCount + postCount;

  const totalCreated =
    contentWorks.length;

  // ====================================================
  // STORY / CAROUSEL
  // ====================================================

  const storyCount =
    monthWorks.filter(
      (work) =>
        work?.type === "Story"
    ).length;

  const carouselCount =
    monthWorks.filter(
      (work) =>
        work?.type === "Carousel"
    ).length;

  // ====================================================
  // TARGET
  // ====================================================

  const remaining = Math.max(
    target - totalPosted,
    0
  );

  const extra = Math.max(
    totalPosted - target,
    0
  );

  const progress =
    target > 0
      ? Math.min(
          (totalPosted / target) *
            100,
          100
        )
      : 0;

  // ====================================================
  // WORKFLOW COUNTS
  // ====================================================

  const createdCount =
    contentWorks.filter(
      (work) =>
        work?.status === "Created"
    ).length;

  const editingCount =
    contentWorks.filter(
      (work) =>
        work?.status === "Editing"
    ).length;

  const readyCount =
    contentWorks.filter(
      (work) =>
        work?.status === "Ready"
    ).length;

  const scheduledCount =
    contentWorks.filter(
      (work) =>
        work?.status === "Scheduled"
    ).length;

  // ====================================================
  // PLATFORM COUNTS
  // Only posted content
  // ====================================================

  const instagramCount =
    postedWorks.filter(
      (work) =>
        work?.instagram === true ||
        Boolean(
          work?.instagramUrl
        )
    ).length;

  const facebookCount =
    postedWorks.filter(
      (work) =>
        work?.facebook === true ||
        Boolean(
          work?.facebookUrl
        )
    ).length;

  // ====================================================
  // META ADS
  // ====================================================

  const monthAds = ads
    .filter(
      (ad) =>
        ad?.month === selectedMonth
    )
    .sort((a, b) => {
      return (
        new Date(
          b?.startDate || 0
        ) -
        new Date(
          a?.startDate || 0
        )
      );
    });

  const totalAds =
    monthAds.length;

  const runningAds =
    monthAds.filter(
      (ad) =>
        ad?.status === "Running"
    ).length;

  const scheduledAds =
    monthAds.filter(
      (ad) =>
        ad?.status === "Scheduled"
    ).length;

  const pausedAds =
    monthAds.filter(
      (ad) =>
        ad?.status === "Paused"
    ).length;

  const endedAds =
    monthAds.filter(
      (ad) =>
        ad?.status === "Ended"
    ).length;

  // ====================================================
  // AD TOTALS
  // ====================================================

  const totalBudget =
    monthAds.reduce(
      (sum, ad) =>
        sum +
        (Number(ad?.budget) || 0),
      0
    );

  const totalSpend =
    monthAds.reduce(
      (sum, ad) =>
        sum +
        (Number(ad?.spend) || 0),
      0
    );

  const totalReach =
    monthAds.reduce(
      (sum, ad) =>
        sum +
        (Number(ad?.reach) || 0),
      0
    );

  const totalImpressions =
    monthAds.reduce(
      (sum, ad) =>
        sum +
        (Number(
          ad?.impressions
        ) || 0),
      0
    );

  const totalLeads =
    monthAds.reduce(
      (sum, ad) =>
        sum +
        (Number(ad?.leads) || 0),
      0
    );

  // ====================================================
  // FORMAT MONEY
  // ====================================================

  const formatMoney = (amount) => {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(
      Number(amount) || 0
    );
  };

  // ====================================================
  // FORMAT NUMBER
  // ====================================================

  const formatNumber = (number) => {
    return new Intl.NumberFormat(
      "en-IN"
    ).format(
      Number(number) || 0
    );
  };

  // ====================================================
  // FORMAT DATE
  // ====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(
      `${date}T00:00:00`
    );

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ====================================================
  // OPEN ADD WORK
  // ====================================================

  const handleOpenAddWork = () => {
    setEditingWork(null);

    setShowWorkModal(true);
  };

  // ====================================================
  // OPEN EDIT WORK
  // ====================================================

  const handleOpenEditWork = (
    work
  ) => {
    setEditingWork(work);

    setShowWorkModal(true);
  };

  // ====================================================
  // CLOSE WORK MODAL
  // ====================================================

  const handleCloseWorkModal =
    () => {
      setShowWorkModal(false);

      setEditingWork(null);
    };

  // ====================================================
  // SAVE WORK
  // ====================================================

  const handleSaveWork = (
    workData
  ) => {
    // EDIT MODE
    if (editingWork) {
      if (
        typeof onUpdateWork ===
        "function"
      ) {
        onUpdateWork(
          client.id,
          editingWork.id,
          workData
        );
      }
    }

    // ADD MODE
    else {
      if (
        typeof onAddWork ===
        "function"
      ) {
        onAddWork(
          client.id,
          workData
        );
      }
    }

    handleCloseWorkModal();
  };

  // ====================================================
  // DELETE WORK
  // ====================================================

  const handleDeleteWork = (
    workId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this content?"
      );

    if (!confirmed) return;

    if (
      typeof onDeleteWork ===
      "function"
    ) {
      onDeleteWork(
        client.id,
        workId
      );
    }
  };

  // ====================================================
  // OPEN ADD AD
  // ====================================================

  const handleOpenAddAd = () => {
    setEditingAd(null);

    setShowAdModal(true);
  };

  // ====================================================
  // OPEN EDIT AD
  // ====================================================

  const handleOpenEditAd = (
    ad
  ) => {
    setEditingAd(ad);

    setShowAdModal(true);
  };

  // ====================================================
  // CLOSE AD MODAL
  // ====================================================

  const handleCloseAdModal = () => {
    setShowAdModal(false);

    setEditingAd(null);
  };

  // ====================================================
  // SAVE AD
  // ====================================================

  const handleSaveAd = (
    adData
  ) => {
    // EDIT MODE
    if (editingAd) {
      if (
        typeof onUpdateAd ===
        "function"
      ) {
        onUpdateAd(
          client.id,
          editingAd.id,
          adData
        );
      }
    }

    // ADD MODE
    else {
      if (
        typeof onAddAd ===
        "function"
      ) {
        onAddAd(
          client.id,
          adData
        );
      }
    }

    handleCloseAdModal();
  };

  // ====================================================
  // DELETE AD
  // ====================================================

  const handleDeleteAd = (
    adId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this Meta Ad?"
      );

    if (!confirmed) return;

    if (
      typeof onDeleteAd ===
      "function"
    ) {
      onDeleteAd(
        client.id,
        adId
      );
    }
  };

  // ====================================================
  // CONTENT ICON
  // ====================================================

  const getContentIcon = (
    type
  ) => {
    if (type === "Reel") {
      return Film;
    }

    if (type === "Post") {
      return Image;
    }

    if (
      type === "Carousel"
    ) {
      return Layers3;
    }

    return FileText;
  };

  // ====================================================
  // STATUS STYLE
  // ====================================================

  const getStatusClass = (
    status
  ) => {
    switch (status) {
      case "Posted":
        return "border-emerald-200 bg-emerald-50 text-emerald-700";

      case "Scheduled":
        return "border-purple-200 bg-purple-50 text-purple-700";

      case "Ready":
        return "border-blue-200 bg-blue-50 text-blue-700";

      case "Editing":
        return "border-orange-200 bg-orange-50 text-orange-700";

      case "Created":
        return "border-slate-200 bg-slate-100 text-slate-600";

      case "Running":
        return "border-emerald-200 bg-emerald-50 text-emerald-700";

      case "Paused":
        return "border-orange-200 bg-orange-50 text-orange-700";

      case "Ended":
        return "border-slate-200 bg-slate-100 text-slate-600";

      default:
        return "border-slate-200 bg-slate-50 text-slate-600";
    }
  };

  // ====================================================
  // TARGET STATUS
  // ====================================================

  const getTargetStatus = () => {
    if (
      totalPosted >= target
    ) {
      return {
        title:
          "Monthly Target Completed",

        message:
          extra > 0
            ? `${extra} extra content posted this month.`
            : `${target}/${target} content completed.`,

        className:
          "border-emerald-200 bg-emerald-50 text-emerald-700",

        barClass:
          "bg-emerald-500",

        Icon: CheckCircle2,
      };
    }

    if (remaining <= 4) {
      return {
        title:
          "Almost Complete",

        message:
          `${remaining} content remaining.`,

        className:
          "border-amber-200 bg-amber-50 text-amber-700",

        barClass:
          "bg-amber-500",

        Icon: AlertTriangle,
      };
    }

    if (remaining <= 8) {
      return {
        title:
          "Needs Attention",

        message:
          `${remaining} content remaining.`,

        className:
          "border-orange-200 bg-orange-50 text-orange-700",

        barClass:
          "bg-orange-500",

        Icon: AlertTriangle,
      };
    }

    return {
      title:
        "Behind Target",

      message:
        `${remaining} content remaining.`,

      className:
        "border-red-200 bg-red-50 text-red-700",

      barClass:
        "bg-red-500",

      Icon: AlertTriangle,
    };
  };

  const targetStatus =
    getTargetStatus();

  const TargetIcon =
    targetStatus.Icon;

  // ====================================================
  // UI
  // ====================================================

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* =============================================
            HEADER
        ============================================== */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              {/* LEFT */}

              <div className="flex items-center gap-3">
                {setMobileOpen && (
                  <button
                    type="button"
                    onClick={() =>
                      setMobileOpen(
                        true
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
                  >
                    <Menu size={20} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={onBack}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                >
                  <ArrowLeft
                    size={19}
                  />
                </button>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Client Folder
                  </p>

                  <h1 className="text-xl font-bold text-slate-900">
                    {client.name}
                  </h1>
                </div>
              </div>

              {/* RIGHT */}

              <div className="flex flex-wrap items-center gap-2">
                {/* MONTH */}

                <div className="relative">
                  <CalendarDays
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={
                      selectedMonth
                    }
                    onChange={(
                      event
                    ) =>
                      setSelectedMonth?.(
                        event
                          .target
                          .value
                      )
                    }
                    className="h-11 rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
                  >
                    {monthOptions.map(
                      (month) => (
                        <option
                          key={
                            month
                          }
                          value={
                            month
                          }
                        >
                          {month}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* ADD CONTENT */}

                <button
                  type="button"
                  onClick={
                    handleOpenAddWork
                  }
                  className="flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  <Plus size={18} />

                  Add Content
                </button>

                {/* ADD META AD */}

                <button
                  type="button"
                  onClick={
                    handleOpenAddAd
                  }
                  className="flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                >
                  <Megaphone
                    size={17}
                  />

                  Add Meta Ad
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* =============================================
            MAIN
        ============================================== */}

        <main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6">
          {/* ===========================================
              CLIENT INFO
          ============================================ */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Client
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {client.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Digital Marketing
                  Work Manager
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {client?.instagram && (
                  <div className="flex items-center gap-2 rounded-xl bg-pink-50 px-3 py-2 text-xs font-semibold text-pink-700">
                    <FaInstagram
                      size={17}
                    />

                    {
                      client.instagram
                    }
                  </div>
                )}

                {client?.facebook && (
                  <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                    <FaFacebookF
                      size={14}
                    />

                    {
                      client.facebook
                    }
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ===========================================
              TARGET
          ============================================ */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Target
                    size={18}
                    className="text-indigo-600"
                  />

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Monthly Content
                    Target
                  </p>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">
                    {totalPosted}
                  </span>

                  <span className="text-lg font-bold text-slate-400">
                    / {target}
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Only Posted Reel
                  + Posted Post
                  count toward the
                  monthly target.
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-2xl font-black text-indigo-600">
                  {Math.round(
                    progress
                  )}
                  %
                </p>

                <p className="text-xs text-slate-400">
                  completed
                </p>
              </div>
            </div>

            {/* PROGRESS */}

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${targetStatus.barClass}`}
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                {totalPosted} posted
              </span>

              {remaining > 0 ? (
                <span className="font-bold text-slate-600">
                  {remaining}{" "}
                  remaining
                </span>
              ) : (
                <span className="font-bold text-emerald-600">
                  Target complete
                  {extra > 0
                    ? ` +${extra} extra`
                    : ""}
                </span>
              )}
            </div>

            {/* TARGET ALERT */}

            <div
              className={`mt-5 flex items-start gap-3 rounded-2xl border p-4 ${targetStatus.className}`}
            >
              <TargetIcon
                size={20}
                className="mt-0.5 shrink-0"
              />

              <div>
                <p className="text-sm font-bold">
                  {
                    targetStatus.title
                  }
                </p>

                <p className="mt-1 text-xs">
                  {
                    targetStatus.message
                  }
                </p>
              </div>
            </div>
          </section>

          {/* ===========================================
              MAIN STAT CARDS
          ============================================ */}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Content Posted"
              value={`${totalPosted}/${target}`}
              subtitle={`${remaining} remaining`}
              icon={
                CheckCircle2
              }
            />

            <StatCard
              title="Reels Posted"
              value={reelCount}
              subtitle={`${postCount} posts`}
              icon={Film}
            />

            <StatCard
              title="Running Ads"
              value={runningAds}
              subtitle={`${totalAds} total campaigns`}
              icon={
                PlayCircle
              }
            />

            <StatCard
              title="Ad Spend"
              value={formatMoney(
                totalSpend
              )}
              subtitle={`Budget ${formatMoney(
                totalBudget
              )}`}
              icon={
                IndianRupee
              }
            />
          </section>

          {/* ===========================================
              SOCIAL COUNTS
          ============================================ */}

          <section className="grid gap-4 lg:grid-cols-2">
            {/* INSTAGRAM */}

            <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
                    <FaInstagram
                      size={22}
                    />
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      Instagram
                    </p>

                    <p className="text-xs text-slate-400">
                      Posted this
                      month
                    </p>
                  </div>
                </div>

                <p className="text-3xl font-black text-pink-600">
                  {
                    instagramCount
                  }
                </p>
              </div>
            </div>

            {/* FACEBOOK */}

            <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <FaFacebookF
                      size={19}
                    />
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      Facebook
                    </p>

                    <p className="text-xs text-slate-400">
                      Posted this
                      month
                    </p>
                  </div>
                </div>

                <p className="text-3xl font-black text-blue-600">
                  {
                    facebookCount
                  }
                </p>
              </div>
            </div>
          </section>

          {/* ===========================================
              CONTENT PRODUCTION
          ============================================ */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900">
                  Content
                  Production
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Current content
                  workflow for{" "}
                  {selectedMonth}.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {totalCreated}{" "}
                Content
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              <ProductionBox
                title="Created"
                value={
                  createdCount
                }
                className="text-slate-700"
              />

              <ProductionBox
                title="Editing"
                value={
                  editingCount
                }
                className="text-orange-600"
              />

              <ProductionBox
                title="Ready"
                value={
                  readyCount
                }
                className="text-blue-600"
              />

              <ProductionBox
                title="Scheduled"
                value={
                  scheduledCount
                }
                className="text-purple-600"
              />
            </div>

            {(storyCount > 0 ||
              carouselCount >
                0) && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  Stories:{" "}
                  {storyCount}
                </span>

                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  Carousels:{" "}
                  {
                    carouselCount
                  }
                </span>
              </div>
            )}
          </section>

          {/* ===========================================
              CONTENT / ADS TABLE
          ============================================ */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* TABS */}

            <div className="flex items-center gap-1 border-b border-slate-100 p-2">
              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    "content"
                  )
                }
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  activeTab ===
                  "content"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Film size={16} />

                Content (
                {
                  monthWorks.length
                }
                )
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    "ads"
                  )
                }
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  activeTab ===
                  "ads"
                    ? "bg-orange-500 text-white"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Megaphone
                  size={16}
                />

                Meta Ads (
                {totalAds})
              </button>
            </div>

            {/* =========================================
                CONTENT TAB
            ========================================== */}

            {activeTab ===
              "content" && (
              <div>
                {/* CONTENT HEADER */}

                <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Content
                      History
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Reels, Posts,
                      Stories and
                      Carousels for{" "}
                      {
                        selectedMonth
                      }.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={
                      handleOpenAddWork
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    <Plus
                      size={17}
                    />

                    Add Content
                  </button>
                </div>

                {/* EMPTY CONTENT */}

                {monthWorks.length ===
                0 ? (
                  <EmptyState
                    icon={Film}
                    title="No content added yet"
                    description={`Add your first Reel or Post for ${selectedMonth}.`}
                    buttonText="Add First Content"
                    onClick={
                      handleOpenAddWork
                    }
                  />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1150px]">
                      <thead className="bg-slate-50">
                        <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="px-5 py-3">
                            Date
                          </th>

                          <th className="px-5 py-3">
                            Content
                          </th>

                          <th className="px-5 py-3">
                            Title
                          </th>

                          <th className="px-5 py-3">
                            Status
                          </th>

                          <th className="px-5 py-3">
                            Platforms
                          </th>

                          <th className="px-5 py-3">
                            Links
                          </th>

                          <th className="px-5 py-3">
                            Notes
                          </th>

                          <th className="px-5 py-3 text-right">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {monthWorks.map(
                          (work) => {
                            const ContentIcon =
                              getContentIcon(
                                work.type
                              );

                            return (
                              <tr
                                key={
                                  work.id
                                }
                                className="hover:bg-slate-50/70"
                              >
                                {/* DATE */}

                                <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-slate-600">
                                  {formatDate(
                                    work.date
                                  )}
                                </td>

                                {/* CONTENT TYPE */}

                                <td className="px-5 py-4">
                                  <div className="flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                      <ContentIcon
                                        size={
                                          17
                                        }
                                      />
                                    </div>

                                    <span className="text-sm font-bold text-slate-700">
                                      {
                                        work.type
                                      }
                                    </span>
                                  </div>
                                </td>

                                {/* TITLE */}

                                <td className="max-w-[220px] px-5 py-4">
                                  <p className="truncate text-sm font-medium text-slate-700">
                                    {work.title ||
                                      "Untitled Content"}
                                  </p>
                                </td>

                                {/* STATUS */}

                                <td className="px-5 py-4">
                                  <span
                                    className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusClass(
                                      work.status
                                    )}`}
                                  >
                                    {
                                      work.status
                                    }
                                  </span>
                                </td>

                                {/* PLATFORM */}

                                <td className="px-5 py-4">
                                  <div className="flex items-center gap-2">
                                    {work.instagram && (
                                      <span
                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50 text-pink-600"
                                        title="Instagram"
                                      >
                                        <FaInstagram
                                          size={
                                            16
                                          }
                                        />
                                      </span>
                                    )}

                                    {work.facebook && (
                                      <span
                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
                                        title="Facebook"
                                      >
                                        <FaFacebookF
                                          size={
                                            14
                                          }
                                        />
                                      </span>
                                    )}

                                    {!work.instagram &&
                                      !work.facebook && (
                                        <span className="text-xs text-slate-300">
                                          —
                                        </span>
                                      )}
                                  </div>
                                </td>

                                {/* LINKS */}

                                <td className="px-5 py-4">
                                  <div className="flex items-center gap-2">
                                    {work.instagramUrl && (
                                      <a
                                        href={
                                          work.instagramUrl
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100"
                                        title="Open Instagram"
                                      >
                                        <FaInstagram
                                          size={
                                            14
                                          }
                                        />
                                      </a>
                                    )}

                                    {work.facebookUrl && (
                                      <a
                                        href={
                                          work.facebookUrl
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                                        title="Open Facebook"
                                      >
                                        <FaFacebookF
                                          size={
                                            13
                                          }
                                        />
                                      </a>
                                    )}

                                    {!work.instagramUrl &&
                                      !work.facebookUrl && (
                                        <span className="text-xs text-slate-300">
                                          —
                                        </span>
                                      )}

                                    {(work.instagramUrl ||
                                      work.facebookUrl) && (
                                      <ExternalLink
                                        size={
                                          12
                                        }
                                        className="text-slate-300"
                                      />
                                    )}
                                  </div>
                                </td>

                                {/* NOTES */}

                                <td className="max-w-[220px] px-5 py-4">
                                  <p className="truncate text-xs text-slate-500">
                                    {work.notes ||
                                      "—"}
                                  </p>
                                </td>

                                {/* ACTION */}

                                <td className="px-5 py-4">
                                  <div className="flex items-center justify-end gap-1">
                                    {/* EDIT */}

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleOpenEditWork(
                                          work
                                        )
                                      }
                                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-indigo-500 transition hover:bg-indigo-50 hover:text-indigo-700"
                                      title="Edit content"
                                    >
                                      <Pencil
                                        size={
                                          16
                                        }
                                      />
                                    </button>

                                    {/* DELETE */}

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDeleteWork(
                                          work.id
                                        )
                                      }
                                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                      title="Delete content"
                                    >
                                      <Trash2
                                        size={
                                          16
                                        }
                                      />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* =========================================
                META ADS TAB
            ========================================== */}

            {activeTab ===
              "ads" && (
              <div>
                {/* ADS HEADER */}

                <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Meta Ads
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Campaign
                      performance for{" "}
                      {
                        selectedMonth
                      }.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={
                      handleOpenAddAd
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    <Plus
                      size={17}
                    />

                    Add Meta Ad
                  </button>
                </div>

                {/* AD SUMMARY */}

                {monthAds.length >
                  0 && (
                  <div className="grid gap-3 border-b border-slate-100 bg-slate-50 p-5 sm:grid-cols-2 lg:grid-cols-5">
                    <MiniStat
                      title="Running"
                      value={
                        runningAds
                      }
                      icon={
                        PlayCircle
                      }
                    />

                    <MiniStat
                      title="Spend"
                      value={formatMoney(
                        totalSpend
                      )}
                      icon={
                        IndianRupee
                      }
                    />

                    <MiniStat
                      title="Reach"
                      value={formatNumber(
                        totalReach
                      )}
                      icon={Users}
                    />

                    <MiniStat
                      title="Impressions"
                      value={formatNumber(
                        totalImpressions
                      )}
                      icon={Eye}
                    />

                    <MiniStat
                      title="Leads"
                      value={formatNumber(
                        totalLeads
                      )}
                      icon={
                        Target
                      }
                    />
                  </div>
                )}

                {/* EMPTY */}

                {monthAds.length ===
                0 ? (
                  <EmptyState
                    icon={
                      Megaphone
                    }
                    title="No Meta Ads added"
                    description={`No Meta Ad campaigns recorded for ${selectedMonth}.`}
                    buttonText="Add First Meta Ad"
                    onClick={
                      handleOpenAddAd
                    }
                  />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1250px]">
                      <thead className="bg-slate-50">
                        <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="px-5 py-3">
                            Campaign
                          </th>

                          <th className="px-5 py-3">
                            Dates
                          </th>

                          <th className="px-5 py-3">
                            Platform
                          </th>

                          <th className="px-5 py-3">
                            Status
                          </th>

                          <th className="px-5 py-3">
                            Budget
                          </th>

                          <th className="px-5 py-3">
                            Spend
                          </th>

                          <th className="px-5 py-3">
                            Reach
                          </th>

                          <th className="px-5 py-3">
                            Impressions
                          </th>

                          <th className="px-5 py-3">
                            Leads
                          </th>

                          <th className="px-5 py-3">
                            Link
                          </th>

                          <th className="px-5 py-3 text-right">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {monthAds.map(
                          (ad) => (
                            <tr
                              key={
                                ad.id
                              }
                              className="hover:bg-slate-50/70"
                            >
                              {/* CAMPAIGN */}

                              <td className="max-w-[220px] px-5 py-4">
                                <p className="truncate text-sm font-bold text-slate-800">
                                  {
                                    ad.campaignName
                                  }
                                </p>

                                {ad.notes && (
                                  <p className="mt-1 truncate text-[10px] text-slate-400">
                                    {
                                      ad.notes
                                    }
                                  </p>
                                )}
                              </td>

                              {/* DATE */}

                              <td className="whitespace-nowrap px-5 py-4">
                                <p className="text-xs font-medium text-slate-600">
                                  {formatDate(
                                    ad.startDate
                                  )}
                                </p>

                                <p className="mt-1 text-[10px] text-slate-400">
                                  to{" "}
                                  {formatDate(
                                    ad.endDate
                                  )}
                                </p>
                              </td>

                              {/* PLATFORM */}

                              <td className="px-5 py-4">
                                <AdPlatform
                                  platform={
                                    ad.platform
                                  }
                                />
                              </td>

                              {/* STATUS */}

                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusClass(
                                    ad.status
                                  )}`}
                                >
                                  {ad.status ===
                                    "Running" && (
                                    <PlayCircle
                                      size={
                                        11
                                      }
                                    />
                                  )}

                                  {ad.status ===
                                    "Scheduled" && (
                                    <Clock3
                                      size={
                                        11
                                      }
                                    />
                                  )}

                                  {ad.status ===
                                    "Paused" && (
                                    <PauseCircle
                                      size={
                                        11
                                      }
                                    />
                                  )}

                                  {
                                    ad.status
                                  }
                                </span>
                              </td>

                              {/* BUDGET */}

                              <td className="whitespace-nowrap px-5 py-4 text-xs font-semibold text-slate-700">
                                {formatMoney(
                                  ad.budget
                                )}
                              </td>

                              {/* SPEND */}

                              <td className="whitespace-nowrap px-5 py-4 text-xs font-bold text-orange-600">
                                {formatMoney(
                                  ad.spend
                                )}
                              </td>

                              {/* REACH */}

                              <td className="px-5 py-4 text-xs font-medium text-slate-600">
                                {formatNumber(
                                  ad.reach
                                )}
                              </td>

                              {/* IMPRESSIONS */}

                              <td className="px-5 py-4 text-xs font-medium text-slate-600">
                                {formatNumber(
                                  ad.impressions
                                )}
                              </td>

                              {/* LEADS */}

                              <td className="px-5 py-4 text-xs font-bold text-indigo-600">
                                {formatNumber(
                                  ad.leads
                                )}
                              </td>

                              {/* URL */}

                              <td className="px-5 py-4">
                                {ad.adUrl ? (
                                  <a
                                    href={
                                      ad.adUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100"
                                    title="Open Ad"
                                  >
                                    <ExternalLink
                                      size={
                                        14
                                      }
                                    />
                                  </a>
                                ) : (
                                  <span className="text-xs text-slate-300">
                                    —
                                  </span>
                                )}
                              </td>

                              {/* ACTION */}

                              <td className="px-5 py-4">
                                <div className="flex items-center justify-end gap-1">
                                  {/* EDIT */}

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenEditAd(
                                        ad
                                      )
                                    }
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-indigo-500 transition hover:bg-indigo-50 hover:text-indigo-700"
                                    title="Edit Meta Ad"
                                  >
                                    <Pencil
                                      size={
                                        16
                                      }
                                    />
                                  </button>

                                  {/* DELETE */}

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteAd(
                                        ad.id
                                      )
                                    }
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                    title="Delete Meta Ad"
                                  >
                                    <Trash2
                                      size={
                                        16
                                      }
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* AD STATUS */}

                {monthAds.length >
                  0 && (
                  <div className="flex flex-wrap gap-2 border-t border-slate-100 p-4">
                    <StatusPill
                      text={`Running ${runningAds}`}
                    />

                    <StatusPill
                      text={`Scheduled ${scheduledAds}`}
                    />

                    <StatusPill
                      text={`Paused ${pausedAds}`}
                    />

                    <StatusPill
                      text={`Ended ${endedAds}`}
                    />
                  </div>
                )}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* ===============================================
          ADD / EDIT CONTENT MODAL
      ================================================ */}

      <AddWorkModal
        isOpen={
          showWorkModal
        }
        onClose={
          handleCloseWorkModal
        }
        onSave={
          handleSaveWork
        }
        selectedMonth={
          selectedMonth
        }
        clientName={
          client.name
        }

        // IMPORTANT FOR EDIT MODE
        editingWork={
          editingWork
        }
      />

      {/* ===============================================
          ADD / EDIT META AD MODAL
      ================================================ */}

      <AddAdModal
        isOpen={
          showAdModal
        }
        onClose={
          handleCloseAdModal
        }
        onSave={
          handleSaveAd
        }
        selectedMonth={
          selectedMonth
        }
        clientName={
          client.name
        }

        // IMPORTANT FOR EDIT MODE
        editingAd={
          editingAd
        }
      />
    </>
  );
};

// ======================================================
// PRODUCTION BOX
// ======================================================

const ProductionBox = ({
  title,
  value,
  className = "",
}) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
      <p
        className={`text-2xl font-black ${className}`}
      >
        {value}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {title}
      </p>
    </div>
  );
};

// ======================================================
// MINI STAT
// ======================================================

const MiniStat = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <div className="flex items-center gap-2">
        <Icon
          size={15}
          className="text-slate-400"
        />

        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          {title}
        </p>
      </div>

      <p className="mt-2 text-lg font-black text-slate-800">
        {value}
      </p>
    </div>
  );
};

// ======================================================
// EMPTY STATE
// ======================================================

const EmptyState = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <div className="p-8 text-center sm:p-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon size={25} />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-800">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-400">
        {description}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        <Plus size={16} />

        {buttonText}
      </button>
    </div>
  );
};

// ======================================================
// AD PLATFORM
// ======================================================

const AdPlatform = ({
  platform,
}) => {
  if (
    platform === "Instagram"
  ) {
    return (
      <div className="flex items-center gap-2 text-xs font-semibold text-pink-600">
        <FaInstagram
          size={16}
        />

        Instagram
      </div>
    );
  }

  if (
    platform === "Facebook"
  ) {
    return (
      <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
        <FaFacebookF
          size={14}
        />

        Facebook
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <FaInstagram
        size={15}
        className="text-pink-600"
      />

      <FaFacebookF
        size={13}
        className="text-blue-600"
      />

      <span className="text-xs font-semibold text-slate-600">
        Both
      </span>
    </div>
  );
};

// ======================================================
// STATUS PILL
// ======================================================

const StatusPill = ({
  text,
}) => {
  return (
    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-[10px] font-semibold text-slate-500">
      {text}
    </span>
  );
};

export default ClientFolder;